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
 * Gera casos de inspeção documental de altíssima densidade a partir de qualquer MestreCard
 */
export function generateInspectionCases(card: MestreCardData): InspectionCase[] {
  const cases: InspectionCase[] = [];
  let caseIdx = 0;

  // 1. Gerar Casos Fraudulentos a partir de BLIND SPOTS (Armadilhas Reais de Banca)
  if (card.sec04_radar?.blindSpots && card.sec04_radar.blindSpots.length > 0) {
    card.sec04_radar.blindSpots.forEach((spot, i) => {
      const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
      const fileNum = `MKA-${80 + (i * 3) % 15}-${1000 + (i * 471) % 8999}`;

      // Extrai a tese distorcida ou a afirmação que parece convincente mas é armadilha
      const cleanAnalysis = spot.analysis.replace(/[*_~`]/g, '').trim();

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
        relevantRuleSnippet: cleanFeedback || `Conforme os cânones oficiais de ${card.title}, todas as premissas devem observar a correlação formal.`,
        difficulty: tf.isTrue ? 'Normal' : 'Crítico'
      });
    });
  }

  // 3. Gerar Casos a partir do Laboratório Tático (Questões de Prova e Distratores)
  if (card.sec05_lab?.questions && card.sec05_lab.questions.length > 0) {
    card.sec05_lab.questions.slice(0, 3).forEach((q, i) => {
      const correctOpt = q.options.find(o => o.isCorrect);
      const wrongOpt = q.options.find(o => !o.isCorrect);

      // Gera um caso legítimo com a resposta correta
      if (correctOpt) {
        const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
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
          relevantRuleSnippet: q.resolution?.technicalVerdict || `Atestado pelo comitê técnico do Ministério.`,
          difficulty: 'Normal'
        });
      }

      // Gera um caso fraudulento com um distrator atraente
      if (wrongOpt) {
        const profile = APPLICANT_PROFILES[(caseIdx++) % APPLICANT_PROFILES.length];
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
        relevantRuleSnippet: `Artigo ${block.number}: ${block.title}. Todas as conclusões correlatas são válidas.`,
        difficulty: 'Normal'
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
