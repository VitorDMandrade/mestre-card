// scripts/catalog-exams.mjs
// Varredura completa e geração tipada do acervo de 587 PDFs para o MestreCard
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const WORKSPACE_DIR = process.cwd();
const ROOT_DIR = path.join(WORKSPACE_DIR, 'Provas Oficiais e Exercícios');
const OUTPUT_TS = path.join(WORKSPACE_DIR, 'app-mestre-card', 'src', 'data', 'acervo-catalog.ts');
const GITHUB_BASE = 'https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios';

function scan(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      scan(full, list);
    } else if (item.name.toLowerCase().endsWith('.pdf') || item.name.toLowerCase().endsWith('.txt')) {
      list.push({
        name: item.name,
        full,
        size: fs.statSync(full).size,
        rel: path.relative(ROOT_DIR, full)
      });
    }
  }
  return list;
}

const files = scan(ROOT_DIR);

function inferMetadata(file, index) {
  const p = file.rel.toLowerCase().replace(/\\/g, '/');
  const cleanName = file.name.replace(/\.(pdf|txt)$/i, '').replace(/[-_]/g, ' ').toLowerCase();

  // 1. Disciplina
  let discipline = 'geral';
  if (p.includes('quimica') || cleanName.includes('quimica') || cleanName.includes('termoquimica') || cleanName.includes('eletroquimica') || cleanName.includes('estequiometria')) {
    discipline = 'quimica';
  } else if (p.includes('biologia') || cleanName.includes('biologia') || cleanName.includes('genetica') || cleanName.includes('fisiologia') || cleanName.includes('citologia') || cleanName.includes('ecologia') || cleanName.includes('bioquimica')) {
    discipline = 'biologia';
  } else if (p.includes('fisica') || cleanName.includes('fisica') || cleanName.includes('optica') || cleanName.includes('cinematica') || cleanName.includes('ondulatoria') || cleanName.includes('eletricidade')) {
    discipline = 'fisica';
  } else if (p.includes('matematica') || cleanName.includes('matematica') || cleanName.includes('trigonometria') || cleanName.includes('geometria') || cleanName.includes('probabilidade')) {
    discipline = 'matematica';
  } else if (p.includes('geografia') || p.includes('historia') || cleanName.includes('geografia') || cleanName.includes('historia') || cleanName.includes('geopolitica') || cleanName.includes('climatologia')) {
    discipline = 'humanas';
  } else if (p.includes('portugues') || cleanName.includes('portugues') || cleanName.includes('literatura') || cleanName.includes('redacao')) {
    discipline = 'linguagens';
  }

  // 2. Categoria
  let category = 'caderno_exercicios';
  if (p.includes('gabarito') || cleanName.includes('gabarito') || p.includes('comentad') || cleanName.includes('comentad') || p.includes('resolucao')) {
    category = 'gabarito_comentado';
  } else if (p.includes('provas ') || cleanName.includes('prova ') || cleanName.endsWith('prova') || p.includes('1fase') || p.includes('2fase') || p.includes('exame de qualificacao')) {
    category = 'prova_oficial';
  } else if (p.includes('simulado') || cleanName.includes('simulado')) {
    category = 'simulado';
  } else if (p.includes('anotac') || cleanName.includes('anotac') || cleanName.includes('resumo')) {
    category = 'anotacoes_teoria';
  } else if (p.includes('aulao') || p.includes('monitoria') || cleanName.includes('bloquinho') || cleanName.includes('sprint')) {
    category = 'aulao';
  }

  // 3. Banca
  let banca = 'Outras';
  if (p.includes('einstein') || cleanName.includes('einstein')) banca = 'Albert Einstein';
  else if (p.includes('enem') || cleanName.includes('enem')) banca = 'ENEM';
  else if (p.includes('unesp') || cleanName.includes('unesp') || p.includes('vunesp')) banca = 'UNESP';
  else if (p.includes('fuvest') || cleanName.includes('fuvest')) banca = 'FUVEST';
  else if (p.includes('unicamp') || cleanName.includes('unicamp')) banca = 'UNICAMP';
  else if (p.includes('uerj') || cleanName.includes('uerj')) banca = 'UERJ';
  else if (p.includes('uece') || cleanName.includes('uece')) banca = 'UECE';
  else if (p.includes('ueg') || cleanName.includes('ueg')) banca = 'UEG';
  else if (p.includes('uema') || cleanName.includes('uema')) banca = 'UEMA';
  else if (p.includes('ufg') || cleanName.includes('ufg')) banca = 'UFG';
  else if (p.includes('uft') || cleanName.includes('uft')) banca = 'UFT';
  else if (p.includes('unirg') || cleanName.includes('unirg')) banca = 'UNIRG';
  else if (p.includes('unirv') || cleanName.includes('unirv')) banca = 'UNIRV';
  else if (p.includes('unitins') || cleanName.includes('unitins')) banca = 'UNITINS';

  // 4. Ano
  const yearMatch = file.name.match(/20[12][0-9]/);
  const year = yearMatch ? parseInt(yearMatch[0], 10) : undefined;

  // 5. Tópicos e Tags Relevantes
  const topics = [];
  const knownKeywords = [
    'termoquimica', 'entalpia', 'lei de hess', 'calor', 'eletroquimica', 'eletrolise', 'estequiometria',
    'organica', 'isomeria', 'solucoes', 'cinetica', 'acidos', 'atomistica', 'geometria molecular',
    'distribuicao eletronica', 'ligacoes quimicas', 'sais', 'oxidos', 'propriedades periodicas',
    'equilibrio', 'genetica', 'mendel', 'citologia', 'organelas', 'fisiologia', 'sistema nervoso',
    'cardiovascular', 'ecologia', 'biomas', 'cadeia alimentar', 'evolucao', 'botanica', 'zoologia',
    'bioquimica', 'optica', 'cinematica', 'dinamica', 'newton', 'ondulatoria', 'eletricidade',
    'resistor', 'magnetismo', 'termodinamica', 'calorimetria', 'geometria', 'trigonometria',
    'funcao', 'probabilidade', 'combinatoria', 'estatistica', 'logaritmo', 'matrizes', 'geopolitica',
    'climatologia', 'urbanizacao', 'brasil', 'segunda guerra', 'era vargas'
  ];

  for (const kw of knownKeywords) {
    if (cleanName.includes(kw) || p.includes(kw)) {
      topics.push(kw);
    }
  }

  // 6. URL para GitHub
  const segments = file.rel.split(/[\\/]/).map(s => encodeURIComponent(s));
  const githubUrl = `${GITHUB_BASE}/${segments.join('/')}`;

  // Formatar título legível
  const readableTitle = file.name
    .replace(/\.(pdf|txt)$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const hash = crypto.createHash('md5').update(file.rel).digest('hex').slice(0, 8);

  return {
    id: `acervo-${hash}-${index + 1}`,
    filename: file.name,
    title: readableTitle,
    discipline,
    category,
    banca,
    year,
    topics,
    githubUrl,
    relativePath: file.rel.replace(/\\/g, '/'),
    sizeFormatted: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
  };
}

const catalogItems = files.map(inferMetadata);

const tsContent = `// src/data/acervo-catalog.ts
// Catálogo Oficial do Acervo de Provas e Exercícios do MestreCard
// Total de Itens Indexados: ${catalogItems.length}

export interface AcervoItem {
  id: string;
  filename: string;
  title: string;
  discipline: 'quimica' | 'biologia' | 'fisica' | 'matematica' | 'humanas' | 'linguagens' | 'geral';
  category: 'prova_oficial' | 'gabarito_comentado' | 'caderno_exercicios' | 'anotacoes_teoria' | 'simulado' | 'aulao';
  banca: string;
  year?: number;
  topics: string[];
  githubUrl: string;
  relativePath: string;
  sizeFormatted: string;
}

export const ACERVO_CATALOG: AcervoItem[] = ${JSON.stringify(catalogItems, null, 2)};
`;

fs.writeFileSync(OUTPUT_TS, tsContent, 'utf-8');
console.log(`[CATÁLOGO CRIADO]: ${catalogItems.length} arquivos indexados com sucesso em ${OUTPUT_TS}`);
