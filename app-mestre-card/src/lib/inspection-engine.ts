import type { MestreCardData, InspectionCase } from '../types/mestre-card';

// Fotos dos postulantes disponíveis na pasta pública /inspection/
export const APPLICANT_PHOTOS = [
  './inspection/applicant-1.jpg',
  './inspection/applicant-2.jpg',
  './inspection/applicant-3.jpg',
  './inspection/applicant-4.jpg',
  './inspection/applicant-5.jpg',
  './inspection/applicant-6.jpg',
  './inspection/applicant-7.jpg',
  './inspection/applicant-8.jpg',
  './inspection/applicant-9.jpg',
  './inspection/applicant-10.jpg',
  './inspection/applicant-11.jpg',
  './inspection/applicant-12.jpg',
  './inspection/applicant-13.jpg',
  './inspection/applicant-14.jpg',
  './inspection/applicant-15.jpg',
];

const APPLICANT_PROFILES = [
  { name: 'Ana Maria Silva', title: 'Auxiliar Técnica de Laboratório', dept: 'Departamento de Registro Experimental', photo: './inspection/applicant-1.jpg' },
  { name: 'Dra. Eleanor Vance', title: 'Cátedra de Estudos Aplicados', dept: 'Divisão de Investigação Epistemológica', photo: './inspection/applicant-2.jpg' },
  { name: 'Dr. Arthur Pendelton', title: 'Perito Científico Chefe', dept: 'Comissão de Análise de Reagentes', photo: './inspection/applicant-3.jpg' },
  { name: 'Prof. A. Thompson', title: 'Catedrático de Fundamentos', dept: 'Instituto Central de Pesquisa', photo: './inspection/applicant-4.jpg' },
  { name: 'Cadete Marcos Valente', title: 'Aspirante a Médico-Cirurgião', dept: 'Corpo de Cadetes Universitários', photo: './inspection/applicant-5.jpg' },
  { name: 'Dra. Helena Rostova', title: 'Auditora de Ensaios Clínicos', dept: 'Gabinete de Biometria e Fisiologia', photo: './inspection/applicant-6.jpg' },
  { name: 'Eng. Viktor Koval', title: 'Inspetor Chefe de Termodinâmica', dept: 'Superintendência de Motores e Reatores', photo: './inspection/applicant-7.jpg' },
  { name: 'Profa. Clara Mendonça', title: 'Especialista em Análise Historiográfica', dept: 'Arquivo Geral de Doutrina e Tratados', photo: './inspection/applicant-8.jpg' },
  { name: 'Dr. Boris Belov', title: 'Pesquisador de Cinética Molecular', dept: 'Laboratório Central de Síntese Orgânica', photo: './inspection/applicant-9.jpg' },
  { name: 'Dra. Miriam Alencar', title: 'Analista de Citologia e Genética', dept: 'Gabinete de Triagem Celular', photo: './inspection/applicant-10.jpg' },
  { name: 'Cadete Samuel Prado', title: 'Aspirante a Oficial de Engenharia', dept: 'Corpo Técnico Auxiliar', photo: './inspection/applicant-11.jpg' },
  { name: 'Prof. Dmitri Volkov', title: 'Titular de Eletrodinâmica', dept: 'Divisão de Circuitos e Campos', photo: './inspection/applicant-12.jpg' },
  { name: 'Dra. Teresa Brandão', title: 'Pesquisadora em Ecologia e Biomas', dept: 'Conselho de Preservação e Recursos', photo: './inspection/applicant-13.jpg' },
  { name: 'Dr. Lucas Fontes', title: 'Curador de Geopolítica Clássica', dept: 'Instituto de Estratégia e Fronteiras', photo: './inspection/applicant-14.jpg' },
  { name: 'Profa. Sofia Chen', title: 'Catedrática de Métodos Quantitativos', dept: 'Divisão de Estatística e Modelagem', photo: './inspection/applicant-15.jpg' }
];

/**
 * Resolve e normaliza URLs de fotos de postulantes para evitar 404 em caminhos relativos
 */
export function resolveApplicantPhoto(photo: string | undefined, index: number): string {
  const fallbackNum = (Math.abs(index) % 15) + 1;
  const standardPath = `./inspection/applicant-${fallbackNum}.jpg`;

  if (!photo || typeof photo !== 'string' || photo.trim() === '') {
    return standardPath;
  }

  const clean = photo.trim();

  // Converte caminhos absolutos /inspection/ para caminhos relativos ./inspection/
  if (clean.startsWith('/inspection/')) {
    return `.${clean}`;
  }
  if (clean.startsWith('inspection/')) {
    return `./${clean}`;
  }
  if (/^\.\/inspection\/applicant-\d+\.jpg$/i.test(clean)) {
    return clean;
  }

  // Se tiver applicant-X no nome da imagem
  const match = clean.match(/applicant-(\d+)/i);
  if (match) {
    const num = Math.min(15, Math.max(1, parseInt(match[1], 10)));
    return `./inspection/applicant-${num}.jpg`;
  }

  // Fallback determinístico baseado no índice do caso
  return standardPath;
}

/**
 * Helper resiliente para extrair termos e premissas candidatos para investigação/confronto.
 * Garante que TODO e qualquer caso (seja legítimo ou fraudulento) possua de 2 a 4 termos investigáveis.
 */
export function extractCandidateTerms(statement: string, fallbackConcepts: string[] = []): string[] {
  if (!statement) return ['Premissa Geral', 'Diretriz Oficial'];

  const clean = statement.replace(/[*_~`"“”]/g, ' ').trim();
  const candidates: string[] = [];

  // 1. Extrair expressões entre aspas originais
  const quoteMatches = statement.match(/["“]([^"”]{4,45})["”]/g);
  if (quoteMatches) {
    quoteMatches.forEach(q => {
      const trimmed = q.replace(/["“”]/g, '').trim();
      if (trimmed.length >= 4 && !candidates.includes(trimmed)) {
        candidates.push(trimmed);
      }
    });
  }

  // 2. Extrair termos técnicos/conceituais com regex de palavras-chave clássicas
  const keywordMatches = clean.match(/\b(?:capitalismo\s+\w+|revolução\s+\w+|darwinismo\s+\w+|conferência\s+de\s+\w+|fardo\s+do\s+\w+|missão\s+\w+|entalpia\s+\w*|endot[ée]rmic\w+|exot[ée]rmic\w+|princípio\s+de\s+\w+|lei\s+de\s+\w+|reação\s+\w+|termodinâmica|eletrodinâmica|cinética|equilíbrio|velocidade|aceleração|gravidade|transformação|oxirredução|citologia|genética|fisiologia|reagente|soluto|solvente|pressão|temperatura|volume|concentração|proporcional\w*|inversamente\s+\w+|diretamente\s+\w+|superprodução|subconsumo|monopolista|financeiro|ocupação\s+\w+|imperialism\w+|colonial\w+|hegemonia)\b/gi);
  if (keywordMatches) {
    keywordMatches.forEach(k => {
      const norm = k.trim();
      if (norm.length >= 4 && !candidates.some(c => c.toLowerCase() === norm.toLowerCase())) {
        candidates.push(norm);
      }
    });
  }

  // 3. Extrair expressões nominais capitalizadas (ex: "Segunda Revolução Industrial", "Herbert Spencer", "Tratado de Berlim")
  const capitalizedMatches = clean.match(/\b[A-ZÁÉÍÓÚÂÊÔÃÕ][a-záéíóúâêôãõç]+(?:\s+(?:de|da|do|dos|das|e)?\s+[A-ZÁÉÍÓÚÂÊÔÃÕ][a-záéíóúâêôãõç]+){1,3}\b/g);
  if (capitalizedMatches) {
    capitalizedMatches.forEach(cap => {
      const norm = cap.trim();
      if (norm.length >= 5 && !['Para Fins', 'Em Resposta', 'Ministério Do', 'Solicito Deferimento', 'Dossiê De', 'Atesto A', 'Requeiro A'].some(stop => norm.startsWith(stop))) {
        if (!candidates.some(c => c.toLowerCase() === norm.toLowerCase())) {
          candidates.push(norm);
        }
      }
    });
  }

  // 4. Incluir conceitos de fallback se disponíveis
  if (fallbackConcepts && fallbackConcepts.length > 0) {
    fallbackConcepts.forEach(fc => {
      if (fc && fc.length >= 3 && !candidates.some(c => c.toLowerCase() === fc.toLowerCase())) {
        candidates.push(fc);
      }
    });
  }

  // 5. Se ainda tiver menos de 2 candidatos, extrair orações substantivas
  if (candidates.length < 2) {
    const clauses = clean.split(/[,;–—\.]/).map(s => s.trim()).filter(s => s.length >= 10 && s.length <= 45);
    clauses.forEach(cl => {
      if (!candidates.some(c => c.toLowerCase() === cl.toLowerCase())) {
        candidates.push(cl);
      }
    });
  }

  // Garante de 2 a 4 termos limpos e sem redundância
  const result = candidates
    .map(c => c.replace(/^["'\s]+|["'\s]+$/g, ''))
    .filter(c => c.length >= 3 && c.length <= 50)
    .slice(0, 4);

  return result.length >= 2 ? result : [...result, 'Premissa Teórica', 'Diretriz Oficial'].slice(0, 3);
}

/**
 * Gera casos de inspeção documental de altíssima densidade a partir de qualquer MestreCard
 */
export function generateInspectionCases(card: MestreCardData): InspectionCase[] {
  // Se o card já contiver casos ricos sob medida gerados pelo Gemini, utiliza-os diretamente
  if (card.sec07_arcade?.inspectionCases && card.sec07_arcade.inspectionCases.length > 0) {
    return card.sec07_arcade.inspectionCases.map((c, i) => {
      const profile = APPLICANT_PROFILES[i % APPLICANT_PROFILES.length];
      const rawThesis = c.thesisStatement || (c as any).allegedThesis || '';
      const candidateTerms = (c.suspiciousTerms && c.suspiciousTerms.length > 0)
        ? c.suspiciousTerms
        : extractCandidateTerms(rawThesis, c.claimedConcepts);

      return {
        ...c,
        thesisStatement: rawThesis || `\"Parecer técnico sob análise para fins de homologação perante o Ministério.\"`,
        applicantName: c.applicantName || profile.name,
        applicantTitle: c.applicantTitle || profile.title,
        applicantPhoto: resolveApplicantPhoto(c.applicantPhoto || profile.photo, i),
        department: c.department || profile.dept,
        fileNumber: c.fileNumber || `MKA-88-${2000 + i * 421}`,
        suspiciousTerms: candidateTerms,
        targetRuleId: c.targetRuleId || (c.isFraudulent ? 'rule-trap-0' : 'rule-theory-0')
      };
    });
  }

  const cases: InspectionCase[] = [];
  let caseIdx = 0;

  // 1. Gerar Casos Fraudulentos a partir de BLIND SPOTS (Armadilhas Reais de Banca)
  if (card.sec04_radar?.blindSpots && card.sec04_radar.blindSpots.length > 0) {
    card.sec04_radar.blindSpots.forEach((spot, i) => {
      const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
      const fileNum = `MKA-${80 + (i * 3) % 15}-${1000 + (i * 471) % 8999}`;

      // Extrai a tese distorcida ou a afirmação que parece convincente mas é armadilha
      const cleanAnalysis = spot.analysis.replace(/[*_~`]/g, '').trim();
      const parts = cleanAnalysis.split(/\s*\/\/\s*/);
      const mythPart = parts[0] || cleanAnalysis;
      const candidateTerms = extractCandidateTerms(cleanAnalysis, [spot.title, card.topic]);

      cases.push({
        id: `case-fraud-bs-${i}`,
        applicantName: profile.name,
        applicantTitle: profile.title,
        applicantPhoto: profile.photo,
        fileNumber: fileNum,
        department: profile.dept,
        thesisStatement: `\"Para fins de homologação do protocolo perante o Ministério, atesto formalmente a seguinte premissa doutrinária sobre ${card.title}: ${cleanAnalysis}\"`,
        claimedConcepts: [card.topic, spot.title || 'Distrator Clássico'],
        isFraudulent: true,
        fraudReason: `ANOMALIA DETECTADA: O documento defende uma falácia clássica de banca (${spot.title}). ${cleanAnalysis} Não atende ao rigor científico oficial.`,
        contradictionTrigger: mythPart,
        suspiciousTerms: candidateTerms,
        targetRuleId: `rule-trap-${i}`,
        denialReason: `FALÁCIA DE BANCA: ${(spot.title || 'PONTO CEGO').toUpperCase()}`,
        interrogation: {
          postulantExcuse: `\"Mas senhor Inspetor, no cotidiano e em muitas provas costuma-se aceitar que ${spot.title}! Por que essa premissa seria uma anomalia documental?\"`,
          inspectorVerdict: `\"Negativo. O Ministério veda expressamente essa falácia: ${cleanAnalysis}. A prova pune quem restringe o conceito a essa armadilha.\"`
        },
        relevantRuleSnippet: `Manual MKA - Eixo de Blindagem: Falsas correlações sobre ${card.topic} devem ser sumariamente denegadas.`,
        difficulty: 'Armadilha TRI'
      });
    });
  }

  // 2. Gerar Casos a partir de TF DATA do Arcade (Afirmações Verdadeiras e Falsas)
  if (card.sec07_arcade?.tfData && card.sec07_arcade.tfData.length > 0) {
    card.sec07_arcade.tfData.forEach((tf, i) => {
      const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
      const fileNum = `MKA-${75 + (i * 2) % 20}-${3000 + (i * 513) % 6999}`;
      const cleanStatement = tf.statement.replace(/[*_~`]/g, '').trim();
      const cleanFeedback = (tf.feedback || '').replace(/[*_~`]/g, '').trim();
      let theoryTargetIdx = 0;
      if (card.sec02_theory?.blocks && card.sec02_theory.blocks.length > 0) {
        const found = card.sec02_theory.blocks.findIndex(b => {
          const bText = (b.title + ' ' + b.content).toLowerCase();
          const sWords = cleanStatement.toLowerCase().split(/\s+/).filter(w => w.length > 4);
          return sWords.some(w => bText.includes(w));
        });
        theoryTargetIdx = found >= 0 ? found : (i % card.sec02_theory.blocks.length);
      }

      const candidateTerms = extractCandidateTerms(cleanStatement, [card.topic]);

      cases.push({
        id: `case-tf-${i}`,
        applicantName: profile.name,
        applicantTitle: profile.title,
        applicantPhoto: profile.photo,
        fileNumber: fileNum,
        department: profile.dept,
        thesisStatement: `\"Solicito deferimento deste parecer técnico. Afirmo com base nos autos que: ${cleanStatement}\"`,
        claimedConcepts: [card.topic, tf.isTrue ? 'Conceito Canônico' : 'Alegação Suspeita'],
        isFraudulent: !tf.isTrue,
        fraudReason: !tf.isTrue 
          ? `FRAUDE CONCEITUAL: A afirmativa contraria os preceitos científicos do Ministério. Motivo: ${cleanFeedback}`
          : undefined,
        contradictionTrigger: !tf.isTrue ? cleanStatement : undefined,
        suspiciousTerms: candidateTerms,
        targetRuleId: `rule-theory-${theoryTargetIdx}`,
        denialReason: !tf.isTrue ? `VIOLAÇÃO: ARTIGO ${theoryTargetIdx + 1}` : undefined,
        interrogation: {
          postulantExcuse: !tf.isTrue
            ? `\"Inspetor de turno, peço deferimento! Essa afirmação parece perfeitamente lógica e consistente à primeira vista!\"`
            : `\"Inspetor, os autos foram revisados e conferem 100% com o regulamento oficial de ${card.title}.\"`,
          inspectorVerdict: !tf.isTrue
            ? `\"Indeferido. A premissa incorre em contradição direta: ${cleanFeedback || 'Violação dos cânones científicos oficiais.'}\"`
            : `\"Conforme. A tese observa rigorosamente a verdade teórica homologada.\"`
        },
        relevantRuleSnippet: cleanFeedback || `Conforme os cânones oficiais de ${card.title}, todas as premissas devem observar a correlação formal.`,
        difficulty: tf.isTrue ? 'Rotina' : 'Crítico'
      });
    });
  }

  // 3. Gerar Casos a partir do Laboratório Tático (Questões de Prova e Distratores)
  if (card.sec05_lab?.questions && card.sec05_lab.questions.length > 0) {
    card.sec05_lab.questions.slice(0, 3).forEach((q, i) => {
      const correctOpt = q.options.find(o => o.isCorrect);
      const wrongOpt = q.options.find(o => !o.isCorrect);
      const theoryTargetIdx = i % (card.sec02_theory?.blocks?.length || 1);

      // Gera um caso legítimo com a resposta correta
      if (correctOpt) {
        const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
        const candidateTerms = extractCandidateTerms(correctOpt.text, [card.topic, 'Resolução Homologada']);
        cases.push({
          id: `case-lab-valid-${i}`,
          applicantName: profile.name,
          applicantTitle: profile.title,
          applicantPhoto: profile.photo,
          fileNumber: `MKA-88-${5000 + i * 231}`,
          department: profile.dept,
          thesisStatement: `\"Em resposta à demanda de triagem de ${card.title} (${q.enunciado.substring(0, 100)}...), certifico a validade da seguinte conclusão: ${correctOpt.text}\"`,
          claimedConcepts: [card.topic, 'Resolução Homologada'],
          isFraudulent: false,
          suspiciousTerms: candidateTerms,
          targetRuleId: `rule-theory-${theoryTargetIdx}`,
          interrogation: {
            postulantExcuse: `\"Inspetor, o cálculo e a justificativa foram demonstrados na íntegra de acordo com o padrão de prova.\"`,
            inspectorVerdict: `\"Conforme. Resolução validada pela banca examinadora do Ministério.\"`
          },
          relevantRuleSnippet: q.resolution?.technicalVerdict || `Atestado pelo comitê técnico do Ministério.`,
          difficulty: 'Rotina'
        });
      }

      // Gera um caso fraudulento com um distrator atraente
      if (wrongOpt) {
        const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
        const candidateTerms = extractCandidateTerms(wrongOpt.text, [card.topic, 'Distrator Incorreto']);
        cases.push({
          id: `case-lab-fraud-${i}`,
          applicantName: profile.name,
          applicantTitle: profile.title,
          applicantPhoto: profile.photo,
          fileNumber: `MKA-89-${6000 + i * 317}`,
          department: profile.dept,
          thesisStatement: `\"Requeiro a aprovação da seguinte tese científica perante o Ministério: ${wrongOpt.text}\"`,
          claimedConcepts: [card.topic, 'Distrator Incorreto'],
          isFraudulent: true,
          fraudReason: `DISTRAÇÃO TÁTICA DETECTADA: ${q.resolution?.distractorAnalysis || 'Esta opção contém uma falha sutil de banca e deve ser reprovada.'}`,
          contradictionTrigger: wrongOpt.text,
          suspiciousTerms: candidateTerms,
          targetRuleId: card.sec04_radar?.blindSpots?.length ? 'rule-trap-0' : 'rule-theory-0',
          denialReason: 'DISTRAÇÃO TÁTICA: PREMISSA INCORRETA',
          interrogation: {
            postulantExcuse: `\"Auditor, essa conclusão foi obtida aplicando o enunciado diretamente. Por que apontar como distrator inválido?\"`,
            inspectorVerdict: `\"Denegação mandatória. ${q.resolution?.distractorAnalysis || 'Esta alternativa é uma armadilha calculada e viola as leis canônicas da matéria.'}\"`
          },
          relevantRuleSnippet: q.resolution?.technicalVerdict || `O Ministério exige conformidade com as leis de ${card.topic}.`,
          difficulty: 'Armadilha TRI'
        });
      }
    });
  }

  // 4. Se tiver poucos casos, adiciona a partir da Teoria
  if (cases.length < 4 && card.sec02_theory?.blocks && card.sec02_theory.blocks.length > 0) {
    card.sec02_theory.blocks.forEach((block, i) => {
      const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
      const cleanContent = block.content.replace(/[*_~`$]/g, '').substring(0, 160);
      const candidateTerms = extractCandidateTerms(cleanContent, [block.title, card.topic]);
      cases.push({
        id: `case-theory-${i}`,
        applicantName: profile.name,
        applicantTitle: profile.title,
        applicantPhoto: profile.photo,
        fileNumber: `MKA-91-${7000 + i * 111}`,
        department: profile.dept,
        thesisStatement: `\"Dossiê de Fundamentação [${block.title}]: Atesto a rigorosa aplicação das leis de ${card.title}. Constata-se que: ${cleanContent}...\"`,
        claimedConcepts: [card.topic, block.title],
        isFraudulent: false,
        suspiciousTerms: candidateTerms,
        targetRuleId: `rule-theory-${i}`,
        interrogation: {
          postulantExcuse: `\"Inspetor, transcrevo fielmente o Artigo Oficial ${block.number || i + 1} para registro do protocolo.\"`,
          inspectorVerdict: `\"Homologado. Conteúdo canônico conferido perante a Lei Geral.\"`
        },
        relevantRuleSnippet: `Artigo ${block.number}: ${block.title}. Todas as conclusões correlatas são válidas.`,
        difficulty: 'Rotina'
      });
    });
  }

  // Embaralha determinístico para alternar casos válidos e fraudes
  return cases.sort((a, b) => {
    const hashA = (a.id.charCodeAt(a.id.length - 1) * 31) % 100;
    const hashB = (b.id.charCodeAt(b.id.length - 1) * 31) % 100;
    return hashA - hashB;
  });
}
