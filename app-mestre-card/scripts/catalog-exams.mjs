import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.argv[2] || path.resolve('..', 'Provas Oficiais e Exercícios');
const OUTPUT_FILE = process.argv[3] || path.resolve('..', 'CATALOGO_DO_ACERVO.md');

function scanDirectory(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else {
      const ext = path.extname(item.name).toLowerCase();
      fileList.push({
        name: item.name,
        fullPath,
        ext,
        size: fs.statSync(fullPath).size,
        relPath: path.relative(ROOT_DIR, fullPath)
      });
    }
  }
  return fileList;
}

function generateCatalog() {
  console.log(`[CATALOGADOR]: Escaneando acervo em: ${ROOT_DIR}...`);
  const files = scanDirectory(ROOT_DIR);
  const pdfs = files.filter(f => f.ext === '.pdf');
  const txts = files.filter(f => f.ext === '.txt');
  const otherFiles = files.filter(f => f.ext !== '.pdf' && f.ext !== '.txt');

  // Categorização temática
  const categories = {
    einstein: {
      name: '🩺 Albert Einstein - Medicina (Provas & Gabaritos Comentados)',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('einstein'))
    },
    enem: {
      name: '🌐 ENEM - Exame Nacional do Ensino Médio (2018 a 2024)',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('enem'))
    },
    unesp: {
      name: '🏛️ UNESP / VUNESP - Vestibulares Paulistas (2023 a 2025)',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('unesp'))
    },
    uece: {
      name: '🏛️ UECE - Universidade Estadual do Ceará',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('uece'))
    },
    ueg: {
      name: '🏛️ UEG - Universidade Estadual de Goiás',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('ueg'))
    },
    uema: {
      name: '🏛️ UEMA - Universidade Estadual do Maranhão',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('uema'))
    },
    uerj: {
      name: '🏛️ UERJ - Universidade do Estado do Rio de Janeiro',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('uerj'))
    },
    ufg: {
      name: '🏛️ UFG - Universidade Federal de Goiás',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('ufg'))
    },
    uft: {
      name: '🏛️ UFT / EXATO - Universidade Federal do Tocantins',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('uft'))
    },
    unirg: {
      name: '🩺 UNIRG Medicina',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('unirg'))
    },
    unirv: {
      name: '🩺 UNIRV Medicina',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('unirv'))
    },
    unitins: {
      name: '🏛️ UNITINS - Universidade Estadual do Tocantins',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('unitins'))
    },
    quimica_tematica: {
      name: '⚗️ Química - Cadernos Temáticos Especializados (Extras)',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('quimica') && !f.relPath.toLowerCase().includes('provas '))
    },
    biologia_tematica: {
      name: '🧬 Biologia - Cadernos Temáticos Especializados (Extras)',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('biologia') && !f.relPath.toLowerCase().includes('provas '))
    },
    outras_materias: {
      name: '📚 Física, Matemática, História e Geografia (Extras)',
      files: pdfs.filter(f => 
        (f.relPath.toLowerCase().includes('física') || 
         f.relPath.toLowerCase().includes('matemática') || 
         f.relPath.toLowerCase().includes('história') || 
         f.relPath.toLowerCase().includes('geografia')) &&
        !f.relPath.toLowerCase().includes('provas ')
      )
    },
    simulados: {
      name: '🎯 Simulados Separados & Ciclo Zero',
      files: pdfs.filter(f => f.relPath.toLowerCase().includes('simulados'))
    }
  };

  let md = `# 🏛️ CATÁLOGO GERAL DO ACERVO DE PROVAS OFICIAIS & EXERCÍCIOS\n\n`;
  md += `> **Data de Catalogação**: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}  \n`;
  md += `> **Total de Arquivos**: ${files.length} (${pdfs.length} PDFs oficiais, ${txts.length} Documentos de texto)\n\n`;
  md += `Este catálogo consolida o inventário completo do acervo de provas do MestreCard para mapeamento direto no **Coliseu das Bancas (Seção 05 - Lab)** e nos exercícios de fixação.\n\n`;
  md += `---\n\n`;

  md += `## 📊 Resumo Executivo do Acervo por Banca e Matéria\n\n`;
  md += `| Categoria / Banca | PDFs Catalogados | Integração no MestreCard |\n`;
  md += `| :--- | :---: | :--- |\n`;

  for (const [key, cat] of Object.entries(categories)) {
    md += `| **${cat.name}** | **${cat.files.length}** | Mapeado para Arena / Desafios |\n`;
  }
  md += `\n---\n\n`;

  md += `## 📁 Detalhamento das Provas e Cadernos por Coleção\n\n`;

  for (const [key, cat] of Object.entries(categories)) {
    if (cat.files.length === 0) continue;
    md += `### ${cat.name} (${cat.files.length} arquivos)\n\n`;
    md += `| Arquivo | Tamanho | Caminho Relativo |\n`;
    md += `| :--- | :---: | :--- |\n`;

    for (const f of cat.files) {
      const sizeKb = (f.size / 1024).toFixed(1);
      md += `| \`${f.name}\` | ${sizeKb} KB | \`${f.relPath}\` |\n`;
    }
    md += `\n`;
  }

  // Identificar arquivos não categorizados
  const categorizedPaths = new Set(
    Object.values(categories).flatMap(c => c.files.map(f => f.relPath))
  );
  const uncategorized = pdfs.filter(f => !categorizedPaths.has(f.relPath));

  if (uncategorized.length > 0) {
    md += `### 📂 Outros PDFs do Acervo (${uncategorized.length} arquivos)\n\n`;
    md += `| Arquivo | Tamanho | Caminho Relativo |\n`;
    md += `| :--- | :---: | :--- |\n`;
    for (const f of uncategorized) {
      md += `| \`${f.name}\` | ${(f.size / 1024).toFixed(1)} KB | \`${f.relPath}\` |\n`;
    }
    md += `\n`;
  }

  fs.writeFileSync(OUTPUT_FILE, md, 'utf-8');
  console.log(`[CATALOGADOR]: Sucesso! Catálogo gerado com ${files.length} arquivos em: ${OUTPUT_FILE}`);
}

generateCatalog();
