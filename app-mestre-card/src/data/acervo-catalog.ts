// src/data/acervo-catalog.ts
// Catálogo Oficial do Acervo de Provas e Exercícios do MestreCard
// Total de Itens Indexados: 598

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

export const ACERVO_CATALOG: AcervoItem[] = [
  {
    "id": "acervo-8c72045e-1",
    "filename": "acidos-nucleicos-anotacoes.pdf",
    "title": "acidos nucleicos anotacoes",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "acidos"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/acidos-nucleicos-anotacoes.pdf",
    "relativePath": "extras/biologia/acidos-nucleicos-anotacoes.pdf",
    "sizeFormatted": "7.8 MB"
  },
  {
    "id": "acervo-6dd5d895-2",
    "filename": "agua-revisao-uft-anotacoes.pdf",
    "title": "agua revisao uft anotacoes",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "UFT",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/agua-revisao-uft-anotacoes.pdf",
    "relativePath": "extras/biologia/agua-revisao-uft-anotacoes.pdf",
    "sizeFormatted": "8.7 MB"
  },
  {
    "id": "acervo-88714e96-3",
    "filename": "anotacoes-bioquimica-carboidratos-e-lipideos-parte-03.pdf",
    "title": "anotacoes bioquimica carboidratos e lipideos parte 03",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "bioquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/bioqu%C3%ADmica/anotacoes-bioquimica-carboidratos-e-lipideos-parte-03.pdf",
    "relativePath": "extras/biologia/bioquímica/anotacoes-bioquimica-carboidratos-e-lipideos-parte-03.pdf",
    "sizeFormatted": "15.0 MB"
  },
  {
    "id": "acervo-2e691f0c-4",
    "filename": "bioquimica.pdf",
    "title": "bioquimica",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "bioquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/bioqu%C3%ADmica/bioquimica.pdf",
    "relativePath": "extras/biologia/bioquímica/bioquimica.pdf",
    "sizeFormatted": "6.7 MB"
  },
  {
    "id": "acervo-4bb8ebca-5",
    "filename": "Resumo das aulas.txt",
    "title": "Resumo das aulas",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/bioqu%C3%ADmica/Resumo%20das%20aulas.txt",
    "relativePath": "extras/biologia/bioquímica/Resumo das aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-1878ee96-6",
    "filename": "VITAMINAS, CARBOIDRATOS, LIPÍDEOS E PROTEÍNAS - ANOTAÇÕES.pdf",
    "title": "VITAMINAS, CARBOIDRATOS, LIPÍDEOS E PROTEÍNAS ANOTAÇÕES",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/bioqu%C3%ADmica/VITAMINAS%2C%20CARBOIDRATOS%2C%20LIP%C3%8DDEOS%20E%20PROTE%C3%8DNAS%20-%20ANOTA%C3%87%C3%95ES.pdf",
    "relativePath": "extras/biologia/bioquímica/VITAMINAS, CARBOIDRATOS, LIPÍDEOS E PROTEÍNAS - ANOTAÇÕES.pdf",
    "sizeFormatted": "23.6 MB"
  },
  {
    "id": "acervo-993581ca-7",
    "filename": "biotecnologia.pdf",
    "title": "biotecnologia",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Biotecnologia/biotecnologia.pdf",
    "relativePath": "extras/biologia/Biotecnologia/biotecnologia.pdf",
    "sizeFormatted": "4.3 MB"
  },
  {
    "id": "acervo-567d10ef-8",
    "filename": "Resumo da aula.txt",
    "title": "Resumo da aula",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Biotecnologia/Resumo%20da%20aula.txt",
    "relativePath": "extras/biologia/Biotecnologia/Resumo da aula.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-c109576d-9",
    "filename": "biotecnologia-2o-lei-de-mendel-linkage-e-equilibrio-de-hardy-weinberg-anotacoes.pdf",
    "title": "biotecnologia 2o lei de mendel linkage e equilibrio de hardy weinberg anotacoes",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "equilibrio",
      "mendel"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/biotecnologia-2o-lei-de-mendel-linkage-e-equilibrio-de-hardy-weinberg-anotacoes.pdf",
    "relativePath": "extras/biologia/biotecnologia-2o-lei-de-mendel-linkage-e-equilibrio-de-hardy-weinberg-anotacoes.pdf",
    "sizeFormatted": "8.6 MB"
  },
  {
    "id": "acervo-ac14555b-10",
    "filename": "anotacoes-botanica.pdf",
    "title": "anotacoes botanica",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "botanica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Bot%C3%A2nica/anotacoes-botanica.pdf",
    "relativePath": "extras/biologia/Botânica/anotacoes-botanica.pdf",
    "sizeFormatted": "11.5 MB"
  },
  {
    "id": "acervo-59e2f996-11",
    "filename": "anotacoes.pdf",
    "title": "anotacoes",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Bot%C3%A2nica/anotacoes.pdf",
    "relativePath": "extras/biologia/Botânica/anotacoes.pdf",
    "sizeFormatted": "5.6 MB"
  },
  {
    "id": "acervo-aff8dd06-12",
    "filename": "Resumos das aulas.txt",
    "title": "Resumos das aulas",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Bot%C3%A2nica/Resumos%20das%20aulas.txt",
    "relativePath": "extras/biologia/Botânica/Resumos das aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-1db01da1-13",
    "filename": "BOTÂNICA I - GRUPOS VEGETAIS.pdf",
    "title": "BOTÂNICA I GRUPOS VEGETAIS",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/BOT%C3%82NICA%20I%20-%20GRUPOS%20VEGETAIS.pdf",
    "relativePath": "extras/biologia/BOTÂNICA I - GRUPOS VEGETAIS.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-02d6fa91-14",
    "filename": "BOTÂNICA II - FISIOLOGIA E HISTOLOGIA VEGETAL.pdf",
    "title": "BOTÂNICA II FISIOLOGIA E HISTOLOGIA VEGETAL",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/BOT%C3%82NICA%20II%20-%20FISIOLOGIA%20E%20HISTOLOGIA%20VEGETAL.pdf",
    "relativePath": "extras/biologia/BOTÂNICA II - FISIOLOGIA E HISTOLOGIA VEGETAL.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-b8002fc1-15",
    "filename": "CICLO CELULAR.pdf",
    "title": "CICLO CELULAR",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/CICLO%20CELULAR.pdf",
    "relativePath": "extras/biologia/CICLO CELULAR.pdf",
    "sizeFormatted": "1.7 MB"
  },
  {
    "id": "acervo-7acd913c-16",
    "filename": "ciclo-celular-e-divisoes-celulares.pdf",
    "title": "ciclo celular e divisoes celulares",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "citologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Citologia/ciclo-celular-e-divisoes-celulares.pdf",
    "relativePath": "extras/biologia/Citologia/ciclo-celular-e-divisoes-celulares.pdf",
    "sizeFormatted": "9.8 MB"
  },
  {
    "id": "acervo-5ea947b7-17",
    "filename": "meiose-e-gametogenese.pdf",
    "title": "meiose e gametogenese",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "citologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Citologia/meiose-e-gametogenese.pdf",
    "relativePath": "extras/biologia/Citologia/meiose-e-gametogenese.pdf",
    "sizeFormatted": "2.8 MB"
  },
  {
    "id": "acervo-731beb57-18",
    "filename": "membrana-plasmatica-composicao-estrutura-e-principais-funcoes.pdf",
    "title": "membrana plasmatica composicao estrutura e principais funcoes",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "citologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Citologia/membrana-plasmatica-composicao-estrutura-e-principais-funcoes.pdf",
    "relativePath": "extras/biologia/Citologia/membrana-plasmatica-composicao-estrutura-e-principais-funcoes.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-d8f8c96b-19",
    "filename": "organelas-celulares.pdf",
    "title": "organelas celulares",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "citologia",
      "organelas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Citologia/organelas-celulares.pdf",
    "relativePath": "extras/biologia/Citologia/organelas-celulares.pdf",
    "sizeFormatted": "11.2 MB"
  },
  {
    "id": "acervo-a5340c06-20",
    "filename": "Resumo das aulas.txt",
    "title": "Resumo das aulas",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "citologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Citologia/Resumo%20das%20aulas.txt",
    "relativePath": "extras/biologia/Citologia/Resumo das aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-882c2f52-21",
    "filename": "citologia-organelas-celulares-anotacoes.pdf",
    "title": "citologia organelas celulares anotacoes",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "citologia",
      "organelas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/citologia-organelas-celulares-anotacoes.pdf",
    "relativePath": "extras/biologia/citologia-organelas-celulares-anotacoes.pdf",
    "sizeFormatted": "10.4 MB"
  },
  {
    "id": "acervo-4f9726c3-22",
    "filename": "ECOLOGIA I.pdf",
    "title": "ECOLOGIA I",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ecologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Ecologia/ECOLOGIA%20I.pdf",
    "relativePath": "extras/biologia/Ecologia/ECOLOGIA I.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-059f5554-23",
    "filename": "ECOLOGIA II.pdf",
    "title": "ECOLOGIA II",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ecologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Ecologia/ECOLOGIA%20II.pdf",
    "relativePath": "extras/biologia/Ecologia/ECOLOGIA II.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-4052f03b-24",
    "filename": "lista-01-biologia-ecologia-turma-tradicionais.pdf",
    "title": "lista 01 biologia ecologia turma tradicionais",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ecologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Ecologia/lista-01-biologia-ecologia-turma-tradicionais.pdf",
    "relativePath": "extras/biologia/Ecologia/lista-01-biologia-ecologia-turma-tradicionais.pdf",
    "sizeFormatted": "3.5 MB"
  },
  {
    "id": "acervo-826135a4-25",
    "filename": "Resumos das aulas.txt",
    "title": "Resumos das aulas",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "ecologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Ecologia/Resumos%20das%20aulas.txt",
    "relativePath": "extras/biologia/Ecologia/Resumos das aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-4359220e-26",
    "filename": "ciclo-celular-e-divisoes-celulares.pdf",
    "title": "ciclo celular e divisoes celulares",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/ciclo-celular-e-divisoes-celulares.pdf",
    "relativePath": "extras/biologia/Embriologia/ciclo-celular-e-divisoes-celulares.pdf",
    "sizeFormatted": "9.8 MB"
  },
  {
    "id": "acervo-255c1065-27",
    "filename": "embriologia-01-tipos-de-zigoto-e-segmentacao.pdf",
    "title": "embriologia 01 tipos de zigoto e segmentacao",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/embriologia-01-tipos-de-zigoto-e-segmentacao.pdf",
    "relativePath": "extras/biologia/Embriologia/embriologia-01-tipos-de-zigoto-e-segmentacao.pdf",
    "sizeFormatted": "4.8 MB"
  },
  {
    "id": "acervo-88f991b3-28",
    "filename": "embriologia-02-classificacao-dos-animais-postura-de-ovos-e-placenta.pdf",
    "title": "embriologia 02 classificacao dos animais postura de ovos e placenta",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/embriologia-02-classificacao-dos-animais-postura-de-ovos-e-placenta.pdf",
    "relativePath": "extras/biologia/Embriologia/embriologia-02-classificacao-dos-animais-postura-de-ovos-e-placenta.pdf",
    "sizeFormatted": "3.9 MB"
  },
  {
    "id": "acervo-2712b7a9-29",
    "filename": "embriologia-04-formacao-da-gastrula-e-neurula.pdf",
    "title": "embriologia 04 formacao da gastrula e neurula",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/embriologia-04-formacao-da-gastrula-e-neurula.pdf",
    "relativePath": "extras/biologia/Embriologia/embriologia-04-formacao-da-gastrula-e-neurula.pdf",
    "sizeFormatted": "5.9 MB"
  },
  {
    "id": "acervo-a70e3d3f-30",
    "filename": "embriologia-05-organogenese-folhetos-embrionarios.pdf",
    "title": "embriologia 05 organogenese folhetos embrionarios",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/embriologia-05-organogenese-folhetos-embrionarios.pdf",
    "relativePath": "extras/biologia/Embriologia/embriologia-05-organogenese-folhetos-embrionarios.pdf",
    "sizeFormatted": "7.7 MB"
  },
  {
    "id": "acervo-3818b0ee-31",
    "filename": "embriologia-06-anexos-embrionarios.pdf",
    "title": "embriologia 06 anexos embrionarios",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/embriologia-06-anexos-embrionarios.pdf",
    "relativePath": "extras/biologia/Embriologia/embriologia-06-anexos-embrionarios.pdf",
    "sizeFormatted": "2.1 MB"
  },
  {
    "id": "acervo-ee4c8071-32",
    "filename": "lista-de-embriologia-turma-tradicionais.pdf",
    "title": "lista de embriologia turma tradicionais",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/lista-de-embriologia-turma-tradicionais.pdf",
    "relativePath": "extras/biologia/Embriologia/lista-de-embriologia-turma-tradicionais.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-3bba80f0-33",
    "filename": "meiose-e-gametogenese.pdf",
    "title": "meiose e gametogenese",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/meiose-e-gametogenese.pdf",
    "relativePath": "extras/biologia/Embriologia/meiose-e-gametogenese.pdf",
    "sizeFormatted": "2.8 MB"
  },
  {
    "id": "acervo-612e641c-34",
    "filename": "membrana-plasmatica-composicao-estrutura-e-principais-funcoes.pdf",
    "title": "membrana plasmatica composicao estrutura e principais funcoes",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/membrana-plasmatica-composicao-estrutura-e-principais-funcoes.pdf",
    "relativePath": "extras/biologia/Embriologia/membrana-plasmatica-composicao-estrutura-e-principais-funcoes.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-55d5eb23-35",
    "filename": "Novo(a) Documento de Texto.txt",
    "title": "Novo(a) Documento de Texto",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/Novo(a)%20Documento%20de%20Texto.txt",
    "relativePath": "extras/biologia/Embriologia/Novo(a) Documento de Texto.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-24133a2f-36",
    "filename": "organelas-celulares.pdf",
    "title": "organelas celulares",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "organelas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Embriologia/organelas-celulares.pdf",
    "relativePath": "extras/biologia/Embriologia/organelas-celulares.pdf",
    "sizeFormatted": "11.2 MB"
  },
  {
    "id": "acervo-b38410fd-37",
    "filename": "EMBRIOLOGIA.pdf",
    "title": "EMBRIOLOGIA",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/EMBRIOLOGIA.pdf",
    "relativePath": "extras/biologia/EMBRIOLOGIA.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-48ad06c6-38",
    "filename": "ENEM por Competencia  Ciencias da Natureza_260907_084420.pdf",
    "title": "ENEM por Competencia Ciencias da Natureza 260907 084420",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "ENEM",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/ENEM%20por%20Competencia%20%20Ciencias%20da%20Natureza_260907_084420.pdf",
    "relativePath": "extras/biologia/ENEM por Competencia  Ciencias da Natureza_260907_084420.pdf",
    "sizeFormatted": "30.2 MB"
  },
  {
    "id": "acervo-d10e72e8-39",
    "filename": "evolucao.pdf",
    "title": "evolucao",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "evolucao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/evolucao.pdf",
    "relativePath": "extras/biologia/evolucao.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-610b4c43-40",
    "filename": "evolucao.pdf",
    "title": "evolucao",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "evolucao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Evolu%C3%A7%C3%A3o/evolucao.pdf",
    "relativePath": "extras/biologia/Evolução/evolucao.pdf",
    "sizeFormatted": "11.8 MB"
  },
  {
    "id": "acervo-f392de61-41",
    "filename": "Resumo das aulas.txt",
    "title": "Resumo das aulas",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Evolu%C3%A7%C3%A3o/Resumo%20das%20aulas.txt",
    "relativePath": "extras/biologia/Evolução/Resumo das aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-c0b6773e-42",
    "filename": "FECUNDAÇÃO HUMANA - ANOTAÇÕES.pdf",
    "title": "FECUNDAÇÃO HUMANA ANOTAÇÕES",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/FECUNDA%C3%87%C3%83O%20HUMANA%20-%20ANOTA%C3%87%C3%95ES.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/FECUNDAÇÃO HUMANA - ANOTAÇÕES.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-fb40f6ed-43",
    "filename": "FISIOLOGIA 05_ SISTEMA EXCRETOR.pdf",
    "title": "FISIOLOGIA 05 SISTEMA EXCRETOR",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/FISIOLOGIA%2005_%20SISTEMA%20EXCRETOR.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/FISIOLOGIA 05_ SISTEMA EXCRETOR.pdf",
    "sizeFormatted": "7.6 MB"
  },
  {
    "id": "acervo-664e89d8-44",
    "filename": "FISIOLOGIA HUMANA 01_ SISTEMA DIGESTÓRIO.pdf",
    "title": "FISIOLOGIA HUMANA 01 SISTEMA DIGESTÓRIO",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/FISIOLOGIA%20HUMANA%2001_%20SISTEMA%20DIGEST%C3%93RIO.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/FISIOLOGIA HUMANA 01_ SISTEMA DIGESTÓRIO.pdf",
    "sizeFormatted": "8.0 MB"
  },
  {
    "id": "acervo-1dbae25b-45",
    "filename": "FISIOLOGIA HUMANA 02_ SISTEMA CARDIOVASCULAR.pdf",
    "title": "FISIOLOGIA HUMANA 02 SISTEMA CARDIOVASCULAR",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia",
      "cardiovascular"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/FISIOLOGIA%20HUMANA%2002_%20SISTEMA%20CARDIOVASCULAR.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/FISIOLOGIA HUMANA 02_ SISTEMA CARDIOVASCULAR.pdf",
    "sizeFormatted": "5.2 MB"
  },
  {
    "id": "acervo-4a68f73f-46",
    "filename": "FISIOLOGIA HUMANA_ SISTEMA IMUNOLÓGICO.pdf",
    "title": "FISIOLOGIA HUMANA SISTEMA IMUNOLÓGICO",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/FISIOLOGIA%20HUMANA_%20SISTEMA%20IMUNOL%C3%93GICO.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/FISIOLOGIA HUMANA_ SISTEMA IMUNOLÓGICO.pdf",
    "sizeFormatted": "5.4 MB"
  },
  {
    "id": "acervo-fde2b608-47",
    "filename": "MÉTODOS CONTRACEPTIVOS - ANOTAÇÕES.pdf",
    "title": "MÉTODOS CONTRACEPTIVOS ANOTAÇÕES",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/M%C3%89TODOS%20CONTRACEPTIVOS%20-%20ANOTA%C3%87%C3%95ES.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/MÉTODOS CONTRACEPTIVOS - ANOTAÇÕES.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-355d090e-48",
    "filename": "Resumo das Aulas.txt",
    "title": "Resumo das Aulas",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/Resumo%20das%20Aulas.txt",
    "relativePath": "extras/biologia/Fisiologia Humana/Resumo das Aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-296b0909-49",
    "filename": "SISTEMA REPRODUTOR MASCULINO E FEMININO - ANOTAÇÕES.pdf",
    "title": "SISTEMA REPRODUTOR MASCULINO E FEMININO ANOTAÇÕES",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/SISTEMA%20REPRODUTOR%20MASCULINO%20E%20FEMININO%20-%20ANOTA%C3%87%C3%95ES.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/SISTEMA REPRODUTOR MASCULINO E FEMININO - ANOTAÇÕES.pdf",
    "sizeFormatted": "4.5 MB"
  },
  {
    "id": "acervo-5c3e4c90-50",
    "filename": "sistema-endocrino.pdf",
    "title": "sistema endocrino",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/sistema-endocrino.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/sistema-endocrino.pdf",
    "sizeFormatted": "12.6 MB"
  },
  {
    "id": "acervo-150dff27-51",
    "filename": "sistema-nervoso (1).pdf",
    "title": "sistema nervoso (1)",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia",
      "sistema nervoso"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/sistema-nervoso%20(1).pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/sistema-nervoso (1).pdf",
    "sizeFormatted": "6.5 MB"
  },
  {
    "id": "acervo-28c77101-52",
    "filename": "sistema-nervoso.pdf",
    "title": "sistema nervoso",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia",
      "sistema nervoso"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Fisiologia%20Humana/sistema-nervoso.pdf",
    "relativePath": "extras/biologia/Fisiologia Humana/sistema-nervoso.pdf",
    "sizeFormatted": "6.5 MB"
  },
  {
    "id": "acervo-16011fe3-53",
    "filename": "FISIOLOGIA HUMANA I.pdf",
    "title": "FISIOLOGIA HUMANA I",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/FISIOLOGIA%20HUMANA%20I.pdf",
    "relativePath": "extras/biologia/FISIOLOGIA HUMANA I.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-9ff05088-54",
    "filename": "fisiologia-humana-ii-sistemas-endocrino-imunitario-e-nervoso.pdf",
    "title": "fisiologia humana ii sistemas endocrino imunitario e nervoso",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "fisiologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/fisiologia-humana-ii-sistemas-endocrino-imunitario-e-nervoso.pdf",
    "relativePath": "extras/biologia/fisiologia-humana-ii-sistemas-endocrino-imunitario-e-nervoso.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-7b34a949-55",
    "filename": "1o-lei-de-mendel.pdf",
    "title": "1o lei de mendel",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "mendel"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/1o-lei-de-mendel.pdf",
    "relativePath": "extras/biologia/genética/1o-lei-de-mendel.pdf",
    "sizeFormatted": "8.9 MB"
  },
  {
    "id": "acervo-cf031742-56",
    "filename": "alelos-letais.pdf",
    "title": "alelos letais",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/alelos-letais.pdf",
    "relativePath": "extras/biologia/genética/alelos-letais.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-4cc91980-57",
    "filename": "genetica-01-introducao-a-genetica-conceitos-importantes.pdf",
    "title": "genetica 01 introducao a genetica conceitos importantes",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "genetica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/genetica-01-introducao-a-genetica-conceitos-importantes.pdf",
    "relativePath": "extras/biologia/genética/genetica-01-introducao-a-genetica-conceitos-importantes.pdf",
    "sizeFormatted": "5.1 MB"
  },
  {
    "id": "acervo-ccd83300-58",
    "filename": "lista-de-genetica-p1-turma-tradicionais.pdf",
    "title": "lista de genetica p1 turma tradicionais",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "genetica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/lista-de-genetica-p1-turma-tradicionais.pdf",
    "relativePath": "extras/biologia/genética/lista-de-genetica-p1-turma-tradicionais.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-de40969f-59",
    "filename": "lista-de-genetica.pdf",
    "title": "lista de genetica",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "genetica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/lista-de-genetica.pdf",
    "relativePath": "extras/biologia/genética/lista-de-genetica.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-e764f7d2-60",
    "filename": "Resumo das aulas.txt",
    "title": "Resumo das aulas",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/Resumo%20das%20aulas.txt",
    "relativePath": "extras/biologia/genética/Resumo das aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-b8a5d2eb-61",
    "filename": "sangue.pdf",
    "title": "sangue",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/sangue.pdf",
    "relativePath": "extras/biologia/genética/sangue.pdf",
    "sizeFormatted": "5.4 MB"
  },
  {
    "id": "acervo-1842de75-62",
    "filename": "sexuais.pdf",
    "title": "sexuais",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/gen%C3%A9tica/sexuais.pdf",
    "relativePath": "extras/biologia/genética/sexuais.pdf",
    "sizeFormatted": "6.6 MB"
  },
  {
    "id": "acervo-d89d6257-63",
    "filename": "GENÉTICA - 1ª LEI DE MENDEL E CASOS ESPECIAIS.pdf",
    "title": "GENÉTICA 1ª LEI DE MENDEL E CASOS ESPECIAIS",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "mendel"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/GEN%C3%89TICA%20-%201%C2%AA%20LEI%20DE%20MENDEL%20E%20CASOS%20ESPECIAIS.pdf",
    "relativePath": "extras/biologia/GENÉTICA - 1ª LEI DE MENDEL E CASOS ESPECIAIS.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-c6f257eb-64",
    "filename": "GENÉTICA_ TIPOS SANGUÍNEOS E HERANÇA SEXUAL.pdf",
    "title": "GENÉTICA TIPOS SANGUÍNEOS E HERANÇA SEXUAL",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/GEN%C3%89TICA_%20TIPOS%20SANGU%C3%8DNEOS%20E%20HERAN%C3%87A%20SEXUAL.pdf",
    "relativePath": "extras/biologia/GENÉTICA_ TIPOS SANGUÍNEOS E HERANÇA SEXUAL.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-27f4c631-65",
    "filename": "LISTA DE BIOLOGIA - BOTÃ_NICA E ZOOLOGIA - EXATO U_260907_084442.pdf",
    "title": "LISTA DE BIOLOGIA BOTÃ NICA E ZOOLOGIA EXATO U 260907 084442",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "zoologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/LISTA%20DE%20BIOLOGIA%20-%20BOT%C3%83_NICA%20E%20ZOOLOGIA%20-%20EXATO%20U_260907_084442.pdf",
    "relativePath": "extras/biologia/LISTA DE BIOLOGIA - BOTÃ_NICA E ZOOLOGIA - EXATO U_260907_084442.pdf",
    "sizeFormatted": "5.4 MB"
  },
  {
    "id": "acervo-b2915826-66",
    "filename": "MEMBRANA PLASMÁTICA.pdf",
    "title": "MEMBRANA PLASMÁTICA",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/MEMBRANA%20PLASM%C3%81TICA.pdf",
    "relativePath": "extras/biologia/MEMBRANA PLASMÁTICA.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-a580f2df-67",
    "filename": "metabolismo-energetico-anotacoes.pdf",
    "title": "metabolismo energetico anotacoes",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/metabolismo-energetico-anotacoes.pdf",
    "relativePath": "extras/biologia/metabolismo-energetico-anotacoes.pdf",
    "sizeFormatted": "11.0 MB"
  },
  {
    "id": "acervo-c4f0ca25-68",
    "filename": "ORGANELAS CELULARES.pdf",
    "title": "ORGANELAS CELULARES",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "organelas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/ORGANELAS%20CELULARES.pdf",
    "relativePath": "extras/biologia/ORGANELAS CELULARES.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-da2aac0a-69",
    "filename": "Questoes - Material Unico (1)_260907_084405.pdf",
    "title": "Questoes Material Unico (1) 260907 084405",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Questoes%20-%20Material%20Unico%20(1)_260907_084405.pdf",
    "relativePath": "extras/biologia/Questoes - Material Unico (1)_260907_084405.pdf",
    "sizeFormatted": "103.7 MB"
  },
  {
    "id": "acervo-7310f825-70",
    "filename": "revisao-botanica-zoologia-microbiologia-e-doencas-parasitarias.pdf",
    "title": "revisao botanica zoologia microbiologia e doencas parasitarias",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "botanica",
      "zoologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/revisao-botanica-zoologia-microbiologia-e-doencas-parasitarias.pdf",
    "relativePath": "extras/biologia/revisao-botanica-zoologia-microbiologia-e-doencas-parasitarias.pdf",
    "sizeFormatted": "5.4 MB"
  },
  {
    "id": "acervo-747108ec-71",
    "filename": "revisao-genetica-e-biotecnologia-para-o-exato.pdf",
    "title": "revisao genetica e biotecnologia para o exato",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "genetica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/revisao-genetica-e-biotecnologia-para-o-exato.pdf",
    "relativePath": "extras/biologia/revisao-genetica-e-biotecnologia-para-o-exato.pdf",
    "sizeFormatted": "1.9 MB"
  },
  {
    "id": "acervo-a240fc77-72",
    "filename": "revisao-geral-bioquimica-citologia-e-fisiologia-humana-sprint-final-exato-anotacoes.pdf",
    "title": "revisao geral bioquimica citologia e fisiologia humana sprint final exato anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "citologia",
      "fisiologia",
      "bioquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/revisao-geral-bioquimica-citologia-e-fisiologia-humana-sprint-final-exato-anotacoes.pdf",
    "relativePath": "extras/biologia/revisao-geral-bioquimica-citologia-e-fisiologia-humana-sprint-final-exato-anotacoes.pdf",
    "sizeFormatted": "7.7 MB"
  },
  {
    "id": "acervo-63903f26-73",
    "filename": "revisao-geral-bioquimica-citologia-e-fisiologia-humana-sprint-final-exato.pdf",
    "title": "revisao geral bioquimica citologia e fisiologia humana sprint final exato",
    "discipline": "quimica",
    "category": "aulao",
    "banca": "Outras",
    "topics": [
      "citologia",
      "fisiologia",
      "bioquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/revisao-geral-bioquimica-citologia-e-fisiologia-humana-sprint-final-exato.pdf",
    "relativePath": "extras/biologia/revisao-geral-bioquimica-citologia-e-fisiologia-humana-sprint-final-exato.pdf",
    "sizeFormatted": "7.7 MB"
  },
  {
    "id": "acervo-64e39e4e-74",
    "filename": "revisao-geral-ecologia-e-evolucao-sprint-final-exato.pdf",
    "title": "revisao geral ecologia e evolucao sprint final exato",
    "discipline": "biologia",
    "category": "aulao",
    "banca": "Outras",
    "topics": [
      "ecologia",
      "evolucao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/revisao-geral-ecologia-e-evolucao-sprint-final-exato.pdf",
    "relativePath": "extras/biologia/revisao-geral-ecologia-e-evolucao-sprint-final-exato.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-31fce22f-75",
    "filename": "REVISÃO UFG - SEMANA 1.pdf",
    "title": "REVISÃO UFG SEMANA 1",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "UFG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/REVIS%C3%83O%20UFG%20-%20SEMANA%201.pdf",
    "relativePath": "extras/biologia/REVISÃO UFG - SEMANA 1.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-acbb7f0d-76",
    "filename": "acidos-nucleicos-e-replicacao-do-dna.pdf",
    "title": "acidos nucleicos e replicacao do dna",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "acidos"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/S%C3%ADntese%20proteica/acidos-nucleicos-e-replicacao-do-dna.pdf",
    "relativePath": "extras/biologia/Síntese proteica/acidos-nucleicos-e-replicacao-do-dna.pdf",
    "sizeFormatted": "7.3 MB"
  },
  {
    "id": "acervo-bdb776f7-77",
    "filename": "lista-de-biologia-acidos-nucleicos-e-replicacao-do-dna-turma-tradicionais.pdf",
    "title": "lista de biologia acidos nucleicos e replicacao do dna turma tradicionais",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "acidos"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/S%C3%ADntese%20proteica/lista-de-biologia-acidos-nucleicos-e-replicacao-do-dna-turma-tradicionais.pdf",
    "relativePath": "extras/biologia/Síntese proteica/lista-de-biologia-acidos-nucleicos-e-replicacao-do-dna-turma-tradicionais.pdf",
    "sizeFormatted": "2.7 MB"
  },
  {
    "id": "acervo-f54469a8-78",
    "filename": "lista-de-biologia-sintese-proteica-turma-tradicionais.pdf",
    "title": "lista de biologia sintese proteica turma tradicionais",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/S%C3%ADntese%20proteica/lista-de-biologia-sintese-proteica-turma-tradicionais.pdf",
    "relativePath": "extras/biologia/Síntese proteica/lista-de-biologia-sintese-proteica-turma-tradicionais.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-0e91c174-79",
    "filename": "ÁGUA, SAIS, CARBOIDRATOS, LIPÍDIOS, PROTEÍNAS E VITAMINAS.pdf",
    "title": "ÁGUA, SAIS, CARBOIDRATOS, LIPÍDIOS, PROTEÍNAS E VITAMINAS",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "sais"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/S%C3%ADntese%20proteica/%C3%81GUA%2C%20SAIS%2C%20CARBOIDRATOS%2C%20LIP%C3%8DDIOS%2C%20PROTE%C3%8DNAS%20E%20VITAMINAS.pdf",
    "relativePath": "extras/biologia/Síntese proteica/ÁGUA, SAIS, CARBOIDRATOS, LIPÍDIOS, PROTEÍNAS E VITAMINAS.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-e1b8d876-80",
    "filename": "vitaminas-carboidratos-lipideos-e-proteinas-anotacoes.pdf",
    "title": "vitaminas carboidratos lipideos e proteinas anotacoes",
    "discipline": "biologia",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/vitaminas-carboidratos-lipideos-e-proteinas-anotacoes.pdf",
    "relativePath": "extras/biologia/vitaminas-carboidratos-lipideos-e-proteinas-anotacoes.pdf",
    "sizeFormatted": "23.6 MB"
  },
  {
    "id": "acervo-92aca308-81",
    "filename": "PROTOZOOZES.pdf",
    "title": "PROTOZOOZES",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "zoologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/Zoologia/PROTOZOOZES.pdf",
    "relativePath": "extras/biologia/Zoologia/PROTOZOOZES.pdf",
    "sizeFormatted": "1.9 MB"
  },
  {
    "id": "acervo-43418bed-82",
    "filename": "zoologia.pdf",
    "title": "zoologia",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "zoologia"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/zoologia.pdf",
    "relativePath": "extras/biologia/zoologia.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-b64b2a01-83",
    "filename": "ÁCIDOS NUCLEICOS.pdf",
    "title": "ÁCIDOS NUCLEICOS",
    "discipline": "biologia",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia/%C3%81CIDOS%20NUCLEICOS.pdf",
    "relativePath": "extras/biologia/ÁCIDOS NUCLEICOS.pdf",
    "sizeFormatted": "1.7 MB"
  },
  {
    "id": "acervo-60c59d84-84",
    "filename": "biologia-bloquinho-da-aprovacao (1).pdf",
    "title": "biologia bloquinho da aprovacao (1)",
    "discipline": "biologia",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/biologia-bloquinho-da-aprovacao%20(1).pdf",
    "relativePath": "extras/biologia-bloquinho-da-aprovacao (1).pdf",
    "sizeFormatted": "18.3 MB"
  },
  {
    "id": "acervo-4d8bccb8-85",
    "filename": "fisica-bloquinho-da-aprovacao.pdf",
    "title": "fisica bloquinho da aprovacao",
    "discipline": "fisica",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/fisica-bloquinho-da-aprovacao.pdf",
    "relativePath": "extras/fisica-bloquinho-da-aprovacao.pdf",
    "sizeFormatted": "5.0 MB"
  },
  {
    "id": "acervo-a3f7799a-86",
    "filename": "funcao-2o-grau.pdf",
    "title": "funcao 2o grau",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "funcao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/funcao-2o-grau.pdf",
    "relativePath": "extras/funcao-2o-grau.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-11f49597-87",
    "filename": "22-hidrostatica-principio-de-pascal-e-empuxo-anotacoes.pdf",
    "title": "22 hidrostatica principio de pascal e empuxo anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/22-hidrostatica-principio-de-pascal-e-empuxo-anotacoes.pdf",
    "relativePath": "extras/Física/22-hidrostatica-principio-de-pascal-e-empuxo-anotacoes.pdf",
    "sizeFormatted": "11.5 MB"
  },
  {
    "id": "acervo-e8d5ca98-88",
    "filename": "acustica.pdf",
    "title": "acustica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/acustica.pdf",
    "relativePath": "extras/Física/acustica.pdf",
    "sizeFormatted": "10.2 MB"
  },
  {
    "id": "acervo-579a1dd3-89",
    "filename": "cinematica-2025-mru-e-mruv-anotacoes-finais.pdf",
    "title": "cinematica 2025 mru e mruv anotacoes finais",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "year": 2025,
    "topics": [
      "cinematica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/cinematica-2025-mru-e-mruv-anotacoes-finais.pdf",
    "relativePath": "extras/Física/cinematica-2025-mru-e-mruv-anotacoes-finais.pdf",
    "sizeFormatted": "31.8 MB"
  },
  {
    "id": "acervo-b62443c6-90",
    "filename": "CIRCUITOS ELÉTRICOS.pdf",
    "title": "CIRCUITOS ELÉTRICOS",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/CIRCUITOS%20EL%C3%89TRICOS.pdf",
    "relativePath": "extras/Física/CIRCUITOS ELÉTRICOS.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-c03a6213-91",
    "filename": "dinamica-gravitacao-questoes-anotacoes.pdf",
    "title": "dinamica gravitacao questoes anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/dinamica-gravitacao-questoes-anotacoes.pdf",
    "relativePath": "extras/Física/dinamica-gravitacao-questoes-anotacoes.pdf",
    "sizeFormatted": "18.9 MB"
  },
  {
    "id": "acervo-fd72156b-92",
    "filename": "dinamica-leis-de-newton-e-forcas-especiais-anotacoes-questoes.pdf",
    "title": "dinamica leis de newton e forcas especiais anotacoes questoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica",
      "newton"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/dinamica-leis-de-newton-e-forcas-especiais-anotacoes-questoes.pdf",
    "relativePath": "extras/Física/dinamica-leis-de-newton-e-forcas-especiais-anotacoes-questoes.pdf",
    "sizeFormatted": "24.5 MB"
  },
  {
    "id": "acervo-198a74b4-93",
    "filename": "dinamica-leis-de-newton-e-forcas-especiais-sem-anotacoes (1).pdf",
    "title": "dinamica leis de newton e forcas especiais sem anotacoes (1)",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica",
      "newton"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/dinamica-leis-de-newton-e-forcas-especiais-sem-anotacoes%20(1).pdf",
    "relativePath": "extras/Física/dinamica-leis-de-newton-e-forcas-especiais-sem-anotacoes (1).pdf",
    "sizeFormatted": "10.8 MB"
  },
  {
    "id": "acervo-6b9e4717-94",
    "filename": "dinamica-leis-de-newton-e-forcas-especiais-sem-anotacoes.pdf",
    "title": "dinamica leis de newton e forcas especiais sem anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica",
      "newton"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/dinamica-leis-de-newton-e-forcas-especiais-sem-anotacoes.pdf",
    "relativePath": "extras/Física/dinamica-leis-de-newton-e-forcas-especiais-sem-anotacoes.pdf",
    "sizeFormatted": "10.8 MB"
  },
  {
    "id": "acervo-f1ab0ea9-95",
    "filename": "dinamica-leis-de-newton-sem-anotacoes.pdf",
    "title": "dinamica leis de newton sem anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica",
      "newton"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/dinamica-leis-de-newton-sem-anotacoes.pdf",
    "relativePath": "extras/Física/dinamica-leis-de-newton-sem-anotacoes.pdf",
    "sizeFormatted": "10.8 MB"
  },
  {
    "id": "acervo-d6d63179-96",
    "filename": "dinamica-trabalho-potencia-e-rendimento-anotacoes.pdf",
    "title": "dinamica trabalho potencia e rendimento anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/dinamica-trabalho-potencia-e-rendimento-anotacoes.pdf",
    "relativePath": "extras/Física/dinamica-trabalho-potencia-e-rendimento-anotacoes.pdf",
    "sizeFormatted": "14.8 MB"
  },
  {
    "id": "acervo-6e5a1062-97",
    "filename": "DINÂMICA II - PLANO INCLINADO E POLIAS.pdf",
    "title": "DINÂMICA II PLANO INCLINADO E POLIAS",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/DIN%C3%82MICA%20II%20-%20PLANO%20INCLINADO%20E%20POLIAS.pdf",
    "relativePath": "extras/Física/DINÂMICA II - PLANO INCLINADO E POLIAS.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-82518d6d-98",
    "filename": "eletrodinamica-aplicacoes-no-cotidiano.pdf",
    "title": "eletrodinamica aplicacoes no cotidiano",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrodinamica-aplicacoes-no-cotidiano.pdf",
    "relativePath": "extras/Física/eletrodinamica-aplicacoes-no-cotidiano.pdf",
    "sizeFormatted": "14.4 MB"
  },
  {
    "id": "acervo-b8d20110-99",
    "filename": "eletrodinamica-associacao-de-resistores.pdf",
    "title": "eletrodinamica associacao de resistores",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "dinamica",
      "resistor"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrodinamica-associacao-de-resistores.pdf",
    "relativePath": "extras/Física/eletrodinamica-associacao-de-resistores.pdf",
    "sizeFormatted": "21.4 MB"
  },
  {
    "id": "acervo-6ce64104-100",
    "filename": "eletrodinamica-corrente-anotacoes.pdf",
    "title": "eletrodinamica corrente anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrodinamica-corrente-anotacoes.pdf",
    "relativePath": "extras/Física/eletrodinamica-corrente-anotacoes.pdf",
    "sizeFormatted": "3.9 MB"
  },
  {
    "id": "acervo-18f9d751-101",
    "filename": "eletrodinamica-geradores-e-receptores.pdf",
    "title": "eletrodinamica geradores e receptores",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrodinamica-geradores-e-receptores.pdf",
    "relativePath": "extras/Física/eletrodinamica-geradores-e-receptores.pdf",
    "sizeFormatted": "25.4 MB"
  },
  {
    "id": "acervo-cae1b897-102",
    "filename": "eletrodinamica-tensao-resistencia-energia-e-potencia-anotacoes.pdf",
    "title": "eletrodinamica tensao resistencia energia e potencia anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrodinamica-tensao-resistencia-energia-e-potencia-anotacoes.pdf",
    "relativePath": "extras/Física/eletrodinamica-tensao-resistencia-energia-e-potencia-anotacoes.pdf",
    "sizeFormatted": "8.1 MB"
  },
  {
    "id": "acervo-18638e80-103",
    "filename": "ELETRODINÂMICA I.pdf",
    "title": "ELETRODINÂMICA I",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/ELETRODIN%C3%82MICA%20I.pdf",
    "relativePath": "extras/Física/ELETRODINÂMICA I.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-091d062f-104",
    "filename": "eletromagnetismo-fontes-de-campo-magnetico-anotacoes.pdf",
    "title": "eletromagnetismo fontes de campo magnetico anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "magnetismo"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletromagnetismo-fontes-de-campo-magnetico-anotacoes.pdf",
    "relativePath": "extras/Física/eletromagnetismo-fontes-de-campo-magnetico-anotacoes.pdf",
    "sizeFormatted": "20.8 MB"
  },
  {
    "id": "acervo-729495d2-105",
    "filename": "eletromagnetismo-forca-magnetica-anotacoes.pdf",
    "title": "eletromagnetismo forca magnetica anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "magnetismo"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletromagnetismo-forca-magnetica-anotacoes.pdf",
    "relativePath": "extras/Física/eletromagnetismo-forca-magnetica-anotacoes.pdf",
    "sizeFormatted": "10.5 MB"
  },
  {
    "id": "acervo-4aaf36b7-106",
    "filename": "eletromagnetismo-imas-e-magnetismo-terrestre-anotacoes.pdf",
    "title": "eletromagnetismo imas e magnetismo terrestre anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "magnetismo"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletromagnetismo-imas-e-magnetismo-terrestre-anotacoes.pdf",
    "relativePath": "extras/Física/eletromagnetismo-imas-e-magnetismo-terrestre-anotacoes.pdf",
    "sizeFormatted": "4.7 MB"
  },
  {
    "id": "acervo-e73b661c-107",
    "filename": "eletromagnetismo-inducao-magnetica-anotacoes.pdf",
    "title": "eletromagnetismo inducao magnetica anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "magnetismo"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletromagnetismo-inducao-magnetica-anotacoes.pdf",
    "relativePath": "extras/Física/eletromagnetismo-inducao-magnetica-anotacoes.pdf",
    "sizeFormatted": "21.3 MB"
  },
  {
    "id": "acervo-a2068a2a-108",
    "filename": "eletromagnetismo-transformadores-anotacoes.pdf",
    "title": "eletromagnetismo transformadores anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "magnetismo"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletromagnetismo-transformadores-anotacoes.pdf",
    "relativePath": "extras/Física/eletromagnetismo-transformadores-anotacoes.pdf",
    "sizeFormatted": "23.0 MB"
  },
  {
    "id": "acervo-2a3efde8-109",
    "filename": "ELETROMAGNETISMO.pdf",
    "title": "ELETROMAGNETISMO",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "magnetismo"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/ELETROMAGNETISMO.pdf",
    "relativePath": "extras/Física/ELETROMAGNETISMO.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-45f6dbb3-110",
    "filename": "eletrostatica-lista-geral-sem-anotacoes (1).pdf",
    "title": "eletrostatica lista geral sem anotacoes (1)",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrostatica-lista-geral-sem-anotacoes%20(1).pdf",
    "relativePath": "extras/Física/eletrostatica-lista-geral-sem-anotacoes (1).pdf",
    "sizeFormatted": "10.4 MB"
  },
  {
    "id": "acervo-1f2aa317-111",
    "filename": "eletrostatica-lista-geral-sem-anotacoes (2).pdf",
    "title": "eletrostatica lista geral sem anotacoes (2)",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrostatica-lista-geral-sem-anotacoes%20(2).pdf",
    "relativePath": "extras/Física/eletrostatica-lista-geral-sem-anotacoes (2).pdf",
    "sizeFormatted": "10.4 MB"
  },
  {
    "id": "acervo-3750715b-112",
    "filename": "eletrostatica-lista-geral-sem-anotacoes.pdf",
    "title": "eletrostatica lista geral sem anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrostatica-lista-geral-sem-anotacoes.pdf",
    "relativePath": "extras/Física/eletrostatica-lista-geral-sem-anotacoes.pdf",
    "sizeFormatted": "10.4 MB"
  },
  {
    "id": "acervo-0d91831d-113",
    "filename": "eletrostatica-processos-de-eletrizacao-anotacoes (1).pdf",
    "title": "eletrostatica processos de eletrizacao anotacoes (1)",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrostatica-processos-de-eletrizacao-anotacoes%20(1).pdf",
    "relativePath": "extras/Física/eletrostatica-processos-de-eletrizacao-anotacoes (1).pdf",
    "sizeFormatted": "34.2 MB"
  },
  {
    "id": "acervo-5dc6bd36-114",
    "filename": "eletrostatica-processos-de-eletrizacao-anotacoes.pdf",
    "title": "eletrostatica processos de eletrizacao anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/eletrostatica-processos-de-eletrizacao-anotacoes.pdf",
    "relativePath": "extras/Física/eletrostatica-processos-de-eletrizacao-anotacoes.pdf",
    "sizeFormatted": "34.2 MB"
  },
  {
    "id": "acervo-a3fbdee0-115",
    "filename": "ELETROSTÁTICA.pdf",
    "title": "ELETROSTÁTICA",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/ELETROST%C3%81TICA.pdf",
    "relativePath": "extras/Física/ELETROSTÁTICA.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-fb542ffc-116",
    "filename": "estatica-momento-forcas-e-alavancas (1).pdf",
    "title": "estatica momento forcas e alavancas (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/estatica-momento-forcas-e-alavancas%20(1).pdf",
    "relativePath": "extras/Física/estatica-momento-forcas-e-alavancas (1).pdf",
    "sizeFormatted": "9.8 MB"
  },
  {
    "id": "acervo-13287bd4-117",
    "filename": "estatica-momento-forcas-e-alavancas.pdf",
    "title": "estatica momento forcas e alavancas",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/estatica-momento-forcas-e-alavancas.pdf",
    "relativePath": "extras/Física/estatica-momento-forcas-e-alavancas.pdf",
    "sizeFormatted": "9.8 MB"
  },
  {
    "id": "acervo-e15ad18c-118",
    "filename": "fisica-gases-e-transformacoes (1).pdf",
    "title": "fisica gases e transformacoes (1)",
    "discipline": "fisica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/fisica-gases-e-transformacoes%20(1).pdf",
    "relativePath": "extras/Física/fisica-gases-e-transformacoes (1).pdf",
    "sizeFormatted": "26.8 MB"
  },
  {
    "id": "acervo-8faa6e3b-119",
    "filename": "fisica-gases-e-transformacoes.pdf",
    "title": "fisica gases e transformacoes",
    "discipline": "fisica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/fisica-gases-e-transformacoes.pdf",
    "relativePath": "extras/Física/fisica-gases-e-transformacoes.pdf",
    "sizeFormatted": "26.8 MB"
  },
  {
    "id": "acervo-2623b9b4-120",
    "filename": "FUNDAMENTOS DA FÍSICA - INTERPRETAÇÃO DE GRÁFICOS DA FÍSICA - QUESTÕES.pdf",
    "title": "FUNDAMENTOS DA FÍSICA INTERPRETAÇÃO DE GRÁFICOS DA FÍSICA QUESTÕES",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/FUNDAMENTOS%20DA%20F%C3%8DSICA%20-%20INTERPRETA%C3%87%C3%83O%20DE%20GR%C3%81FICOS%20DA%20F%C3%8DSICA%20-%20QUEST%C3%95ES.pdf",
    "relativePath": "extras/Física/FUNDAMENTOS DA FÍSICA - INTERPRETAÇÃO DE GRÁFICOS DA FÍSICA - QUESTÕES.pdf",
    "sizeFormatted": "10.9 MB"
  },
  {
    "id": "acervo-c33e3b9a-121",
    "filename": "fundamentos-da-fisica-anotacoes.pdf",
    "title": "fundamentos da fisica anotacoes",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/fundamentos-da-fisica-anotacoes.pdf",
    "relativePath": "extras/Física/fundamentos-da-fisica-anotacoes.pdf",
    "sizeFormatted": "32.7 MB"
  },
  {
    "id": "acervo-175e5b47-122",
    "filename": "FÍSICA UFG - 01.pdf",
    "title": "FÍSICA UFG 01",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "UFG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/F%C3%8DSICA%20UFG%20-%2001.pdf",
    "relativePath": "extras/Física/FÍSICA UFG - 01.pdf",
    "sizeFormatted": "3.8 MB"
  },
  {
    "id": "acervo-d9a9b6ae-123",
    "filename": "HIDRODINÂMICA E HIDROSTÁTICA.pdf",
    "title": "HIDRODINÂMICA E HIDROSTÁTICA",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/HIDRODIN%C3%82MICA%20E%20HIDROST%C3%81TICA.pdf",
    "relativePath": "extras/Física/HIDRODINÂMICA E HIDROSTÁTICA.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-a27b1453-124",
    "filename": "hidrostatica-densidade-pressao-empuxo-questoes.pdf",
    "title": "hidrostatica densidade pressao empuxo questoes",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/hidrostatica-densidade-pressao-empuxo-questoes.pdf",
    "relativePath": "extras/Física/hidrostatica-densidade-pressao-empuxo-questoes.pdf",
    "sizeFormatted": "11.9 MB"
  },
  {
    "id": "acervo-3adc9911-125",
    "filename": "hidrostatica-densidade-pressao-empuxo.pdf",
    "title": "hidrostatica densidade pressao empuxo",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/hidrostatica-densidade-pressao-empuxo.pdf",
    "relativePath": "extras/Física/hidrostatica-densidade-pressao-empuxo.pdf",
    "sizeFormatted": "9.6 MB"
  },
  {
    "id": "acervo-1c42e90f-126",
    "filename": "lancamento-horizontal.pdf",
    "title": "lancamento horizontal",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/lancamento-horizontal.pdf",
    "relativePath": "extras/Física/lancamento-horizontal.pdf",
    "sizeFormatted": "3.1 MB"
  },
  {
    "id": "acervo-85ac5f5b-127",
    "filename": "LANÇAMENTOS E MOVIMENTO OBLÍQUO.pdf",
    "title": "LANÇAMENTOS E MOVIMENTO OBLÍQUO",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/LAN%C3%87AMENTOS%20E%20MOVIMENTO%20OBL%C3%8DQUO.pdf",
    "relativePath": "extras/Física/LANÇAMENTOS E MOVIMENTO OBLÍQUO.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-9b5e27f9-128",
    "filename": "LEIS DE NEWTON E FORÇAS.pdf",
    "title": "LEIS DE NEWTON E FORÇAS",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "newton"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/LEIS%20DE%20NEWTON%20E%20FOR%C3%87AS.pdf",
    "relativePath": "extras/Física/LEIS DE NEWTON E FORÇAS.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-ce0aea33-129",
    "filename": "leis-da-termodinamica.pdf",
    "title": "leis da termodinamica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "dinamica",
      "termodinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/leis-da-termodinamica.pdf",
    "relativePath": "extras/Física/leis-da-termodinamica.pdf",
    "sizeFormatted": "5.4 MB"
  },
  {
    "id": "acervo-5e546c05-130",
    "filename": "LENTES E ANOMALIAS VISUAIS.pdf",
    "title": "LENTES E ANOMALIAS VISUAIS",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/LENTES%20E%20ANOMALIAS%20VISUAIS.pdf",
    "relativePath": "extras/Física/LENTES E ANOMALIAS VISUAIS.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-5b3d4368-131",
    "filename": "maquinas-termicas.pdf",
    "title": "maquinas termicas",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/maquinas-termicas.pdf",
    "relativePath": "extras/Física/maquinas-termicas.pdf",
    "sizeFormatted": "1.7 MB"
  },
  {
    "id": "acervo-319d34f5-132",
    "filename": "MOVIMENTOS UNIFORMES E VARIADOS (CONTINUAÇÃO).pdf",
    "title": "MOVIMENTOS UNIFORMES E VARIADOS (CONTINUAÇÃO)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/MOVIMENTOS%20UNIFORMES%20E%20VARIADOS%20(CONTINUA%C3%87%C3%83O).pdf",
    "relativePath": "extras/Física/MOVIMENTOS UNIFORMES E VARIADOS (CONTINUAÇÃO).pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-b5e9a52a-133",
    "filename": "MOVIMENTOS UNIFORMES E VARIADOS.pdf",
    "title": "MOVIMENTOS UNIFORMES E VARIADOS",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/MOVIMENTOS%20UNIFORMES%20E%20VARIADOS.pdf",
    "relativePath": "extras/Física/MOVIMENTOS UNIFORMES E VARIADOS.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-0ebdaee2-134",
    "filename": "mru-anotacoes (1).pdf",
    "title": "mru anotacoes (1)",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/mru-anotacoes%20(1).pdf",
    "relativePath": "extras/Física/mru-anotacoes (1).pdf",
    "sizeFormatted": "26.0 MB"
  },
  {
    "id": "acervo-3c4ac8c3-135",
    "filename": "mru-anotacoes.pdf",
    "title": "mru anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/mru-anotacoes.pdf",
    "relativePath": "extras/Física/mru-anotacoes.pdf",
    "sizeFormatted": "26.0 MB"
  },
  {
    "id": "acervo-dcc34268-136",
    "filename": "ondulatoria-definicao-espectros-e-fenomenos.pdf",
    "title": "ondulatoria definicao espectros e fenomenos",
    "discipline": "fisica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ondulatoria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/ondulatoria-definicao-espectros-e-fenomenos.pdf",
    "relativePath": "extras/Física/ondulatoria-definicao-espectros-e-fenomenos.pdf",
    "sizeFormatted": "11.5 MB"
  },
  {
    "id": "acervo-57345f84-137",
    "filename": "ondulatoria-fenomenos-ondulatorios-e-ondas-estacionarias-questoes-anotacoes-compressed.pdf",
    "title": "ondulatoria fenomenos ondulatorios e ondas estacionarias questoes anotacoes compressed",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "ondulatoria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/ondulatoria-fenomenos-ondulatorios-e-ondas-estacionarias-questoes-anotacoes-compressed.pdf",
    "relativePath": "extras/Física/ondulatoria-fenomenos-ondulatorios-e-ondas-estacionarias-questoes-anotacoes-compressed.pdf",
    "sizeFormatted": "9.7 MB"
  },
  {
    "id": "acervo-67d7aa58-138",
    "filename": "ondulatoria-ondas-estacionarias-anotacoes.pdf",
    "title": "ondulatoria ondas estacionarias anotacoes",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "ondulatoria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/ondulatoria-ondas-estacionarias-anotacoes.pdf",
    "relativePath": "extras/Física/ondulatoria-ondas-estacionarias-anotacoes.pdf",
    "sizeFormatted": "28.0 MB"
  },
  {
    "id": "acervo-883be17f-139",
    "filename": "optica-1-fundamentos-anotacoes.pdf",
    "title": "optica 1 fundamentos anotacoes",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "optica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/optica-1-fundamentos-anotacoes.pdf",
    "relativePath": "extras/Física/optica-1-fundamentos-anotacoes.pdf",
    "sizeFormatted": "19.4 MB"
  },
  {
    "id": "acervo-446d7124-140",
    "filename": "optica-1-fundamentos-reflexao-e-espelhos-planos-lista-em-branco.pdf",
    "title": "optica 1 fundamentos reflexao e espelhos planos lista em branco",
    "discipline": "fisica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "optica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/optica-1-fundamentos-reflexao-e-espelhos-planos-lista-em-branco.pdf",
    "relativePath": "extras/Física/optica-1-fundamentos-reflexao-e-espelhos-planos-lista-em-branco.pdf",
    "sizeFormatted": "11.1 MB"
  },
  {
    "id": "acervo-1ad93ec8-141",
    "filename": "optica-1-reflexao-e-espelhos-planos-anotacoes.pdf",
    "title": "optica 1 reflexao e espelhos planos anotacoes",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "optica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/optica-1-reflexao-e-espelhos-planos-anotacoes.pdf",
    "relativePath": "extras/Física/optica-1-reflexao-e-espelhos-planos-anotacoes.pdf",
    "sizeFormatted": "23.7 MB"
  },
  {
    "id": "acervo-839582e5-142",
    "filename": "optica-2-refracao-prismas-e-fenomenos-refratarios-com-anotacoes.pdf",
    "title": "optica 2 refracao prismas e fenomenos refratarios com anotacoes",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "optica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/optica-2-refracao-prismas-e-fenomenos-refratarios-com-anotacoes.pdf",
    "relativePath": "extras/Física/optica-2-refracao-prismas-e-fenomenos-refratarios-com-anotacoes.pdf",
    "sizeFormatted": "20.1 MB"
  },
  {
    "id": "acervo-16ef1f9a-143",
    "filename": "optica-espelhos-esfericos-sem-anotacoes.pdf",
    "title": "optica espelhos esfericos sem anotacoes",
    "discipline": "fisica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "optica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/optica-espelhos-esfericos-sem-anotacoes.pdf",
    "relativePath": "extras/Física/optica-espelhos-esfericos-sem-anotacoes.pdf",
    "sizeFormatted": "10.6 MB"
  },
  {
    "id": "acervo-344a1bea-144",
    "filename": "optica-estudo-da-visao.pdf",
    "title": "optica estudo da visao",
    "discipline": "fisica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "optica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/optica-estudo-da-visao.pdf",
    "relativePath": "extras/Física/optica-estudo-da-visao.pdf",
    "sizeFormatted": "9.9 MB"
  },
  {
    "id": "acervo-0c639edf-145",
    "filename": "optica-lentes-esfericas.pdf",
    "title": "optica lentes esfericas",
    "discipline": "fisica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "optica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/optica-lentes-esfericas.pdf",
    "relativePath": "extras/Física/optica-lentes-esfericas.pdf",
    "sizeFormatted": "10.0 MB"
  },
  {
    "id": "acervo-d56f1a8e-146",
    "filename": "PRINCÍPIOS E FENÔMENOS ÓPTICOS (1).pdf",
    "title": "PRINCÍPIOS E FENÔMENOS ÓPTICOS (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/PRINC%C3%8DPIOS%20E%20FEN%C3%94MENOS%20%C3%93PTICOS%20(1).pdf",
    "relativePath": "extras/Física/PRINCÍPIOS E FENÔMENOS ÓPTICOS (1).pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-e1fcfbc6-147",
    "filename": "PRISMAS E ESPELHOS.pdf",
    "title": "PRISMAS E ESPELHOS",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/PRISMAS%20E%20ESPELHOS.pdf",
    "relativePath": "extras/Física/PRISMAS E ESPELHOS.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-eeef0eee-148",
    "filename": "queda-livre.pdf",
    "title": "queda livre",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/queda-livre.pdf",
    "relativePath": "extras/Física/queda-livre.pdf",
    "sizeFormatted": "4.6 MB"
  },
  {
    "id": "acervo-a76d9b2e-149",
    "filename": "REVISÃO UNIRG.pdf",
    "title": "REVISÃO UNIRG",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "UNIRG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/REVIS%C3%83O%20UNIRG.pdf",
    "relativePath": "extras/Física/REVISÃO UNIRG.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-7ed86e2f-150",
    "filename": "termologia-dilatacao (1).pdf",
    "title": "termologia dilatacao (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/termologia-dilatacao%20(1).pdf",
    "relativePath": "extras/Física/termologia-dilatacao (1).pdf",
    "sizeFormatted": "9.4 MB"
  },
  {
    "id": "acervo-d74729bb-151",
    "filename": "termologia-dilatacao.pdf",
    "title": "termologia dilatacao",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/termologia-dilatacao.pdf",
    "relativePath": "extras/Física/termologia-dilatacao.pdf",
    "sizeFormatted": "9.4 MB"
  },
  {
    "id": "acervo-497d0152-152",
    "filename": "termologia-termometria.pdf",
    "title": "termologia termometria",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/termologia-termometria.pdf",
    "relativePath": "extras/Física/termologia-termometria.pdf",
    "sizeFormatted": "9.5 MB"
  },
  {
    "id": "acervo-7c344f8d-153",
    "filename": "termologia-trocas-e-transmissao-de-calor (1).pdf",
    "title": "termologia trocas e transmissao de calor (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "calor"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/termologia-trocas-e-transmissao-de-calor%20(1).pdf",
    "relativePath": "extras/Física/termologia-trocas-e-transmissao-de-calor (1).pdf",
    "sizeFormatted": "10.1 MB"
  },
  {
    "id": "acervo-34e8d6fc-154",
    "filename": "termologia-trocas-e-transmissao-de-calor-anotacoes.pdf",
    "title": "termologia trocas e transmissao de calor anotacoes",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "calor"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/termologia-trocas-e-transmissao-de-calor-anotacoes.pdf",
    "relativePath": "extras/Física/termologia-trocas-e-transmissao-de-calor-anotacoes.pdf",
    "sizeFormatted": "12.9 MB"
  },
  {
    "id": "acervo-5ab69c71-155",
    "filename": "termologia-trocas-e-transmissao-de-calor.pdf",
    "title": "termologia trocas e transmissao de calor",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "calor"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/termologia-trocas-e-transmissao-de-calor.pdf",
    "relativePath": "extras/Física/termologia-trocas-e-transmissao-de-calor.pdf",
    "sizeFormatted": "10.1 MB"
  },
  {
    "id": "acervo-ec92f0ba-156",
    "filename": "UNIDADES, GRANDEZAS E VETORES (1).pdf",
    "title": "UNIDADES, GRANDEZAS E VETORES (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/F%C3%ADsica/UNIDADES%2C%20GRANDEZAS%20E%20VETORES%20(1).pdf",
    "relativePath": "extras/Física/UNIDADES, GRANDEZAS E VETORES (1).pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-06af71bc-157",
    "filename": "29-migracoes-internas-do-brasil.pdf",
    "title": "29 migracoes internas do brasil",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/29-migracoes-internas-do-brasil.pdf",
    "relativePath": "extras/geografia/29-migracoes-internas-do-brasil.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-4bdad932-158",
    "filename": "agropecuaria-parte-1.pdf",
    "title": "agropecuaria parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/agropecuaria-parte-1.pdf",
    "relativePath": "extras/geografia/agropecuaria-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-4fc9fa12-159",
    "filename": "agropecuaria-parte-2.pdf",
    "title": "agropecuaria parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/agropecuaria-parte-2.pdf",
    "relativePath": "extras/geografia/agropecuaria-parte-2.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-1f37b8f7-160",
    "filename": "AGROPECUÁRIA.pdf",
    "title": "AGROPECUÁRIA",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/AGROPECU%C3%81RIA.pdf",
    "relativePath": "extras/geografia/AGROPECUÁRIA.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-7a4d15a5-161",
    "filename": "blocos-economicos-aspectos-gerais.pdf",
    "title": "blocos economicos aspectos gerais",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/blocos-economicos-aspectos-gerais.pdf",
    "relativePath": "extras/geografia/blocos-economicos-aspectos-gerais.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-aec32445-162",
    "filename": "blocos-economicos-mercosul.pdf",
    "title": "blocos economicos mercosul",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/blocos-economicos-mercosul.pdf",
    "relativePath": "extras/geografia/blocos-economicos-mercosul.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-9fb2b00b-163",
    "filename": "blocos-economicos-uniao-europeia.pdf",
    "title": "blocos economicos uniao europeia",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/blocos-economicos-uniao-europeia.pdf",
    "relativePath": "extras/geografia/blocos-economicos-uniao-europeia.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-7a38f909-164",
    "filename": "cartografia.pdf",
    "title": "cartografia",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/cartografia.pdf",
    "relativePath": "extras/geografia/cartografia.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-2e33e88c-165",
    "filename": "clima-elementos-do-clima-fatores-climaticos-e-massas.pdf",
    "title": "clima elementos do clima fatores climaticos e massas",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/clima-elementos-do-clima-fatores-climaticos-e-massas.pdf",
    "relativePath": "extras/geografia/clima-elementos-do-clima-fatores-climaticos-e-massas.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-d1fa4196-166",
    "filename": "comercio-internacional-parte-1.pdf",
    "title": "comercio internacional parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/comercio-internacional-parte-1.pdf",
    "relativePath": "extras/geografia/comercio-internacional-parte-1.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-49b5007d-167",
    "filename": "comercio-internacional-parte-2.pdf",
    "title": "comercio internacional parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/comercio-internacional-parte-2.pdf",
    "relativePath": "extras/geografia/comercio-internacional-parte-2.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-24eeeaf8-168",
    "filename": "coordenadas-geograficas.pdf",
    "title": "coordenadas geograficas",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/coordenadas-geograficas.pdf",
    "relativePath": "extras/geografia/coordenadas-geograficas.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-d58c32d8-169",
    "filename": "crescimento-demografico-parte-1.pdf",
    "title": "crescimento demografico parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/crescimento-demografico-parte-1.pdf",
    "relativePath": "extras/geografia/crescimento-demografico-parte-1.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-970ba3ee-170",
    "filename": "crescimento-demografico-parte-2.pdf",
    "title": "crescimento demografico parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/crescimento-demografico-parte-2.pdf",
    "relativePath": "extras/geografia/crescimento-demografico-parte-2.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-ab786fcc-171",
    "filename": "crescimento-demografico-parte-3.pdf",
    "title": "crescimento demografico parte 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/crescimento-demografico-parte-3.pdf",
    "relativePath": "extras/geografia/crescimento-demografico-parte-3.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-f3f4b734-172",
    "filename": "crescimento-demografico-parte-4.pdf",
    "title": "crescimento demografico parte 4",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/crescimento-demografico-parte-4.pdf",
    "relativePath": "extras/geografia/crescimento-demografico-parte-4.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-b1cce2e0-173",
    "filename": "desigualdades-sociais-parte-1.pdf",
    "title": "desigualdades sociais parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/desigualdades-sociais-parte-1.pdf",
    "relativePath": "extras/geografia/desigualdades-sociais-parte-1.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-3736031a-174",
    "filename": "desigualdades-sociais-parte-2.pdf",
    "title": "desigualdades sociais parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/desigualdades-sociais-parte-2.pdf",
    "relativePath": "extras/geografia/desigualdades-sociais-parte-2.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-d4bbf318-175",
    "filename": "distribuicao-geografica-da-populacao.pdf",
    "title": "distribuicao geografica da populacao",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/distribuicao-geografica-da-populacao.pdf",
    "relativePath": "extras/geografia/distribuicao-geografica-da-populacao.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-7d9cc664-176",
    "filename": "DISTRIBUIÇÃO GEOGRÁFICA DA POPULAÇÃO E CRESCIMENTO DEMOGRÁFICO (1).pdf",
    "title": "DISTRIBUIÇÃO GEOGRÁFICA DA POPULAÇÃO E CRESCIMENTO DEMOGRÁFICO (1)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/DISTRIBUI%C3%87%C3%83O%20GEOGR%C3%81FICA%20DA%20POPULA%C3%87%C3%83O%20E%20CRESCIMENTO%20DEMOGR%C3%81FICO%20(1).pdf",
    "relativePath": "extras/geografia/DISTRIBUIÇÃO GEOGRÁFICA DA POPULAÇÃO E CRESCIMENTO DEMOGRÁFICO (1).pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-5275a351-177",
    "filename": "ECONOMIA DO TRABALHO.pdf",
    "title": "ECONOMIA DO TRABALHO",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/ECONOMIA%20DO%20TRABALHO.pdf",
    "relativePath": "extras/geografia/ECONOMIA DO TRABALHO.pdf",
    "sizeFormatted": "0.3 MB"
  },
  {
    "id": "acervo-c22a753d-178",
    "filename": "economia-do-trabalho-parte-1.pdf",
    "title": "economia do trabalho parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/economia-do-trabalho-parte-1.pdf",
    "relativePath": "extras/geografia/economia-do-trabalho-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-499d0c11-179",
    "filename": "economia-do-trabalho-parte-2.pdf",
    "title": "economia do trabalho parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/economia-do-trabalho-parte-2.pdf",
    "relativePath": "extras/geografia/economia-do-trabalho-parte-2.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-182e9b59-180",
    "filename": "energia-parte-1.pdf",
    "title": "energia parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/energia-parte-1.pdf",
    "relativePath": "extras/geografia/energia-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-8d37bbbe-181",
    "filename": "energia-parte-2.pdf",
    "title": "energia parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/energia-parte-2.pdf",
    "relativePath": "extras/geografia/energia-parte-2.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-d6030076-182",
    "filename": "energia-parte-3.pdf",
    "title": "energia parte 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/energia-parte-3.pdf",
    "relativePath": "extras/geografia/energia-parte-3.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-4d9cad59-183",
    "filename": "extra-temas-quentes-do-vestibular-exato.pdf",
    "title": "extra temas quentes do vestibular exato",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/extra-temas-quentes-do-vestibular-exato.pdf",
    "relativePath": "extras/geografia/extra-temas-quentes-do-vestibular-exato.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-b18c3ef6-184",
    "filename": "GEOGRAFIA FÍSICA 1 (1).pdf",
    "title": "GEOGRAFIA FÍSICA 1 (1)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/GEOGRAFIA%20F%C3%8DSICA%201%20(1).pdf",
    "relativePath": "extras/geografia/GEOGRAFIA FÍSICA 1 (1).pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-f729a688-185",
    "filename": "GEOGRAFIA FÍSICA 2.pdf",
    "title": "GEOGRAFIA FÍSICA 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/GEOGRAFIA%20F%C3%8DSICA%202.pdf",
    "relativePath": "extras/geografia/GEOGRAFIA FÍSICA 2.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-2b18b111-186",
    "filename": "GEOGRAFIA FÍSICA 3.pdf",
    "title": "GEOGRAFIA FÍSICA 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/GEOGRAFIA%20F%C3%8DSICA%203.pdf",
    "relativePath": "extras/geografia/GEOGRAFIA FÍSICA 3.pdf",
    "sizeFormatted": "0.1 MB"
  },
  {
    "id": "acervo-dd47514f-187",
    "filename": "geografia-do-maranhao-parte-01.pdf",
    "title": "geografia do maranhao parte 01",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geografia-do-maranhao-parte-01.pdf",
    "relativePath": "extras/geografia/geografia-do-maranhao-parte-01.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-bca8d835-188",
    "filename": "geografia-do-maranhao-parte-02.pdf",
    "title": "geografia do maranhao parte 02",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geografia-do-maranhao-parte-02.pdf",
    "relativePath": "extras/geografia/geografia-do-maranhao-parte-02.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-21b93334-189",
    "filename": "geografia-do-maranhao-parte-03.pdf",
    "title": "geografia do maranhao parte 03",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geografia-do-maranhao-parte-03.pdf",
    "relativePath": "extras/geografia/geografia-do-maranhao-parte-03.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-00dc789d-190",
    "filename": "geografia-do-maranhao-parte-04.pdf",
    "title": "geografia do maranhao parte 04",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geografia-do-maranhao-parte-04.pdf",
    "relativePath": "extras/geografia/geografia-do-maranhao-parte-04.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-2226af69-191",
    "filename": "geografia-do-tocantins-parte-2.pdf",
    "title": "geografia do tocantins parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geografia-do-tocantins-parte-2.pdf",
    "relativePath": "extras/geografia/geografia-do-tocantins-parte-2.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-b242bf73-192",
    "filename": "geografia-do-tocantins-parte-3.pdf",
    "title": "geografia do tocantins parte 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geografia-do-tocantins-parte-3.pdf",
    "relativePath": "extras/geografia/geografia-do-tocantins-parte-3.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-bd36bb93-193",
    "filename": "geografia-do-tocantins.pdf",
    "title": "geografia do tocantins",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geografia-do-tocantins.pdf",
    "relativePath": "extras/geografia/geografia-do-tocantins.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-71fc45fc-194",
    "filename": "geopolitica-ambiental-parte-1.pdf",
    "title": "geopolitica ambiental parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-ambiental-parte-1.pdf",
    "relativePath": "extras/geografia/geopolitica-ambiental-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-69b4ba38-195",
    "filename": "geopolitica-ambiental-parte-2.pdf",
    "title": "geopolitica ambiental parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-ambiental-parte-2.pdf",
    "relativePath": "extras/geografia/geopolitica-ambiental-parte-2.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-ceaf41db-196",
    "filename": "geopolitica-da-africa-parte-1.pdf",
    "title": "geopolitica da africa parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-da-africa-parte-1.pdf",
    "relativePath": "extras/geografia/geopolitica-da-africa-parte-1.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-bcda86fe-197",
    "filename": "geopolitica-da-africa-parte-2.pdf",
    "title": "geopolitica da africa parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-da-africa-parte-2.pdf",
    "relativePath": "extras/geografia/geopolitica-da-africa-parte-2.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-8749b00a-198",
    "filename": "geopolitica-europa-e-america-anglo-saxonica-parte-01.pdf",
    "title": "geopolitica europa e america anglo saxonica parte 01",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-europa-e-america-anglo-saxonica-parte-01.pdf",
    "relativePath": "extras/geografia/geopolitica-europa-e-america-anglo-saxonica-parte-01.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-8a6d7f13-199",
    "filename": "geopolitica-europa-e-america-anglo-saxonica-parte-02.pdf",
    "title": "geopolitica europa e america anglo saxonica parte 02",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-europa-e-america-anglo-saxonica-parte-02.pdf",
    "relativePath": "extras/geografia/geopolitica-europa-e-america-anglo-saxonica-parte-02.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-ac8d5e7d-200",
    "filename": "geopolitica-extremo-oriente-parte-1.pdf",
    "title": "geopolitica extremo oriente parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-extremo-oriente-parte-1.pdf",
    "relativePath": "extras/geografia/geopolitica-extremo-oriente-parte-1.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-90aba768-201",
    "filename": "geopolitica-extremo-oriente-parte-2.pdf",
    "title": "geopolitica extremo oriente parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-extremo-oriente-parte-2.pdf",
    "relativePath": "extras/geografia/geopolitica-extremo-oriente-parte-2.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-c4e5db24-202",
    "filename": "geopolitica-nova-ordem-mundial.pdf",
    "title": "geopolitica nova ordem mundial",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-nova-ordem-mundial.pdf",
    "relativePath": "extras/geografia/geopolitica-nova-ordem-mundial.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-bd9c12e1-203",
    "filename": "geopolitica-oriente-medio-parte-1.pdf",
    "title": "geopolitica oriente medio parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-oriente-medio-parte-1.pdf",
    "relativePath": "extras/geografia/geopolitica-oriente-medio-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-148a37bc-204",
    "filename": "geopolitica-oriente-medio-parte-2.pdf",
    "title": "geopolitica oriente medio parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-oriente-medio-parte-2.pdf",
    "relativePath": "extras/geografia/geopolitica-oriente-medio-parte-2.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-4f04871c-205",
    "filename": "geopolitica-oriente-medio-parte-3.pdf",
    "title": "geopolitica oriente medio parte 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geopolitica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/geopolitica-oriente-medio-parte-3.pdf",
    "relativePath": "extras/geografia/geopolitica-oriente-medio-parte-3.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-b6a0314e-206",
    "filename": "globalizacao.pdf",
    "title": "globalizacao",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/globalizacao.pdf",
    "relativePath": "extras/geografia/globalizacao.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-3e081bd4-207",
    "filename": "hidrografia-principais-rios-bacias-hidrograficas-parte-1.pdf",
    "title": "hidrografia principais rios bacias hidrograficas parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/hidrografia-principais-rios-bacias-hidrograficas-parte-1.pdf",
    "relativePath": "extras/geografia/hidrografia-principais-rios-bacias-hidrograficas-parte-1.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-e476d5b0-208",
    "filename": "hidrografia-principais-rios-bacias-hidrograficas-parte-2.pdf",
    "title": "hidrografia principais rios bacias hidrograficas parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/hidrografia-principais-rios-bacias-hidrograficas-parte-2.pdf",
    "relativePath": "extras/geografia/hidrografia-principais-rios-bacias-hidrograficas-parte-2.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-16b856fd-209",
    "filename": "HIDROLOGIA E HIDROGRAFIA.pdf",
    "title": "HIDROLOGIA E HIDROGRAFIA",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/HIDROLOGIA%20E%20HIDROGRAFIA.pdf",
    "relativePath": "extras/geografia/HIDROLOGIA E HIDROGRAFIA.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-7801bc18-210",
    "filename": "hidrologia-agua-doce-no-planeta.pdf",
    "title": "hidrologia agua doce no planeta",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/hidrologia-agua-doce-no-planeta.pdf",
    "relativePath": "extras/geografia/hidrologia-agua-doce-no-planeta.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-bc545842-211",
    "filename": "industria-parte-1.pdf",
    "title": "industria parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/industria-parte-1.pdf",
    "relativePath": "extras/geografia/industria-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-8ff1510a-212",
    "filename": "industria-parte-2.pdf",
    "title": "industria parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/industria-parte-2.pdf",
    "relativePath": "extras/geografia/industria-parte-2.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-845aca66-213",
    "filename": "INDÚSTRIA E ENERGIA.pdf",
    "title": "INDÚSTRIA E ENERGIA",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/IND%C3%9ASTRIA%20E%20ENERGIA.pdf",
    "relativePath": "extras/geografia/INDÚSTRIA E ENERGIA.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-cd238633-214",
    "filename": "lista-cartografia-projecoes-cartograficas-e-escala-parte-2 (1).pdf",
    "title": "lista cartografia projecoes cartograficas e escala parte 2 (1)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-cartografia-projecoes-cartograficas-e-escala-parte-2%20(1).pdf",
    "relativePath": "extras/geografia/lista-cartografia-projecoes-cartograficas-e-escala-parte-2 (1).pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-7b76de3a-215",
    "filename": "lista-cartografia-projecoes-cartograficas-e-escala-parte-2.pdf",
    "title": "lista cartografia projecoes cartograficas e escala parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-cartografia-projecoes-cartograficas-e-escala-parte-2.pdf",
    "relativePath": "extras/geografia/lista-cartografia-projecoes-cartograficas-e-escala-parte-2.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-b1db9db2-216",
    "filename": "lista-cartografia-projecoes-cartograficas-e-escala.pdf",
    "title": "lista cartografia projecoes cartograficas e escala",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-cartografia-projecoes-cartograficas-e-escala.pdf",
    "relativePath": "extras/geografia/lista-cartografia-projecoes-cartograficas-e-escala.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-c5279bc7-217",
    "filename": "lista-clima (1).pdf",
    "title": "lista clima (1)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-clima%20(1).pdf",
    "relativePath": "extras/geografia/lista-clima (1).pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-b3c298eb-218",
    "filename": "lista-clima.pdf",
    "title": "lista clima",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-clima.pdf",
    "relativePath": "extras/geografia/lista-clima.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-3887dce6-219",
    "filename": "lista-de-questoes-coordenadas-geograficas.pdf",
    "title": "lista de questoes coordenadas geograficas",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-de-questoes-coordenadas-geograficas.pdf",
    "relativePath": "extras/geografia/lista-de-questoes-coordenadas-geograficas.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-f7469a13-220",
    "filename": "lista-de-questoes-dinamicidade-da-terra-no-sistema-planetario-ocorrencia-consequencias-e-relacoes-com-eventos-cotidianos.pdf",
    "title": "lista de questoes dinamicidade da terra no sistema planetario ocorrencia consequencias e relacoes com eventos cotidianos",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-de-questoes-dinamicidade-da-terra-no-sistema-planetario-ocorrencia-consequencias-e-relacoes-com-eventos-cotidianos.pdf",
    "relativePath": "extras/geografia/lista-de-questoes-dinamicidade-da-terra-no-sistema-planetario-ocorrencia-consequencias-e-relacoes-com-eventos-cotidianos.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-14d06cfc-221",
    "filename": "lista-de-questoes-fusos-horarios-hora-legal-hora-do-brasil-e-hora-solar.pdf",
    "title": "lista de questoes fusos horarios hora legal hora do brasil e hora solar",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-de-questoes-fusos-horarios-hora-legal-hora-do-brasil-e-hora-solar.pdf",
    "relativePath": "extras/geografia/lista-de-questoes-fusos-horarios-hora-legal-hora-do-brasil-e-hora-solar.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-058c8418-222",
    "filename": "lista-litosfera-e-estrutura-interna-da-terra-constituicao-e-caracteristicas-principais.pdf",
    "title": "lista litosfera e estrutura interna da terra constituicao e caracteristicas principais",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-litosfera-e-estrutura-interna-da-terra-constituicao-e-caracteristicas-principais.pdf",
    "relativePath": "extras/geografia/lista-litosfera-e-estrutura-interna-da-terra-constituicao-e-caracteristicas-principais.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-a2f44b8e-223",
    "filename": "lista-orientacao-contextualizada-e-convencional-e-meios-de-orientacao.pdf",
    "title": "lista orientacao contextualizada e convencional e meios de orientacao",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-orientacao-contextualizada-e-convencional-e-meios-de-orientacao.pdf",
    "relativePath": "extras/geografia/lista-orientacao-contextualizada-e-convencional-e-meios-de-orientacao.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-1fb2c072-224",
    "filename": "lista-relevo-dinamica-de-origem-interna-e-de-origem-externa-parte-1.pdf",
    "title": "lista relevo dinamica de origem interna e de origem externa parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-relevo-dinamica-de-origem-interna-e-de-origem-externa-parte-1.pdf",
    "relativePath": "extras/geografia/lista-relevo-dinamica-de-origem-interna-e-de-origem-externa-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-dc9129ce-225",
    "filename": "lista-relevo-dinamica-de-origem-interna-e-de-origem-externa-parte-2.pdf",
    "title": "lista relevo dinamica de origem interna e de origem externa parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "dinamica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/lista-relevo-dinamica-de-origem-interna-e-de-origem-externa-parte-2.pdf",
    "relativePath": "extras/geografia/lista-relevo-dinamica-de-origem-interna-e-de-origem-externa-parte-2.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-64416c45-226",
    "filename": "MEIO AMBIENTE, IMPACTOS URBANOS E RURAIS E AQUECIMENTO GLOBAL.pdf",
    "title": "MEIO AMBIENTE, IMPACTOS URBANOS E RURAIS E AQUECIMENTO GLOBAL",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/MEIO%20AMBIENTE%2C%20IMPACTOS%20URBANOS%20E%20RURAIS%20E%20AQUECIMENTO%20GLOBAL.pdf",
    "relativePath": "extras/geografia/MEIO AMBIENTE, IMPACTOS URBANOS E RURAIS E AQUECIMENTO GLOBAL.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-181e4a75-227",
    "filename": "meio-ambiente-aquecimento-global.pdf",
    "title": "meio ambiente aquecimento global",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/meio-ambiente-aquecimento-global.pdf",
    "relativePath": "extras/geografia/meio-ambiente-aquecimento-global.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-fa2680a8-228",
    "filename": "meio-ambiente-impactos-rurais-parte-1.pdf",
    "title": "meio ambiente impactos rurais parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/meio-ambiente-impactos-rurais-parte-1.pdf",
    "relativePath": "extras/geografia/meio-ambiente-impactos-rurais-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-1f5cd1b9-229",
    "filename": "meio-ambiente-impactos-rurais-parte-2.pdf",
    "title": "meio ambiente impactos rurais parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/meio-ambiente-impactos-rurais-parte-2.pdf",
    "relativePath": "extras/geografia/meio-ambiente-impactos-rurais-parte-2.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-8cc72231-230",
    "filename": "meio-ambiente-impactos-rurais-parte-3.pdf",
    "title": "meio ambiente impactos rurais parte 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/meio-ambiente-impactos-rurais-parte-3.pdf",
    "relativePath": "extras/geografia/meio-ambiente-impactos-rurais-parte-3.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-867056a2-231",
    "filename": "meio-ambiente-impactos-urbanos-parte-1.pdf",
    "title": "meio ambiente impactos urbanos parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/meio-ambiente-impactos-urbanos-parte-1.pdf",
    "relativePath": "extras/geografia/meio-ambiente-impactos-urbanos-parte-1.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-bf3b6631-232",
    "filename": "meio-ambiente-impactos-urbanos-parte-2.pdf",
    "title": "meio ambiente impactos urbanos parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/meio-ambiente-impactos-urbanos-parte-2.pdf",
    "relativePath": "extras/geografia/meio-ambiente-impactos-urbanos-parte-2.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-c4dd7ad7-233",
    "filename": "mercados-emergentes-aspectos-gerais.pdf",
    "title": "mercados emergentes aspectos gerais",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/mercados-emergentes-aspectos-gerais.pdf",
    "relativePath": "extras/geografia/mercados-emergentes-aspectos-gerais.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-dc4ce8b9-234",
    "filename": "mercados-emergentes-brics.pdf",
    "title": "mercados emergentes brics",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/mercados-emergentes-brics.pdf",
    "relativePath": "extras/geografia/mercados-emergentes-brics.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-7b52315c-235",
    "filename": "migracoes-internacionais-parte-01.pdf",
    "title": "migracoes internacionais parte 01",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/migracoes-internacionais-parte-01.pdf",
    "relativePath": "extras/geografia/migracoes-internacionais-parte-01.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-85bb6478-236",
    "filename": "migracoes-internacionais-parte-02.pdf",
    "title": "migracoes internacionais parte 02",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/migracoes-internacionais-parte-02.pdf",
    "relativePath": "extras/geografia/migracoes-internacionais-parte-02.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-42af94f2-237",
    "filename": "MIGRAÇÕES INTERNACIONAIS E MIGRAÇÕES INTERNAS DO BRASIL.pdf",
    "title": "MIGRAÇÕES INTERNACIONAIS E MIGRAÇÕES INTERNAS DO BRASIL",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/MIGRA%C3%87%C3%95ES%20INTERNACIONAIS%20E%20MIGRA%C3%87%C3%95ES%20INTERNAS%20DO%20BRASIL.pdf",
    "relativePath": "extras/geografia/MIGRAÇÕES INTERNACIONAIS E MIGRAÇÕES INTERNAS DO BRASIL.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-b85fcd1a-238",
    "filename": "mineracao.pdf",
    "title": "mineracao",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/mineracao.pdf",
    "relativePath": "extras/geografia/mineracao.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-5f678adb-239",
    "filename": "orientacao-contextualizada-e-convencional-e-meios-de-orientacao.pdf",
    "title": "orientacao contextualizada e convencional e meios de orientacao",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/orientacao-contextualizada-e-convencional-e-meios-de-orientacao.pdf",
    "relativePath": "extras/geografia/orientacao-contextualizada-e-convencional-e-meios-de-orientacao.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-6ca1cb77-240",
    "filename": "PAISAGENS NATURAIS.pdf",
    "title": "PAISAGENS NATURAIS",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/PAISAGENS%20NATURAIS.pdf",
    "relativePath": "extras/geografia/PAISAGENS NATURAIS.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-965247fb-241",
    "filename": "paisagens-naturais-dominios-morfoclimaticos-parte-2.pdf",
    "title": "paisagens naturais dominios morfoclimaticos parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/paisagens-naturais-dominios-morfoclimaticos-parte-2.pdf",
    "relativePath": "extras/geografia/paisagens-naturais-dominios-morfoclimaticos-parte-2.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-9e01e3cc-242",
    "filename": "paisagens-naturais-dominios-morfoclimaticos-parte-3.pdf",
    "title": "paisagens naturais dominios morfoclimaticos parte 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/paisagens-naturais-dominios-morfoclimaticos-parte-3.pdf",
    "relativePath": "extras/geografia/paisagens-naturais-dominios-morfoclimaticos-parte-3.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-426dc2f9-243",
    "filename": "paisagens-naturais-dominios-morfoclimaticos-parte1.pdf",
    "title": "paisagens naturais dominios morfoclimaticos parte1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/paisagens-naturais-dominios-morfoclimaticos-parte1.pdf",
    "relativePath": "extras/geografia/paisagens-naturais-dominios-morfoclimaticos-parte1.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-ad4e7b4a-244",
    "filename": "politica-ambiental-brasileira.pdf",
    "title": "politica ambiental brasileira",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/politica-ambiental-brasileira.pdf",
    "relativePath": "extras/geografia/politica-ambiental-brasileira.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-a13739bb-245",
    "filename": "principais-tipos-climaticos-parte-1.pdf",
    "title": "principais tipos climaticos parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/principais-tipos-climaticos-parte-1.pdf",
    "relativePath": "extras/geografia/principais-tipos-climaticos-parte-1.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-6e1c91ab-246",
    "filename": "principais-tipos-climaticos-parte-2.pdf",
    "title": "principais tipos climaticos parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/principais-tipos-climaticos-parte-2.pdf",
    "relativePath": "extras/geografia/principais-tipos-climaticos-parte-2.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-2b24f6b2-247",
    "filename": "QUESTÕES UNIRG.pdf",
    "title": "QUESTÕES UNIRG",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "UNIRG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/QUEST%C3%95ES%20UNIRG.pdf",
    "relativePath": "extras/geografia/QUESTÕES UNIRG.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-8cbf507e-248",
    "filename": "relevo-terrestre-principais-formas-de-relevo.pdf",
    "title": "relevo terrestre principais formas de relevo",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/relevo-terrestre-principais-formas-de-relevo.pdf",
    "relativePath": "extras/geografia/relevo-terrestre-principais-formas-de-relevo.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-7f10d98c-249",
    "filename": "TRANSPORTE E LOGÍSTICA, MINERAÇÃO E COMÉRCIO INTERNACIONAL.pdf",
    "title": "TRANSPORTE E LOGÍSTICA, MINERAÇÃO E COMÉRCIO INTERNACIONAL",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/TRANSPORTE%20E%20LOG%C3%8DSTICA%2C%20MINERA%C3%87%C3%83O%20E%20COM%C3%89RCIO%20INTERNACIONAL.pdf",
    "relativePath": "extras/geografia/TRANSPORTE E LOGÍSTICA, MINERAÇÃO E COMÉRCIO INTERNACIONAL.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-f99eae73-250",
    "filename": "transporte-e-logistica-parte-2.pdf",
    "title": "transporte e logistica parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/transporte-e-logistica-parte-2.pdf",
    "relativePath": "extras/geografia/transporte-e-logistica-parte-2.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-f4d0c7c6-251",
    "filename": "urbanizacao-parte-1.pdf",
    "title": "urbanizacao parte 1",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "urbanizacao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/urbanizacao-parte-1.pdf",
    "relativePath": "extras/geografia/urbanizacao-parte-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-545c6151-252",
    "filename": "urbanizacao-parte-2.pdf",
    "title": "urbanizacao parte 2",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "urbanizacao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/urbanizacao-parte-2.pdf",
    "relativePath": "extras/geografia/urbanizacao-parte-2.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-8cf6d3a1-253",
    "filename": "urbanizacao-parte-3.pdf",
    "title": "urbanizacao parte 3",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "urbanizacao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/urbanizacao-parte-3.pdf",
    "relativePath": "extras/geografia/urbanizacao-parte-3.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-9ecdfa09-254",
    "filename": "URBANIZAÇÃO E DESIGUALDADES SOCIAIS.pdf",
    "title": "URBANIZAÇÃO E DESIGUALDADES SOCIAIS",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/geografia/URBANIZA%C3%87%C3%83O%20E%20DESIGUALDADES%20SOCIAIS.pdf",
    "relativePath": "extras/geografia/URBANIZAÇÃO E DESIGUALDADES SOCIAIS.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-ac44bd80-255",
    "filename": "2025-tessat-historia-alta-idade-media.pdf",
    "title": "2025 tessat historia alta idade media",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-alta-idade-media.pdf",
    "relativePath": "extras/história/2025-tessat-historia-alta-idade-media.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-66a08fbc-256",
    "filename": "2025-tessat-historia-antiguidade-classica-grecia-antiga-tradicional-gereba.pdf",
    "title": "2025 tessat historia antiguidade classica grecia antiga tradicional gereba",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-antiguidade-classica-grecia-antiga-tradicional-gereba.pdf",
    "relativePath": "extras/história/2025-tessat-historia-antiguidade-classica-grecia-antiga-tradicional-gereba.pdf",
    "sizeFormatted": "3.0 MB"
  },
  {
    "id": "acervo-edcc453e-257",
    "filename": "2025-tessat-historia-antiguidade-classica-roma-antiga-tradicional-gereba.pdf",
    "title": "2025 tessat historia antiguidade classica roma antiga tradicional gereba",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-antiguidade-classica-roma-antiga-tradicional-gereba.pdf",
    "relativePath": "extras/história/2025-tessat-historia-antiguidade-classica-roma-antiga-tradicional-gereba.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-fe2cc59a-258",
    "filename": "2025-tessat-historia-aula-24-gereba.pdf",
    "title": "2025 tessat historia aula 24 gereba",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-aula-24-gereba.pdf",
    "relativePath": "extras/história/2025-tessat-historia-aula-24-gereba.pdf",
    "sizeFormatted": "3.3 MB"
  },
  {
    "id": "acervo-50ba459a-259",
    "filename": "2025-tessat-historia-baixa-idade-media-tradicional-gereba.pdf",
    "title": "2025 tessat historia baixa idade media tradicional gereba",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-baixa-idade-media-tradicional-gereba.pdf",
    "relativePath": "extras/história/2025-tessat-historia-baixa-idade-media-tradicional-gereba.pdf",
    "sizeFormatted": "3.0 MB"
  },
  {
    "id": "acervo-acd91819-260",
    "filename": "2025-tessat-historia-civilizacoes-da-america-pre-colomnianas-gereba.pdf",
    "title": "2025 tessat historia civilizacoes da america pre colomnianas gereba",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-civilizacoes-da-america-pre-colomnianas-gereba.pdf",
    "relativePath": "extras/história/2025-tessat-historia-civilizacoes-da-america-pre-colomnianas-gereba.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-fae6a169-261",
    "filename": "2025-tessat-historia-colonizacoes-da-america-espanhola-e-inglesa-gereba.pdf",
    "title": "2025 tessat historia colonizacoes da america espanhola e inglesa gereba",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-colonizacoes-da-america-espanhola-e-inglesa-gereba.pdf",
    "relativePath": "extras/história/2025-tessat-historia-colonizacoes-da-america-espanhola-e-inglesa-gereba.pdf",
    "sizeFormatted": "2.9 MB"
  },
  {
    "id": "acervo-879288f6-262",
    "filename": "2025-tessat-historia-gereba (1).pdf",
    "title": "2025 tessat historia gereba (1)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba%20(1).pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba (1).pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-37a49ce5-263",
    "filename": "2025-tessat-historia-gereba (2).pdf",
    "title": "2025 tessat historia gereba (2)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba%20(2).pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba (2).pdf",
    "sizeFormatted": "3.2 MB"
  },
  {
    "id": "acervo-964d1270-264",
    "filename": "2025-tessat-historia-gereba (3).pdf",
    "title": "2025 tessat historia gereba (3)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba%20(3).pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba (3).pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-6f07e986-265",
    "filename": "2025-tessat-historia-gereba (4).pdf",
    "title": "2025 tessat historia gereba (4)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba%20(4).pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba (4).pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-cc20ea5b-266",
    "filename": "2025-tessat-historia-gereba (5).pdf",
    "title": "2025 tessat historia gereba (5)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba%20(5).pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba (5).pdf",
    "sizeFormatted": "3.0 MB"
  },
  {
    "id": "acervo-686a3b4c-267",
    "filename": "2025-tessat-historia-gereba (6).pdf",
    "title": "2025 tessat historia gereba (6)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba%20(6).pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba (6).pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-cb022ee7-268",
    "filename": "2025-tessat-historia-gereba (7).pdf",
    "title": "2025 tessat historia gereba (7)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba%20(7).pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba (7).pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-b5e294ff-269",
    "filename": "2025-tessat-historia-gereba.pdf",
    "title": "2025 tessat historia gereba",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-gereba.pdf",
    "relativePath": "extras/história/2025-tessat-historia-gereba.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-cdb1453d-270",
    "filename": "2025-tessat-historia-teoria-da-historia-e-memoria-cultura-e-patrimonio.pdf",
    "title": "2025 tessat historia teoria da historia e memoria cultura e patrimonio",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/2025-tessat-historia-teoria-da-historia-e-memoria-cultura-e-patrimonio.pdf",
    "relativePath": "extras/história/2025-tessat-historia-teoria-da-historia-e-memoria-cultura-e-patrimonio.pdf",
    "sizeFormatted": "3.1 MB"
  },
  {
    "id": "acervo-bd059835-271",
    "filename": "a-era-vargas-entre-1930-e-1934.pdf",
    "title": "a era vargas entre 1930 e 1934",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "era vargas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/a-era-vargas-entre-1930-e-1934.pdf",
    "relativePath": "extras/história/a-era-vargas-entre-1930-e-1934.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-f9ccf22c-272",
    "filename": "a-primeira-republica-brasileira-entre-1889-e-1930.pdf",
    "title": "a primeira republica brasileira entre 1889 e 1930",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/a-primeira-republica-brasileira-entre-1889-e-1930.pdf",
    "relativePath": "extras/história/a-primeira-republica-brasileira-entre-1889-e-1930.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-47b97003-273",
    "filename": "a-republica-liberal-e-populista-brasileira-entre-1946-1964 (1).pdf",
    "title": "a republica liberal e populista brasileira entre 1946 1964 (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/a-republica-liberal-e-populista-brasileira-entre-1946-1964%20(1).pdf",
    "relativePath": "extras/história/a-republica-liberal-e-populista-brasileira-entre-1946-1964 (1).pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-ec30d10f-274",
    "filename": "a-republica-liberal-e-populista-brasileira-entre-1946-1964.pdf",
    "title": "a republica liberal e populista brasileira entre 1946 1964",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/a-republica-liberal-e-populista-brasileira-entre-1946-1964.pdf",
    "relativePath": "extras/história/a-republica-liberal-e-populista-brasileira-entre-1946-1964.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-7695a724-275",
    "filename": "AMÉRICA PRÉ-COLONIAL E COLONIAL.pdf",
    "title": "AMÉRICA PRÉ COLONIAL E COLONIAL",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/AM%C3%89RICA%20PR%C3%89-COLONIAL%20E%20COLONIAL.pdf",
    "relativePath": "extras/história/AMÉRICA PRÉ-COLONIAL E COLONIAL.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-79ca0c89-276",
    "filename": "antiguidade-classica.pdf",
    "title": "antiguidade classica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/antiguidade-classica.pdf",
    "relativePath": "extras/história/antiguidade-classica.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-83269955-277",
    "filename": "BRASIL COLÔNIA.pdf",
    "title": "BRASIL COLÔNIA",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/BRASIL%20COL%C3%94NIA.pdf",
    "relativePath": "extras/história/BRASIL COLÔNIA.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-c39b8579-278",
    "filename": "BRASIL IMPÉRIO.pdf",
    "title": "BRASIL IMPÉRIO",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/BRASIL%20IMP%C3%89RIO.pdf",
    "relativePath": "extras/história/BRASIL IMPÉRIO.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-3254784c-279",
    "filename": "expansao-territorial-na-america-portuguesa.pdf",
    "title": "expansao territorial na america portuguesa",
    "discipline": "linguagens",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/expansao-territorial-na-america-portuguesa.pdf",
    "relativePath": "extras/história/expansao-territorial-na-america-portuguesa.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-35141ca7-280",
    "filename": "fechamento-politico-civil-militar-no-brasil-entre-1964-1974.pdf",
    "title": "fechamento politico civil militar no brasil entre 1964 1974",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/fechamento-politico-civil-militar-no-brasil-entre-1964-1974.pdf",
    "relativePath": "extras/história/fechamento-politico-civil-militar-no-brasil-entre-1964-1974.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-4d9bc3f5-281",
    "filename": "formacao-dos-estados-modernos-e-expansao-maritima-comercial-europeia.pdf",
    "title": "formacao dos estados modernos e expansao maritima comercial europeia",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/formacao-dos-estados-modernos-e-expansao-maritima-comercial-europeia.pdf",
    "relativePath": "extras/história/formacao-dos-estados-modernos-e-expansao-maritima-comercial-europeia.pdf",
    "sizeFormatted": "0.2 MB"
  },
  {
    "id": "acervo-623b5596-282",
    "filename": "historia-do-tocantins (1).pdf",
    "title": "historia do tocantins (1)",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/historia-do-tocantins%20(1).pdf",
    "relativePath": "extras/história/historia-do-tocantins (1).pdf",
    "sizeFormatted": "3.5 MB"
  },
  {
    "id": "acervo-e51fbafd-283",
    "filename": "historia-do-tocantins-lista-de-questoes-historia.pdf",
    "title": "historia do tocantins lista de questoes historia",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/historia-do-tocantins-lista-de-questoes-historia.pdf",
    "relativePath": "extras/história/historia-do-tocantins-lista-de-questoes-historia.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-86cd7bae-284",
    "filename": "historia-do-tocantins.pdf",
    "title": "historia do tocantins",
    "discipline": "humanas",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/historia-do-tocantins.pdf",
    "relativePath": "extras/história/historia-do-tocantins.pdf",
    "sizeFormatted": "3.5 MB"
  },
  {
    "id": "acervo-60216dd4-285",
    "filename": "IDADE CONTEMPORÂNEA - SÉCULO XX.pdf",
    "title": "IDADE CONTEMPORÂNEA SÉCULO XX",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/IDADE%20CONTEMPOR%C3%82NEA%20-%20S%C3%89CULO%20XX.pdf",
    "relativePath": "extras/história/IDADE CONTEMPORÂNEA - SÉCULO XX.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-3d33bfa6-286",
    "filename": "IDADE CONTEMPORÂNEA.pdf",
    "title": "IDADE CONTEMPORÂNEA",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/IDADE%20CONTEMPOR%C3%82NEA.pdf",
    "relativePath": "extras/história/IDADE CONTEMPORÂNEA.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-aa3c0e75-287",
    "filename": "IDADE MODERNA - PARTE 01.pdf",
    "title": "IDADE MODERNA PARTE 01",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/IDADE%20MODERNA%20-%20PARTE%2001.pdf",
    "relativePath": "extras/história/IDADE MODERNA - PARTE 01.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-6f3ada8e-288",
    "filename": "IDADE MODERNA - PARTE 02.pdf",
    "title": "IDADE MODERNA PARTE 02",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/IDADE%20MODERNA%20-%20PARTE%2002.pdf",
    "relativePath": "extras/história/IDADE MODERNA - PARTE 02.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-d9571b9b-289",
    "filename": "idade-media.pdf",
    "title": "idade media",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/idade-media.pdf",
    "relativePath": "extras/história/idade-media.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-9e0e52c4-290",
    "filename": "iluminismo-e-revolucao-industrial.pdf",
    "title": "iluminismo e revolucao industrial",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "evolucao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/iluminismo-e-revolucao-industrial.pdf",
    "relativePath": "extras/história/iluminismo-e-revolucao-industrial.pdf",
    "sizeFormatted": "3.2 MB"
  },
  {
    "id": "acervo-8d63caba-291",
    "filename": "IMPERIALISMO NO SÉCULO XIX.pdf",
    "title": "IMPERIALISMO NO SÉCULO XIX",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/IMPERIALISMO%20NO%20S%C3%89CULO%20XIX.pdf",
    "relativePath": "extras/história/IMPERIALISMO NO SÉCULO XIX.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-c1c28a53-292",
    "filename": "INDEPENDÊNCIA NAS AMÉRICAS (SÉC. XIX).pdf",
    "title": "INDEPENDÊNCIA NAS AMÉRICAS (SÉC. XIX)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/INDEPEND%C3%8ANCIA%20NAS%20AM%C3%89RICAS%20(S%C3%89C.%20XIX).pdf",
    "relativePath": "extras/história/INDEPENDÊNCIA NAS AMÉRICAS (SÉC. XIX).pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-a9599e94-293",
    "filename": "introducao-e-antiguidade-oriental.pdf",
    "title": "introducao e antiguidade oriental",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/introducao-e-antiguidade-oriental.pdf",
    "relativePath": "extras/história/introducao-e-antiguidade-oriental.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-d3f57843-294",
    "filename": "lista-de-exercicios-antiguidade-oriental-egito-antigo-e-mesopotamia.pdf",
    "title": "lista de exercicios antiguidade oriental egito antigo e mesopotamia",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/lista-de-exercicios-antiguidade-oriental-egito-antigo-e-mesopotamia.pdf",
    "relativePath": "extras/história/lista-de-exercicios-antiguidade-oriental-egito-antigo-e-mesopotamia.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-77fd1263-295",
    "filename": "mineracao-e-movimentos-de-resistencias-coloniais.pdf",
    "title": "mineracao e movimentos de resistencias coloniais",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/mineracao-e-movimentos-de-resistencias-coloniais.pdf",
    "relativePath": "extras/história/mineracao-e-movimentos-de-resistencias-coloniais.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-56d55cd3-296",
    "filename": "monarquia-brasileira-primeiro-reinado-e-periodo-regencial-entre-1822-1840.pdf",
    "title": "monarquia brasileira primeiro reinado e periodo regencial entre 1822 1840",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/monarquia-brasileira-primeiro-reinado-e-periodo-regencial-entre-1822-1840.pdf",
    "relativePath": "extras/história/monarquia-brasileira-primeiro-reinado-e-periodo-regencial-entre-1822-1840.pdf",
    "sizeFormatted": "3.0 MB"
  },
  {
    "id": "acervo-3b869eb1-297",
    "filename": "monarquia-brasileira-segundo-reinado-entre-1840-1889.pdf",
    "title": "monarquia brasileira segundo reinado entre 1840 1889",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/monarquia-brasileira-segundo-reinado-entre-1840-1889.pdf",
    "relativePath": "extras/história/monarquia-brasileira-segundo-reinado-entre-1840-1889.pdf",
    "sizeFormatted": "3.1 MB"
  },
  {
    "id": "acervo-397af5b7-298",
    "filename": "restauracao-liberalismo-e-socialismo-na-europa-do-seculo-xix.pdf",
    "title": "restauracao liberalismo e socialismo na europa do seculo xix",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/restauracao-liberalismo-e-socialismo-na-europa-do-seculo-xix.pdf",
    "relativePath": "extras/história/restauracao-liberalismo-e-socialismo-na-europa-do-seculo-xix.pdf",
    "sizeFormatted": "2.9 MB"
  },
  {
    "id": "acervo-ca6e6ff5-299",
    "filename": "revisao-unirg.pdf",
    "title": "revisao unirg",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "UNIRG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/revisao-unirg.pdf",
    "relativePath": "extras/história/revisao-unirg.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-e93cb00f-300",
    "filename": "revolucao-francesa-e-era-napoleonica.pdf",
    "title": "revolucao francesa e era napoleonica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "evolucao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/revolucao-francesa-e-era-napoleonica.pdf",
    "relativePath": "extras/história/revolucao-francesa-e-era-napoleonica.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-e8d926d1-301",
    "filename": "revolucao-russa-de-1917.pdf",
    "title": "revolucao russa de 1917",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "evolucao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/revolucao-russa-de-1917.pdf",
    "relativePath": "extras/história/revolucao-russa-de-1917.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-74e9c600-302",
    "filename": "revolucoes-inglesas-no-seculo-xvii.pdf",
    "title": "revolucoes inglesas no seculo xvii",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/revolucoes-inglesas-no-seculo-xvii.pdf",
    "relativePath": "extras/história/revolucoes-inglesas-no-seculo-xvii.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-ceb65bc1-303",
    "filename": "sociedade-e-cultura-da-america-portuguesa.pdf",
    "title": "sociedade e cultura da america portuguesa",
    "discipline": "linguagens",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/sociedade-e-cultura-da-america-portuguesa.pdf",
    "relativePath": "extras/história/sociedade-e-cultura-da-america-portuguesa.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-c21728e3-304",
    "filename": "tempos-modernos-renascimento-cultural-e-reforma-protestante.pdf",
    "title": "tempos modernos renascimento cultural e reforma protestante",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/tempos-modernos-renascimento-cultural-e-reforma-protestante.pdf",
    "relativePath": "extras/história/tempos-modernos-renascimento-cultural-e-reforma-protestante.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-a745315f-305",
    "filename": "transmigracao-portuguesa-e-o-processo-da-independencia-politica-do-brasil.pdf",
    "title": "transmigracao portuguesa e o processo da independencia politica do brasil",
    "discipline": "linguagens",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "brasil"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/hist%C3%B3ria/transmigracao-portuguesa-e-o-processo-da-independencia-politica-do-brasil.pdf",
    "relativePath": "extras/história/transmigracao-portuguesa-e-o-processo-da-independencia-politica-do-brasil.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-eb745006-306",
    "filename": "matematica-bloquinho-da-aprovacao-anotacoes.pdf",
    "title": "matematica bloquinho da aprovacao anotacoes",
    "discipline": "matematica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/matematica-bloquinho-da-aprovacao-anotacoes.pdf",
    "relativePath": "extras/matematica-bloquinho-da-aprovacao-anotacoes.pdf",
    "sizeFormatted": "9.8 MB"
  },
  {
    "id": "acervo-4422638b-307",
    "filename": "matematica-funcao-afimm.pdf",
    "title": "matematica funcao afimm",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "funcao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/matematica-funcao-afimm.pdf",
    "relativePath": "extras/matematica-funcao-afimm.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-e9a90c29-308",
    "filename": "analise-combinatoria.pdf",
    "title": "analise combinatoria",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "combinatoria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/analise-combinatoria.pdf",
    "relativePath": "extras/Matemática/analise-combinatoria.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-8c1031a4-309",
    "filename": "anotacoes-conjuntos-numericos-1.pdf",
    "title": "anotacoes conjuntos numericos 1",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/anotacoes-conjuntos-numericos-1.pdf",
    "relativePath": "extras/Matemática/anotacoes-conjuntos-numericos-1.pdf",
    "sizeFormatted": "6.1 MB"
  },
  {
    "id": "acervo-987557da-310",
    "filename": "anotacoes-estatistica-1.pdf",
    "title": "anotacoes estatistica 1",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "estatistica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/anotacoes-estatistica-1.pdf",
    "relativePath": "extras/Matemática/anotacoes-estatistica-1.pdf",
    "sizeFormatted": "6.3 MB"
  },
  {
    "id": "acervo-a383db2e-311",
    "filename": "anotacoes-funcoes-trigonometricas.pdf",
    "title": "anotacoes funcoes trigonometricas",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/anotacoes-funcoes-trigonometricas.pdf",
    "relativePath": "extras/Matemática/anotacoes-funcoes-trigonometricas.pdf",
    "sizeFormatted": "7.2 MB"
  },
  {
    "id": "acervo-85de9d69-312",
    "filename": "anotacoes-porcentagem.pdf",
    "title": "anotacoes porcentagem",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/anotacoes-porcentagem.pdf",
    "relativePath": "extras/Matemática/anotacoes-porcentagem.pdf",
    "sizeFormatted": "7.7 MB"
  },
  {
    "id": "acervo-b14a38da-313",
    "filename": "anotacoes-razao-e-proporcao-1.pdf",
    "title": "anotacoes razao e proporcao 1",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/anotacoes-razao-e-proporcao-1.pdf",
    "relativePath": "extras/Matemática/anotacoes-razao-e-proporcao-1.pdf",
    "sizeFormatted": "9.0 MB"
  },
  {
    "id": "acervo-54184c23-314",
    "filename": "anotacoesjuros-simples.pdf",
    "title": "anotacoesjuros simples",
    "discipline": "geral",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/anotacoesjuros-simples.pdf",
    "relativePath": "extras/Matemática/anotacoesjuros-simples.pdf",
    "sizeFormatted": "4.1 MB"
  },
  {
    "id": "acervo-34462dd4-315",
    "filename": "ANÁLISE COMBINATÓRIA (1).pdf",
    "title": "ANÁLISE COMBINATÓRIA (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/AN%C3%81LISE%20COMBINAT%C3%93RIA%20(1).pdf",
    "relativePath": "extras/Matemática/ANÁLISE COMBINATÓRIA (1).pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-a8477f37-316",
    "filename": "conjuntos-numericos.pdf",
    "title": "conjuntos numericos",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/conjuntos-numericos.pdf",
    "relativePath": "extras/Matemática/conjuntos-numericos.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-c3895ad7-317",
    "filename": "estatistica-e-porcentagem.pdf",
    "title": "estatistica e porcentagem",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "estatistica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/estatistica-e-porcentagem.pdf",
    "relativePath": "extras/Matemática/estatistica-e-porcentagem.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-35efe606-318",
    "filename": "estatistica.pdf",
    "title": "estatistica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "estatistica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/estatistica.pdf",
    "relativePath": "extras/Matemática/estatistica.pdf",
    "sizeFormatted": "6.3 MB"
  },
  {
    "id": "acervo-b728ffcb-319",
    "filename": "funcao-exponencial.pdf",
    "title": "funcao exponencial",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "funcao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/funcao-exponencial.pdf",
    "relativePath": "extras/Matemática/funcao-exponencial.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-22f52d2d-320",
    "filename": "funcao-inversa-e-funcao-composta.pdf",
    "title": "funcao inversa e funcao composta",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "funcao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/funcao-inversa-e-funcao-composta.pdf",
    "relativePath": "extras/Matemática/funcao-inversa-e-funcao-composta.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-c1d3dc26-321",
    "filename": "funcao-logaritimica.pdf",
    "title": "funcao logaritimica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "funcao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/funcao-logaritimica.pdf",
    "relativePath": "extras/Matemática/funcao-logaritimica.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-7e1a3058-322",
    "filename": "funcao-quadratica.pdf",
    "title": "funcao quadratica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "funcao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/funcao-quadratica.pdf",
    "relativePath": "extras/Matemática/funcao-quadratica.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-94f13604-323",
    "filename": "FUNÇÃO DE 1° GRAU.pdf",
    "title": "FUNÇÃO DE 1° GRAU",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/FUN%C3%87%C3%83O%20DE%201%C2%B0%20GRAU.pdf",
    "relativePath": "extras/Matemática/FUNÇÃO DE 1° GRAU.pdf",
    "sizeFormatted": "1.9 MB"
  },
  {
    "id": "acervo-d03c28ce-324",
    "filename": "FUNÇÃO DE 2° GRAU.pdf",
    "title": "FUNÇÃO DE 2° GRAU",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/FUN%C3%87%C3%83O%20DE%202%C2%B0%20GRAU.pdf",
    "relativePath": "extras/Matemática/FUNÇÃO DE 2° GRAU.pdf",
    "sizeFormatted": "1.9 MB"
  },
  {
    "id": "acervo-139945c4-325",
    "filename": "FUNÇÃO EXPONENCIAL E LOGARÍTMICA.pdf",
    "title": "FUNÇÃO EXPONENCIAL E LOGARÍTMICA",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/FUN%C3%87%C3%83O%20EXPONENCIAL%20E%20LOGAR%C3%8DTMICA.pdf",
    "relativePath": "extras/Matemática/FUNÇÃO EXPONENCIAL E LOGARÍTMICA.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-8707b730-326",
    "filename": "GEOMETRIA ESPACIAL.pdf",
    "title": "GEOMETRIA ESPACIAL",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/GEOMETRIA%20ESPACIAL.pdf",
    "relativePath": "extras/Matemática/GEOMETRIA ESPACIAL.pdf",
    "sizeFormatted": "3.6 MB"
  },
  {
    "id": "acervo-70a33823-327",
    "filename": "GEOMETRIA PLANA.pdf",
    "title": "GEOMETRIA PLANA",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/GEOMETRIA%20PLANA.pdf",
    "relativePath": "extras/Matemática/GEOMETRIA PLANA.pdf",
    "sizeFormatted": "3.5 MB"
  },
  {
    "id": "acervo-589efbb4-328",
    "filename": "geometria-analitica.pdf",
    "title": "geometria analitica",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/geometria-analitica.pdf",
    "relativePath": "extras/Matemática/geometria-analitica.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-7b1230c8-329",
    "filename": "geometria-espacial.pdf",
    "title": "geometria espacial",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/geometria-espacial.pdf",
    "relativePath": "extras/Matemática/geometria-espacial.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-84ffdeef-330",
    "filename": "geometria-plana.pdf",
    "title": "geometria plana",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/geometria-plana.pdf",
    "relativePath": "extras/Matemática/geometria-plana.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-ab4dac0e-331",
    "filename": "INTENSIVO - AULA 1 - MATEMÁTICA.pdf",
    "title": "INTENSIVO AULA 1 MATEMÁTICA",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/INTENSIVO%20-%20AULA%201%20-%20MATEM%C3%81TICA.pdf",
    "relativePath": "extras/Matemática/INTENSIVO - AULA 1 - MATEMÁTICA.pdf",
    "sizeFormatted": "0.1 MB"
  },
  {
    "id": "acervo-6d6683a2-332",
    "filename": "introducao-a-funcao-e-funcao-afim.pdf",
    "title": "introducao a funcao e funcao afim",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "funcao"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/introducao-a-funcao-e-funcao-afim.pdf",
    "relativePath": "extras/Matemática/introducao-a-funcao-e-funcao-afim.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-80b0f540-333",
    "filename": "juros-compostos.pdf",
    "title": "juros compostos",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/juros-compostos.pdf",
    "relativePath": "extras/Matemática/juros-compostos.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-0de43897-334",
    "filename": "MATEMÁTICA FINANCEIRA.pdf",
    "title": "MATEMÁTICA FINANCEIRA",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/MATEM%C3%81TICA%20FINANCEIRA.pdf",
    "relativePath": "extras/Matemática/MATEMÁTICA FINANCEIRA.pdf",
    "sizeFormatted": "2.0 MB"
  },
  {
    "id": "acervo-9a1d7c99-335",
    "filename": "matrizes-e-determinantes.pdf",
    "title": "matrizes e determinantes",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "matrizes"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/matrizes-e-determinantes.pdf",
    "relativePath": "extras/Matemática/matrizes-e-determinantes.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-33ae7aa7-336",
    "filename": "PROBABILIDADE (1).pdf",
    "title": "PROBABILIDADE (1)",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "probabilidade"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/PROBABILIDADE%20(1).pdf",
    "relativePath": "extras/Matemática/PROBABILIDADE (1).pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-ffe69c89-337",
    "filename": "probabilidade.pdf",
    "title": "probabilidade",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "probabilidade"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/probabilidade.pdf",
    "relativePath": "extras/Matemática/probabilidade.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-0d176566-338",
    "filename": "progressao-aritmetica.pdf",
    "title": "progressao aritmetica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/progressao-aritmetica.pdf",
    "relativePath": "extras/Matemática/progressao-aritmetica.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-63f9d626-339",
    "filename": "progressao-geometrica.pdf",
    "title": "progressao geometrica",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/progressao-geometrica.pdf",
    "relativePath": "extras/Matemática/progressao-geometrica.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-dadcdb00-340",
    "filename": "razao-e-proporcao (1).pdf",
    "title": "razao e proporcao (1)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/razao-e-proporcao%20(1).pdf",
    "relativePath": "extras/Matemática/razao-e-proporcao (1).pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-e615dedd-341",
    "filename": "revisao-unirg.pdf",
    "title": "revisao unirg",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "UNIRG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/revisao-unirg.pdf",
    "relativePath": "extras/Matemática/revisao-unirg.pdf",
    "sizeFormatted": "3.8 MB"
  },
  {
    "id": "acervo-e811115d-342",
    "filename": "SEQUÊNCIAS (PROGRESSÃO ARITMÉTICA E PROGRESSÃO GEOMÉTRICA).pdf",
    "title": "SEQUÊNCIAS (PROGRESSÃO ARITMÉTICA E PROGRESSÃO GEOMÉTRICA)",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/SEQU%C3%8ANCIAS%20(PROGRESS%C3%83O%20ARITM%C3%89TICA%20E%20PROGRESS%C3%83O%20GEOM%C3%89TRICA).pdf",
    "relativePath": "extras/Matemática/SEQUÊNCIAS (PROGRESSÃO ARITMÉTICA E PROGRESSÃO GEOMÉTRICA).pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-f6c0f4bb-343",
    "filename": "teoria-dos-conjuntos.pdf",
    "title": "teoria dos conjuntos",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/teoria-dos-conjuntos.pdf",
    "relativePath": "extras/Matemática/teoria-dos-conjuntos.pdf",
    "sizeFormatted": "5.9 MB"
  },
  {
    "id": "acervo-3ea0a833-344",
    "filename": "trigonometria (1).pdf",
    "title": "trigonometria (1)",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "trigonometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/trigonometria%20(1).pdf",
    "relativePath": "extras/Matemática/trigonometria (1).pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-a11fd86c-345",
    "filename": "TRIGONOMETRIA (2).pdf",
    "title": "TRIGONOMETRIA (2)",
    "discipline": "matematica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "trigonometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Matem%C3%A1tica/TRIGONOMETRIA%20(2).pdf",
    "relativePath": "extras/Matemática/TRIGONOMETRIA (2).pdf",
    "sizeFormatted": "2.6 MB"
  },
  {
    "id": "acervo-6bcc6d8d-346",
    "filename": "mdc-mmc-e-divisores-pdf.pdf",
    "title": "mdc mmc e divisores pdf",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/mdc-mmc-e-divisores-pdf.pdf",
    "relativePath": "extras/mdc-mmc-e-divisores-pdf.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-b6f651df-347",
    "filename": "MEGA AULÃO DE RADIOATIVIDADE.pdf",
    "title": "MEGA AULÃO DE RADIOATIVIDADE",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/MEGA%20AUL%C3%83O%20DE%20RADIOATIVIDADE.pdf",
    "relativePath": "extras/MEGA AULÃO DE RADIOATIVIDADE.pdf",
    "sizeFormatted": "3.0 MB"
  },
  {
    "id": "acervo-3d4127a8-348",
    "filename": "MONITORIA DE ELETRODINÂMICA.pdf",
    "title": "MONITORIA DE ELETRODINÂMICA",
    "discipline": "geral",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/MONITORIA%20DE%20ELETRODIN%C3%82MICA.pdf",
    "relativePath": "extras/MONITORIA DE ELETRODINÂMICA.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-79b678a2-349",
    "filename": "MONITORIA DE FUNÇÃO QUADRÁTICA.pdf",
    "title": "MONITORIA DE FUNÇÃO QUADRÁTICA",
    "discipline": "geral",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/MONITORIA%20DE%20FUN%C3%87%C3%83O%20QUADR%C3%81TICA.pdf",
    "relativePath": "extras/MONITORIA DE FUNÇÃO QUADRÁTICA.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-f4765589-350",
    "filename": "MONITORIA DE MATEMÁTICA FINANCEIRA.pdf",
    "title": "MONITORIA DE MATEMÁTICA FINANCEIRA",
    "discipline": "geral",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/MONITORIA%20DE%20MATEM%C3%81TICA%20FINANCEIRA.pdf",
    "relativePath": "extras/MONITORIA DE MATEMÁTICA FINANCEIRA.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-55c13e9d-351",
    "filename": "MONITORIA DE POLINÔMIOS.pdf",
    "title": "MONITORIA DE POLINÔMIOS",
    "discipline": "geral",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/MONITORIA%20DE%20POLIN%C3%94MIOS.pdf",
    "relativePath": "extras/MONITORIA DE POLINÔMIOS.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-0240abc4-352",
    "filename": "MONITORIA DE PORCENTAGEM.pdf",
    "title": "MONITORIA DE PORCENTAGEM",
    "discipline": "geral",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/MONITORIA%20DE%20PORCENTAGEM.pdf",
    "relativePath": "extras/MONITORIA DE PORCENTAGEM.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-4486a95b-353",
    "filename": "06-material-quimica-isomeria-plana-trad.pdf",
    "title": "06 material quimica isomeria plana trad",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "isomeria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/06-material-quimica-isomeria-plana-trad.pdf",
    "relativePath": "extras/Quimica/06-material-quimica-isomeria-plana-trad.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-7f1939e5-354",
    "filename": "acidos.pdf",
    "title": "acidos",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "acidos"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/acidos.pdf",
    "relativePath": "extras/Quimica/acidos.pdf",
    "sizeFormatted": "3.7 MB"
  },
  {
    "id": "acervo-55439c79-355",
    "filename": "anotacoes-1-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "title": "anotacoes 1 fatores de correcao e concentracao de solucoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "solucoes"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/anotacoes-1-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "relativePath": "extras/Quimica/anotacoes-1-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "sizeFormatted": "2.7 MB"
  },
  {
    "id": "acervo-a61ef160-356",
    "filename": "anotacoes-2-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "title": "anotacoes 2 fatores de correcao e concentracao de solucoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "solucoes"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/anotacoes-2-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "relativePath": "extras/Quimica/anotacoes-2-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "sizeFormatted": "3.3 MB"
  },
  {
    "id": "acervo-ef5f334a-357",
    "filename": "anotacoes-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "title": "anotacoes distribuicao eletronica e numeros quanticos parte 1",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "distribuicao eletronica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/anotacoes-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "relativePath": "extras/Quimica/anotacoes-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "sizeFormatted": "10.5 MB"
  },
  {
    "id": "acervo-30c931c7-358",
    "filename": "anotacoes-geometria-molecular-e-interacoes-intermoleculares-parte-01.pdf",
    "title": "anotacoes geometria molecular e interacoes intermoleculares parte 01",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "geometria molecular",
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/anotacoes-geometria-molecular-e-interacoes-intermoleculares-parte-01.pdf",
    "relativePath": "extras/Quimica/anotacoes-geometria-molecular-e-interacoes-intermoleculares-parte-01.pdf",
    "sizeFormatted": "10.5 MB"
  },
  {
    "id": "acervo-e6a1638f-359",
    "filename": "anotacoes-propriedades-periodicas-parte-01.pdf",
    "title": "anotacoes propriedades periodicas parte 01",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "propriedades periodicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/anotacoes-propriedades-periodicas-parte-01.pdf",
    "relativePath": "extras/Quimica/anotacoes-propriedades-periodicas-parte-01.pdf",
    "sizeFormatted": "15.7 MB"
  },
  {
    "id": "acervo-b3748d15-360",
    "filename": "anotacoes-quimica-inorganica-parte-2.pdf",
    "title": "anotacoes quimica inorganica parte 2",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/anotacoes-quimica-inorganica-parte-2.pdf",
    "relativePath": "extras/Quimica/anotacoes-quimica-inorganica-parte-2.pdf",
    "sizeFormatted": "3.1 MB"
  },
  {
    "id": "acervo-07c5ef76-361",
    "filename": "anotacoes-sais-e-oxidos.pdf",
    "title": "anotacoes sais e oxidos",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "sais",
      "oxidos"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/anotacoes-sais-e-oxidos.pdf",
    "relativePath": "extras/Quimica/anotacoes-sais-e-oxidos.pdf",
    "sizeFormatted": "4.8 MB"
  },
  {
    "id": "acervo-4ef0002d-362",
    "filename": "atomistica-distribuicao-eletronica-e-isoatomos.pdf",
    "title": "atomistica distribuicao eletronica e isoatomos",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "atomistica",
      "distribuicao eletronica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/atomistica-distribuicao-eletronica-e-isoatomos.pdf",
    "relativePath": "extras/Quimica/atomistica-distribuicao-eletronica-e-isoatomos.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-8d90542a-363",
    "filename": "aula-extra-super-lista-spoiler-da-prova-anotacoes.pdf",
    "title": "aula extra super lista spoiler da prova anotacoes",
    "discipline": "quimica",
    "category": "prova_oficial",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/aula-extra-super-lista-spoiler-da-prova-anotacoes.pdf",
    "relativePath": "extras/Quimica/aula-extra-super-lista-spoiler-da-prova-anotacoes.pdf",
    "sizeFormatted": "2.7 MB"
  },
  {
    "id": "acervo-c4e3d25e-364",
    "filename": "aula-extra-super-lista-spoiler-da-prova.pdf",
    "title": "aula extra super lista spoiler da prova",
    "discipline": "quimica",
    "category": "prova_oficial",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/aula-extra-super-lista-spoiler-da-prova.pdf",
    "relativePath": "extras/Quimica/aula-extra-super-lista-spoiler-da-prova.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-3945f3eb-365",
    "filename": "cinetica-quimica-anotacoes (1).pdf",
    "title": "cinetica quimica anotacoes (1)",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "cinetica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/cinetica-quimica-anotacoes%20(1).pdf",
    "relativePath": "extras/Quimica/cinetica-quimica-anotacoes (1).pdf",
    "sizeFormatted": "10.6 MB"
  },
  {
    "id": "acervo-338e52b9-366",
    "filename": "cinetica-quimica-anotacoes.pdf",
    "title": "cinetica quimica anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "cinetica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/cinetica-quimica-anotacoes.pdf",
    "relativePath": "extras/Quimica/cinetica-quimica-anotacoes.pdf",
    "sizeFormatted": "10.6 MB"
  },
  {
    "id": "acervo-a0a512c2-367",
    "filename": "CINÉTICA QUÍMICA.pdf",
    "title": "CINÉTICA QUÍMICA",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/CIN%C3%89TICA%20QU%C3%8DMICA.pdf",
    "relativePath": "extras/Quimica/CINÉTICA QUÍMICA.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-2d1192a5-368",
    "filename": "deslocamento-de-equilibrio-quimico-anotacoes.pdf",
    "title": "deslocamento de equilibrio quimico anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "equilibrio"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/deslocamento-de-equilibrio-quimico-anotacoes.pdf",
    "relativePath": "extras/Quimica/deslocamento-de-equilibrio-quimico-anotacoes.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-b7b8d978-369",
    "filename": "diluicao-e-mistura-de-solucoes.pdf",
    "title": "diluicao e mistura de solucoes",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "solucoes"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/diluicao-e-mistura-de-solucoes.pdf",
    "relativePath": "extras/Quimica/diluicao-e-mistura-de-solucoes.pdf",
    "sizeFormatted": "5.4 MB"
  },
  {
    "id": "acervo-2d5be2a9-370",
    "filename": "distribuicao-eletronica-e-isoatomos.pdf",
    "title": "distribuicao eletronica e isoatomos",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "distribuicao eletronica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/distribuicao-eletronica-e-isoatomos.pdf",
    "relativePath": "extras/Quimica/distribuicao-eletronica-e-isoatomos.pdf",
    "sizeFormatted": "9.6 MB"
  },
  {
    "id": "acervo-6c3e7bcb-371",
    "filename": "eletrolise (1).pdf",
    "title": "eletrolise (1)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "eletrolise"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/eletrolise%20(1).pdf",
    "relativePath": "extras/Quimica/eletrolise (1).pdf",
    "sizeFormatted": "6.9 MB"
  },
  {
    "id": "acervo-6e7509b5-372",
    "filename": "eletrolise-faraday.pdf",
    "title": "eletrolise faraday",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "eletrolise"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/eletrolise-faraday.pdf",
    "relativePath": "extras/Quimica/eletrolise-faraday.pdf",
    "sizeFormatted": "4.4 MB"
  },
  {
    "id": "acervo-eb91d704-373",
    "filename": "eletrolise.pdf",
    "title": "eletrolise",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "eletrolise"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/eletrolise.pdf",
    "relativePath": "extras/Quimica/eletrolise.pdf",
    "sizeFormatted": "6.9 MB"
  },
  {
    "id": "acervo-fc8973dc-374",
    "filename": "eletroquimica (1).pdf",
    "title": "eletroquimica (1)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "eletroquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/eletroquimica%20(1).pdf",
    "relativePath": "extras/Quimica/eletroquimica (1).pdf",
    "sizeFormatted": "11.9 MB"
  },
  {
    "id": "acervo-30c4b038-375",
    "filename": "eletroquimica (2).pdf",
    "title": "eletroquimica (2)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "eletroquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/eletroquimica%20(2).pdf",
    "relativePath": "extras/Quimica/eletroquimica (2).pdf",
    "sizeFormatted": "11.9 MB"
  },
  {
    "id": "acervo-b59136cb-376",
    "filename": "eletroquimica (3).pdf",
    "title": "eletroquimica (3)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "eletroquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/eletroquimica%20(3).pdf",
    "relativePath": "extras/Quimica/eletroquimica (3).pdf",
    "sizeFormatted": "11.9 MB"
  },
  {
    "id": "acervo-565dbd4a-377",
    "filename": "eletroquimica.pdf",
    "title": "eletroquimica",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "eletroquimica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/eletroquimica.pdf",
    "relativePath": "extras/Quimica/eletroquimica.pdf",
    "sizeFormatted": "11.9 MB"
  },
  {
    "id": "acervo-b38d3d81-378",
    "filename": "ELETROQUÍMICA E ELETRÓLISE.pdf",
    "title": "ELETROQUÍMICA E ELETRÓLISE",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ELETROQU%C3%8DMICA%20E%20ELETR%C3%93LISE.pdf",
    "relativePath": "extras/Quimica/ELETROQUÍMICA E ELETRÓLISE.pdf",
    "sizeFormatted": "4.0 MB"
  },
  {
    "id": "acervo-8be18ebf-379",
    "filename": "equilibrio-aquoso.pdf",
    "title": "equilibrio aquoso",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "equilibrio"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/equilibrio-aquoso.pdf",
    "relativePath": "extras/Quimica/equilibrio-aquoso.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-94c880db-380",
    "filename": "equilibrio-ionico-anotacoes.pdf",
    "title": "equilibrio ionico anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "equilibrio"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/equilibrio-ionico-anotacoes.pdf",
    "relativePath": "extras/Quimica/equilibrio-ionico-anotacoes.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-831c0050-381",
    "filename": "ESTEQUIOMETRIA COMPLETA - ANOTAÇÕES.pdf",
    "title": "ESTEQUIOMETRIA COMPLETA ANOTAÇÕES",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "estequiometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ESTEQUIOMETRIA%20COMPLETA%20-%20ANOTA%C3%87%C3%95ES.pdf",
    "relativePath": "extras/Quimica/ESTEQUIOMETRIA COMPLETA - ANOTAÇÕES.pdf",
    "sizeFormatted": "10.0 MB"
  },
  {
    "id": "acervo-d532c41d-382",
    "filename": "ESTEQUIOMETRIA E FATORES DE CORREÇÃO.pdf",
    "title": "ESTEQUIOMETRIA E FATORES DE CORREÇÃO",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "estequiometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ESTEQUIOMETRIA%20E%20FATORES%20DE%20CORRE%C3%87%C3%83O.pdf",
    "relativePath": "extras/Quimica/ESTEQUIOMETRIA E FATORES DE CORREÇÃO.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-b6e487af-383",
    "filename": "ESTUDO DAS SOLUÇÕES - PARTE 1.pdf",
    "title": "ESTUDO DAS SOLUÇÕES PARTE 1",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ESTUDO%20DAS%20SOLU%C3%87%C3%95ES%20-%20PARTE%201.pdf",
    "relativePath": "extras/Quimica/ESTUDO DAS SOLUÇÕES - PARTE 1.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-86fdc2a4-384",
    "filename": "ESTUDO DAS SOLUÇÕES - PARTE 2.pdf",
    "title": "ESTUDO DAS SOLUÇÕES PARTE 2",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ESTUDO%20DAS%20SOLU%C3%87%C3%95ES%20-%20PARTE%202.pdf",
    "relativePath": "extras/Quimica/ESTUDO DAS SOLUÇÕES - PARTE 2.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-6b8d486b-385",
    "filename": "exercicios-reacoes-de-oxidacao-e-esterificacao-anotac.pdf",
    "title": "exercicios reacoes de oxidacao e esterificacao anotac",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/exercicios-reacoes-de-oxidacao-e-esterificacao-anotac.pdf",
    "relativePath": "extras/Quimica/exercicios-reacoes-de-oxidacao-e-esterificacao-anotac.pdf",
    "sizeFormatted": "2.1 MB"
  },
  {
    "id": "acervo-4dfab719-386",
    "filename": "exercicios-reacoes-de-oxidacao-e-esterificacao.pdf",
    "title": "exercicios reacoes de oxidacao e esterificacao",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/exercicios-reacoes-de-oxidacao-e-esterificacao.pdf",
    "relativePath": "extras/Quimica/exercicios-reacoes-de-oxidacao-e-esterificacao.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-34e03ec6-387",
    "filename": "extra-super-revisao-quimica-organica-anotacoes.pdf",
    "title": "extra super revisao quimica organica anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/extra-super-revisao-quimica-organica-anotacoes.pdf",
    "relativePath": "extras/Quimica/extra-super-revisao-quimica-organica-anotacoes.pdf",
    "sizeFormatted": "4.7 MB"
  },
  {
    "id": "acervo-a9d676d9-388",
    "filename": "extra-super-revisao-quimica-organica.pdf",
    "title": "extra super revisao quimica organica",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/extra-super-revisao-quimica-organica.pdf",
    "relativePath": "extras/Quimica/extra-super-revisao-quimica-organica.pdf",
    "sizeFormatted": "2.5 MB"
  },
  {
    "id": "acervo-66c515c6-389",
    "filename": "GEOMETRIA MOLECULAR.pdf",
    "title": "GEOMETRIA MOLECULAR",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "geometria molecular",
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/GEOMETRIA%20MOLECULAR.pdf",
    "relativePath": "extras/Quimica/GEOMETRIA MOLECULAR.pdf",
    "sizeFormatted": "10.5 MB"
  },
  {
    "id": "acervo-b8cd13eb-390",
    "filename": "introducao-ao-equilibrio-quimico.pdf",
    "title": "introducao ao equilibrio quimico",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "equilibrio"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/introducao-ao-equilibrio-quimico.pdf",
    "relativePath": "extras/Quimica/introducao-ao-equilibrio-quimico.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-683c66ef-391",
    "filename": "ligacoes-quimicas-casos-de-ligacao-dativa-e-excecoes-do-octeto-parte-03.pdf",
    "title": "ligacoes quimicas casos de ligacao dativa e excecoes do octeto parte 03",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ligacoes quimicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ligacoes-quimicas-casos-de-ligacao-dativa-e-excecoes-do-octeto-parte-03.pdf",
    "relativePath": "extras/Quimica/ligacoes-quimicas-casos-de-ligacao-dativa-e-excecoes-do-octeto-parte-03.pdf",
    "sizeFormatted": "11.6 MB"
  },
  {
    "id": "acervo-5ce91a10-392",
    "filename": "ligacoes-quimicas-geometria-polaridade-e-forcas-intermoleculares.pdf",
    "title": "ligacoes quimicas geometria polaridade e forcas intermoleculares",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ligacoes quimicas",
      "geometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ligacoes-quimicas-geometria-polaridade-e-forcas-intermoleculares.pdf",
    "relativePath": "extras/Quimica/ligacoes-quimicas-geometria-polaridade-e-forcas-intermoleculares.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-92ac6f20-393",
    "filename": "ligacoes-quimicas-ligacao-covalente-parte-02.pdf",
    "title": "ligacoes quimicas ligacao covalente parte 02",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ligacoes quimicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ligacoes-quimicas-ligacao-covalente-parte-02.pdf",
    "relativePath": "extras/Quimica/ligacoes-quimicas-ligacao-covalente-parte-02.pdf",
    "sizeFormatted": "11.6 MB"
  },
  {
    "id": "acervo-8bea1777-394",
    "filename": "ligacoes-quimicas-ligacao-ionica-parte-01.pdf",
    "title": "ligacoes quimicas ligacao ionica parte 01",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ligacoes quimicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ligacoes-quimicas-ligacao-ionica-parte-01.pdf",
    "relativePath": "extras/Quimica/ligacoes-quimicas-ligacao-ionica-parte-01.pdf",
    "sizeFormatted": "4.6 MB"
  },
  {
    "id": "acervo-ba0552c8-395",
    "filename": "ligacoes-quimicas-ligacao-metalica-parte-04.pdf",
    "title": "ligacoes quimicas ligacao metalica parte 04",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ligacoes quimicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/ligacoes-quimicas-ligacao-metalica-parte-04.pdf",
    "relativePath": "extras/Quimica/ligacoes-quimicas-ligacao-metalica-parte-04.pdf",
    "sizeFormatted": "2.0 MB"
  },
  {
    "id": "acervo-153c29f0-396",
    "filename": "lista-01-quimica-atomistica.pdf",
    "title": "lista 01 quimica atomistica",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "atomistica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-01-quimica-atomistica.pdf",
    "relativePath": "extras/Quimica/lista-01-quimica-atomistica.pdf",
    "sizeFormatted": "7.6 MB"
  },
  {
    "id": "acervo-e1ecf904-397",
    "filename": "lista-02-propriedades-periodicas-parte-01.pdf",
    "title": "lista 02 propriedades periodicas parte 01",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "propriedades periodicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-02-propriedades-periodicas-parte-01.pdf",
    "relativePath": "extras/Quimica/lista-02-propriedades-periodicas-parte-01.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-89851614-398",
    "filename": "lista-com-anotacoes-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "title": "lista com anotacoes distribuicao eletronica e numeros quanticos parte 1",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "distribuicao eletronica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-com-anotacoes-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "relativePath": "extras/Quimica/lista-com-anotacoes-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "sizeFormatted": "4.4 MB"
  },
  {
    "id": "acervo-5e5cc5d9-399",
    "filename": "lista-de-estequiometria-parte-1-turma-tradicionais-2025.pdf",
    "title": "lista de estequiometria parte 1 turma tradicionais 2025",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "year": 2025,
    "topics": [
      "estequiometria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-de-estequiometria-parte-1-turma-tradicionais-2025.pdf",
    "relativePath": "extras/Quimica/lista-de-estequiometria-parte-1-turma-tradicionais-2025.pdf",
    "sizeFormatted": "3.0 MB"
  },
  {
    "id": "acervo-88e8a340-400",
    "filename": "lista-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "title": "lista distribuicao eletronica e numeros quanticos parte 1",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "distribuicao eletronica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "relativePath": "extras/Quimica/lista-distribuicao-eletronica-e-numeros-quanticos-parte-1.pdf",
    "sizeFormatted": "1.7 MB"
  },
  {
    "id": "acervo-c51225dc-401",
    "filename": "lista-estudo-das-concentracoes.pdf",
    "title": "lista estudo das concentracoes",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-estudo-das-concentracoes.pdf",
    "relativePath": "extras/Quimica/lista-estudo-das-concentracoes.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-77a7c5aa-402",
    "filename": "lista-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "title": "lista fatores de correcao e concentracao de solucoes",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "solucoes"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "relativePath": "extras/Quimica/lista-fatores-de-correcao-e-concentracao-de-solucoes.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-eae8292c-403",
    "filename": "lista-ligacoes-quimicas-parte-01.pdf",
    "title": "lista ligacoes quimicas parte 01",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ligacoes quimicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-ligacoes-quimicas-parte-01.pdf",
    "relativePath": "extras/Quimica/lista-ligacoes-quimicas-parte-01.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-ab65cfa6-404",
    "filename": "lista-ligacoes-quimicas-parte-02.pdf",
    "title": "lista ligacoes quimicas parte 02",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "ligacoes quimicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-ligacoes-quimicas-parte-02.pdf",
    "relativePath": "extras/Quimica/lista-ligacoes-quimicas-parte-02.pdf",
    "sizeFormatted": "3.9 MB"
  },
  {
    "id": "acervo-7b25cdf4-405",
    "filename": "lista-propriedades-periodicas-parte-01.pdf",
    "title": "lista propriedades periodicas parte 01",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "propriedades periodicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-propriedades-periodicas-parte-01.pdf",
    "relativePath": "extras/Quimica/lista-propriedades-periodicas-parte-01.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-76a2ab3b-406",
    "filename": "lista-quimica-inorganica.pdf",
    "title": "lista quimica inorganica",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/lista-quimica-inorganica.pdf",
    "relativePath": "extras/Quimica/lista-quimica-inorganica.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-d5e07fc6-407",
    "filename": "material-quimica-funcoes-organicas-anotacoes (1).pdf",
    "title": "material quimica funcoes organicas anotacoes (1)",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-funcoes-organicas-anotacoes%20(1).pdf",
    "relativePath": "extras/Quimica/material-quimica-funcoes-organicas-anotacoes (1).pdf",
    "sizeFormatted": "3.1 MB"
  },
  {
    "id": "acervo-d573d04f-408",
    "filename": "material-quimica-funcoes-organicas-anotacoes.pdf",
    "title": "material quimica funcoes organicas anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-funcoes-organicas-anotacoes.pdf",
    "relativePath": "extras/Quimica/material-quimica-funcoes-organicas-anotacoes.pdf",
    "sizeFormatted": "3.1 MB"
  },
  {
    "id": "acervo-a77c6fa2-409",
    "filename": "material-quimica-funcoes-organicas.pdf",
    "title": "material quimica funcoes organicas",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-funcoes-organicas.pdf",
    "relativePath": "extras/Quimica/material-quimica-funcoes-organicas.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-dd89a993-410",
    "filename": "material-quimica-hidrocarbonetos-trad.pdf",
    "title": "material quimica hidrocarbonetos trad",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-hidrocarbonetos-trad.pdf",
    "relativePath": "extras/Quimica/material-quimica-hidrocarbonetos-trad.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-8253d81d-411",
    "filename": "material-quimica-isomeria-espacial (1).pdf",
    "title": "material quimica isomeria espacial (1)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "isomeria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-isomeria-espacial%20(1).pdf",
    "relativePath": "extras/Quimica/material-quimica-isomeria-espacial (1).pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-37bddb50-412",
    "filename": "material-quimica-isomeria-espacial.pdf",
    "title": "material quimica isomeria espacial",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "isomeria"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-isomeria-espacial.pdf",
    "relativePath": "extras/Quimica/material-quimica-isomeria-espacial.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-45601e56-413",
    "filename": "material-quimica-propriedades-trad.pdf",
    "title": "material quimica propriedades trad",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-propriedades-trad.pdf",
    "relativePath": "extras/Quimica/material-quimica-propriedades-trad.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-e0edc070-414",
    "filename": "material-quimica-reacao-de-adicao-trad.pdf",
    "title": "material quimica reacao de adicao trad",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-reacao-de-adicao-trad.pdf",
    "relativePath": "extras/Quimica/material-quimica-reacao-de-adicao-trad.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-9be6cc8e-415",
    "filename": "material-quimica-reacao-de-eliminacao-trad.pdf",
    "title": "material quimica reacao de eliminacao trad",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-reacao-de-eliminacao-trad.pdf",
    "relativePath": "extras/Quimica/material-quimica-reacao-de-eliminacao-trad.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-ae06a577-416",
    "filename": "material-quimica-reacao-de-substituicao.pdf",
    "title": "material quimica reacao de substituicao",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/material-quimica-reacao-de-substituicao.pdf",
    "relativePath": "extras/Quimica/material-quimica-reacao-de-substituicao.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-82708c15-417",
    "filename": "mistura-de-solucoes-que-nao-reagem.pdf",
    "title": "mistura de solucoes que nao reagem",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "solucoes"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/mistura-de-solucoes-que-nao-reagem.pdf",
    "relativePath": "extras/Quimica/mistura-de-solucoes-que-nao-reagem.pdf",
    "sizeFormatted": "2.4 MB"
  },
  {
    "id": "acervo-d92bb192-418",
    "filename": "mistura-de-solucoes-que-reagem.pdf",
    "title": "mistura de solucoes que reagem",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "solucoes"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/mistura-de-solucoes-que-reagem.pdf",
    "relativePath": "extras/Quimica/mistura-de-solucoes-que-reagem.pdf",
    "sizeFormatted": "5.1 MB"
  },
  {
    "id": "acervo-be9fa8d6-419",
    "filename": "polimeros-e-macromoleculas-parte-01.pdf",
    "title": "polimeros e macromoleculas parte 01",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/polimeros-e-macromoleculas-parte-01.pdf",
    "relativePath": "extras/Quimica/polimeros-e-macromoleculas-parte-01.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-953e3b6d-420",
    "filename": "polimeros-e-macromoleculas-parte-02.pdf",
    "title": "polimeros e macromoleculas parte 02",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/polimeros-e-macromoleculas-parte-02.pdf",
    "relativePath": "extras/Quimica/polimeros-e-macromoleculas-parte-02.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-4d3a3152-421",
    "filename": "polimeros-e-macromoleculas-parte-03.pdf",
    "title": "polimeros e macromoleculas parte 03",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/polimeros-e-macromoleculas-parte-03.pdf",
    "relativePath": "extras/Quimica/polimeros-e-macromoleculas-parte-03.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-fbd6ffad-422",
    "filename": "quimica-inorganica-e-reacoes (1).pdf",
    "title": "quimica inorganica e reacoes (1)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/quimica-inorganica-e-reacoes%20(1).pdf",
    "relativePath": "extras/Quimica/quimica-inorganica-e-reacoes (1).pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-410fbd4d-423",
    "filename": "QUÍMICA ORGÂNICA - PARTE 1 (1).pdf",
    "title": "QUÍMICA ORGÂNICA PARTE 1 (1)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/QU%C3%8DMICA%20ORG%C3%82NICA%20-%20PARTE%201%20(1).pdf",
    "relativePath": "extras/Quimica/QUÍMICA ORGÂNICA - PARTE 1 (1).pdf",
    "sizeFormatted": "4.4 MB"
  },
  {
    "id": "acervo-d020b169-424",
    "filename": "QUÍMICA ORGÂNICA - PARTE 2.pdf",
    "title": "QUÍMICA ORGÂNICA PARTE 2",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/QU%C3%8DMICA%20ORG%C3%82NICA%20-%20PARTE%202.pdf",
    "relativePath": "extras/Quimica/QUÍMICA ORGÂNICA - PARTE 2.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-870eb5dc-425",
    "filename": "QUÍMICA ORGÂNICA - PARTE 3.pdf",
    "title": "QUÍMICA ORGÂNICA PARTE 3",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/QU%C3%8DMICA%20ORG%C3%82NICA%20-%20PARTE%203.pdf",
    "relativePath": "extras/Quimica/QUÍMICA ORGÂNICA - PARTE 3.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-e581d4f7-426",
    "filename": "reacoes-de-adicao.pdf",
    "title": "reacoes de adicao",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/reacoes-de-adicao.pdf",
    "relativePath": "extras/Quimica/reacoes-de-adicao.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-0586bba5-427",
    "filename": "reacoes-de-oxidacao-e-esterificacao-parte-01-anotacoes.pdf",
    "title": "reacoes de oxidacao e esterificacao parte 01 anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/reacoes-de-oxidacao-e-esterificacao-parte-01-anotacoes.pdf",
    "relativePath": "extras/Quimica/reacoes-de-oxidacao-e-esterificacao-parte-01-anotacoes.pdf",
    "sizeFormatted": "2.1 MB"
  },
  {
    "id": "acervo-e3fc353f-428",
    "filename": "reacoes-de-oxidacao-e-esterificacao-parte-01.pdf",
    "title": "reacoes de oxidacao e esterificacao parte 01",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/reacoes-de-oxidacao-e-esterificacao-parte-01.pdf",
    "relativePath": "extras/Quimica/reacoes-de-oxidacao-e-esterificacao-parte-01.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-a6621ce3-429",
    "filename": "reacoes-de-substituicao.pdf",
    "title": "reacoes de substituicao",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/reacoes-de-substituicao.pdf",
    "relativePath": "extras/Quimica/reacoes-de-substituicao.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-44de7e9f-430",
    "filename": "reacoes-inorganicas-e-estequiometria.pdf",
    "title": "reacoes inorganicas e estequiometria",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "estequiometria",
      "organica"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/reacoes-inorganicas-e-estequiometria.pdf",
    "relativePath": "extras/Quimica/reacoes-inorganicas-e-estequiometria.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-c77c25a5-431",
    "filename": "RESOLUÇÃO DE EXERCÍCIOS DE FÍSICO-QUÍMICA - ANOTAÇÕES.pdf",
    "title": "RESOLUÇÃO DE EXERCÍCIOS DE FÍSICO QUÍMICA ANOTAÇÕES",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/RESOLU%C3%87%C3%83O%20DE%20EXERC%C3%8DCIOS%20DE%20F%C3%8DSICO-QU%C3%8DMICA%20-%20ANOTA%C3%87%C3%95ES.pdf",
    "relativePath": "extras/Quimica/RESOLUÇÃO DE EXERCÍCIOS DE FÍSICO-QUÍMICA - ANOTAÇÕES.pdf",
    "sizeFormatted": "1.7 MB"
  },
  {
    "id": "acervo-fdaabab2-432",
    "filename": "RESOLUÇÃO DE EXERCÍCIOS DE FÍSICO-QUÍMICA.pdf",
    "title": "RESOLUÇÃO DE EXERCÍCIOS DE FÍSICO QUÍMICA",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/RESOLU%C3%87%C3%83O%20DE%20EXERC%C3%8DCIOS%20DE%20F%C3%8DSICO-QU%C3%8DMICA.pdf",
    "relativePath": "extras/Quimica/RESOLUÇÃO DE EXERCÍCIOS DE FÍSICO-QUÍMICA.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-e1868323-433",
    "filename": "Resumo geral sobre todas as aulas.txt",
    "title": "Resumo geral sobre todas as aulas",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/Resumo%20geral%20sobre%20todas%20as%20aulas.txt",
    "relativePath": "extras/Quimica/Resumo geral sobre todas as aulas.txt",
    "sizeFormatted": "0.0 MB"
  },
  {
    "id": "acervo-3f45c03c-434",
    "filename": "revisao-unirg-anotacoes.pdf",
    "title": "revisao unirg anotacoes",
    "discipline": "quimica",
    "category": "anotacoes_teoria",
    "banca": "UNIRG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/revisao-unirg-anotacoes.pdf",
    "relativePath": "extras/Quimica/revisao-unirg-anotacoes.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-99b58d55-435",
    "filename": "revisao-unirg.pdf",
    "title": "revisao unirg",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "UNIRG",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/revisao-unirg.pdf",
    "relativePath": "extras/Quimica/revisao-unirg.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-49be2d1d-436",
    "filename": "REVISÃO QUÍMICA ORGÂNICA - ANOTAÇÕES (1).pdf",
    "title": "REVISÃO QUÍMICA ORGÂNICA ANOTAÇÕES (1)",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/REVIS%C3%83O%20QU%C3%8DMICA%20ORG%C3%82NICA%20-%20ANOTA%C3%87%C3%95ES%20(1).pdf",
    "relativePath": "extras/Quimica/REVISÃO QUÍMICA ORGÂNICA - ANOTAÇÕES (1).pdf",
    "sizeFormatted": "18.3 MB"
  },
  {
    "id": "acervo-10cdec07-437",
    "filename": "REVISÃO QUÍMICA ORGÂNICA - ANOTAÇÕES.pdf",
    "title": "REVISÃO QUÍMICA ORGÂNICA ANOTAÇÕES",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/REVIS%C3%83O%20QU%C3%8DMICA%20ORG%C3%82NICA%20-%20ANOTA%C3%87%C3%95ES.pdf",
    "relativePath": "extras/Quimica/REVISÃO QUÍMICA ORGÂNICA - ANOTAÇÕES.pdf",
    "sizeFormatted": "18.3 MB"
  },
  {
    "id": "acervo-4673f45b-438",
    "filename": "REVISÃO QUÍMICA ORGÂNICA.pdf",
    "title": "REVISÃO QUÍMICA ORGÂNICA",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/REVIS%C3%83O%20QU%C3%8DMICA%20ORG%C3%82NICA.pdf",
    "relativePath": "extras/Quimica/REVISÃO QUÍMICA ORGÂNICA.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-140ef81b-439",
    "filename": "tabela-periodica-e-propriedades-periodicas.pdf",
    "title": "tabela periodica e propriedades periodicas",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [
      "propriedades periodicas"
    ],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/tabela-periodica-e-propriedades-periodicas.pdf",
    "relativePath": "extras/Quimica/tabela-periodica-e-propriedades-periodicas.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-87bab1bc-440",
    "filename": "TERMOQUÍMICA.pdf",
    "title": "TERMOQUÍMICA",
    "discipline": "quimica",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/Quimica/TERMOQU%C3%8DMICA.pdf",
    "relativePath": "extras/Quimica/TERMOQUÍMICA.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-f9059ea8-441",
    "filename": "quimica-bloquinho-da-quimica.pdf",
    "title": "quimica bloquinho da quimica",
    "discipline": "quimica",
    "category": "aulao",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/quimica-bloquinho-da-quimica.pdf",
    "relativePath": "extras/quimica-bloquinho-da-quimica.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-4ecf9d3d-442",
    "filename": "revisao-mentoria-1.pdf",
    "title": "revisao mentoria 1",
    "discipline": "geral",
    "category": "caderno_exercicios",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/extras/revisao-mentoria-1.pdf",
    "relativePath": "extras/revisao-mentoria-1.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-9818c695-443",
    "filename": "Einstein_Medicina_2023_Gabarito_Comentado_Objetiva.pdf",
    "title": "Einstein Medicina 2023 Gabarito Comentado Objetiva",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Albert Einstein",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20Albert%20Einstein%20-%20Medicina/2023/Einstein_Medicina_2023_Gabarito_Comentado_Objetiva.pdf",
    "relativePath": "Provas Albert Einstein - Medicina/2023/Einstein_Medicina_2023_Gabarito_Comentado_Objetiva.pdf",
    "sizeFormatted": "6.5 MB"
  },
  {
    "id": "acervo-00c36b1c-444",
    "filename": "Einstein_Medicina_2023_Prova_Objetiva.pdf",
    "title": "Einstein Medicina 2023 Prova Objetiva",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Albert Einstein",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20Albert%20Einstein%20-%20Medicina/2023/Einstein_Medicina_2023_Prova_Objetiva.pdf",
    "relativePath": "Provas Albert Einstein - Medicina/2023/Einstein_Medicina_2023_Prova_Objetiva.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-59a34db0-445",
    "filename": "Einstein_Medicina_2024_Gabarito_Comentado_Objetiva.pdf",
    "title": "Einstein Medicina 2024 Gabarito Comentado Objetiva",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Albert Einstein",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20Albert%20Einstein%20-%20Medicina/2024/Einstein_Medicina_2024_Gabarito_Comentado_Objetiva.pdf",
    "relativePath": "Provas Albert Einstein - Medicina/2024/Einstein_Medicina_2024_Gabarito_Comentado_Objetiva.pdf",
    "sizeFormatted": "6.4 MB"
  },
  {
    "id": "acervo-1006efe8-446",
    "filename": "Einstein_Medicina_2024_Prova_Objetiva.pdf",
    "title": "Einstein Medicina 2024 Prova Objetiva",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Albert Einstein",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20Albert%20Einstein%20-%20Medicina/2024/Einstein_Medicina_2024_Prova_Objetiva.pdf",
    "relativePath": "Provas Albert Einstein - Medicina/2024/Einstein_Medicina_2024_Prova_Objetiva.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-6b085254-447",
    "filename": "enem-2018-prova-dia-1.pdf",
    "title": "enem 2018 prova dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2018,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2018/enem-2018-prova-dia-1.pdf",
    "relativePath": "Provas ENEM/2018/enem-2018-prova-dia-1.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-5df51089-448",
    "filename": "enem-2018-prova-dia-2.pdf",
    "title": "enem 2018 prova dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2018,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2018/enem-2018-prova-dia-2.pdf",
    "relativePath": "Provas ENEM/2018/enem-2018-prova-dia-2.pdf",
    "sizeFormatted": "3.2 MB"
  },
  {
    "id": "acervo-a27cdf1b-449",
    "filename": "enem-2019-prova-dia-1.pdf",
    "title": "enem 2019 prova dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2019,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2019/enem-2019-prova-dia-1.pdf",
    "relativePath": "Provas ENEM/2019/enem-2019-prova-dia-1.pdf",
    "sizeFormatted": "4.0 MB"
  },
  {
    "id": "acervo-a53adbd8-450",
    "filename": "enem-2019-prova-dia-2.pdf",
    "title": "enem 2019 prova dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2019,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2019/enem-2019-prova-dia-2.pdf",
    "relativePath": "Provas ENEM/2019/enem-2019-prova-dia-2.pdf",
    "sizeFormatted": "4.7 MB"
  },
  {
    "id": "acervo-1d81ccea-451",
    "filename": "enem-2020-prova-dia-1.pdf",
    "title": "enem 2020 prova dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2020,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2020/enem-2020-prova-dia-1.pdf",
    "relativePath": "Provas ENEM/2020/enem-2020-prova-dia-1.pdf",
    "sizeFormatted": "2.7 MB"
  },
  {
    "id": "acervo-7b4b4231-452",
    "filename": "enem-2020-prova-dia-2.pdf",
    "title": "enem 2020 prova dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2020,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2020/enem-2020-prova-dia-2.pdf",
    "relativePath": "Provas ENEM/2020/enem-2020-prova-dia-2.pdf",
    "sizeFormatted": "3.3 MB"
  },
  {
    "id": "acervo-16b40846-453",
    "filename": "enem-2021-prova-dia-1.pdf",
    "title": "enem 2021 prova dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2021,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2021/enem-2021-prova-dia-1.pdf",
    "relativePath": "Provas ENEM/2021/enem-2021-prova-dia-1.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-d4046a1d-454",
    "filename": "enem-2021-prova-dia-2.pdf",
    "title": "enem 2021 prova dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2021,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2021/enem-2021-prova-dia-2.pdf",
    "relativePath": "Provas ENEM/2021/enem-2021-prova-dia-2.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-f6e2ad84-455",
    "filename": "enem-2022-prova-dia-1.pdf",
    "title": "enem 2022 prova dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2022,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2022/enem-2022-prova-dia-1.pdf",
    "relativePath": "Provas ENEM/2022/enem-2022-prova-dia-1.pdf",
    "sizeFormatted": "7.6 MB"
  },
  {
    "id": "acervo-dcb9bf9e-456",
    "filename": "enem-2022-prova-dia-2.pdf",
    "title": "enem 2022 prova dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2022,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2022/enem-2022-prova-dia-2.pdf",
    "relativePath": "Provas ENEM/2022/enem-2022-prova-dia-2.pdf",
    "sizeFormatted": "5.5 MB"
  },
  {
    "id": "acervo-bcea6e39-457",
    "filename": "enem-2023-prova-dia-1.pdf",
    "title": "enem 2023 prova dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2023/enem-2023-prova-dia-1.pdf",
    "relativePath": "Provas ENEM/2023/enem-2023-prova-dia-1.pdf",
    "sizeFormatted": "4.6 MB"
  },
  {
    "id": "acervo-1d8dcbd2-458",
    "filename": "enem-2023-prova-dia-2.pdf",
    "title": "enem 2023 prova dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2023/enem-2023-prova-dia-2.pdf",
    "relativePath": "Provas ENEM/2023/enem-2023-prova-dia-2.pdf",
    "sizeFormatted": "3.3 MB"
  },
  {
    "id": "acervo-93d1b95c-459",
    "filename": "enem-2024-prova-dia-1.pdf",
    "title": "enem 2024 prova dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2024/enem-2024-prova-dia-1.pdf",
    "relativePath": "Provas ENEM/2024/enem-2024-prova-dia-1.pdf",
    "sizeFormatted": "3.4 MB"
  },
  {
    "id": "acervo-5501cb75-460",
    "filename": "enem-2024-prova-dia-2.pdf",
    "title": "enem 2024 prova dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "ENEM",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20ENEM/2024/enem-2024-prova-dia-2.pdf",
    "relativePath": "Provas ENEM/2024/enem-2024-prova-dia-2.pdf",
    "sizeFormatted": "4.7 MB"
  },
  {
    "id": "acervo-cb066be7-461",
    "filename": "uece-2024-1-1fase-geral.pdf",
    "title": "uece 2024 1 1fase geral",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UECE",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UECE/2024.1/uece-2024-1-1fase-geral.pdf",
    "relativePath": "Provas UECE/2024.1/uece-2024-1-1fase-geral.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-4e7326ae-462",
    "filename": "uece-2024-1-2fase-biologia-med.pdf",
    "title": "uece 2024 1 2fase biologia med",
    "discipline": "biologia",
    "category": "prova_oficial",
    "banca": "UECE",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UECE/2024.1/uece-2024-1-2fase-biologia-med.pdf",
    "relativePath": "Provas UECE/2024.1/uece-2024-1-2fase-biologia-med.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-8fad46ec-463",
    "filename": "uece-2024-1-2fase-portugues.pdf",
    "title": "uece 2024 1 2fase portugues",
    "discipline": "linguagens",
    "category": "prova_oficial",
    "banca": "UECE",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UECE/2024.1/uece-2024-1-2fase-portugues.pdf",
    "relativePath": "Provas UECE/2024.1/uece-2024-1-2fase-portugues.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-d60a8fb2-464",
    "filename": "uece-2024-2-1fase-geral.pdf",
    "title": "uece 2024 2 1fase geral",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UECE",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UECE/2024.2/uece-2024-2-1fase-geral.pdf",
    "relativePath": "Provas UECE/2024.2/uece-2024-2-1fase-geral.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-10adb829-465",
    "filename": "uece-2025-1-2fase-biologia-med.pdf",
    "title": "uece 2025 1 2fase biologia med",
    "discipline": "biologia",
    "category": "prova_oficial",
    "banca": "UECE",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UECE/2025.1/uece-2025-1-2fase-biologia-med.pdf",
    "relativePath": "Provas UECE/2025.1/uece-2025-1-2fase-biologia-med.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-da1c01dc-466",
    "filename": "uece-2025-1-2fase-portugues.pdf",
    "title": "uece 2025 1 2fase portugues",
    "discipline": "linguagens",
    "category": "prova_oficial",
    "banca": "UECE",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UECE/2025.1/uece-2025-1-2fase-portugues.pdf",
    "relativePath": "Provas UECE/2025.1/uece-2025-1-2fase-portugues.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-078895e4-467",
    "filename": "uece-2025-2-1fase-geral.pdf",
    "title": "uece 2025 2 1fase geral",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UECE",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UECE/2025.2/uece-2025-2-1fase-geral.pdf",
    "relativePath": "Provas UECE/2025.2/uece-2025-2-1fase-geral.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-bc11bee6-468",
    "filename": "ueg-2020-prova-2020-1-med.pdf",
    "title": "ueg 2020 prova 2020 1 med",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEG",
    "year": 2020,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEG/2020/ueg-2020-prova-2020-1-med.pdf",
    "relativePath": "Provas UEG/2020/ueg-2020-prova-2020-1-med.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-427ce29e-469",
    "filename": "ueg-2024-prova-2024-2-med.pdf",
    "title": "ueg 2024 prova 2024 2 med",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEG",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEG/2024/ueg-2024-prova-2024-2-med.pdf",
    "relativePath": "Provas UEG/2024/ueg-2024-prova-2024-2-med.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-93e4236f-470",
    "filename": "ueg-2025-prova-2025-2-med.pdf",
    "title": "ueg 2025 prova 2025 2 med",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEG",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEG/2025/ueg-2025-prova-2025-2-med.pdf",
    "relativePath": "Provas UEG/2025/ueg-2025-prova-2025-2-med.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-38eb4b45-471",
    "filename": "ueg-2026-prova-2026-1-med.pdf",
    "title": "ueg 2026 prova 2026 1 med",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEG",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEG/2026/ueg-2026-prova-2026-1-med.pdf",
    "relativePath": "Provas UEG/2026/ueg-2026-prova-2026-1-med.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-7dcc43b8-472",
    "filename": "uema-2022-prova-paes.pdf",
    "title": "uema 2022 prova paes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEMA",
    "year": 2022,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEMA/2022/uema-2022-prova-paes.pdf",
    "relativePath": "Provas UEMA/2022/uema-2022-prova-paes.pdf",
    "sizeFormatted": "2.1 MB"
  },
  {
    "id": "acervo-5a4a49af-473",
    "filename": "uema-2023-prova-paes.pdf",
    "title": "uema 2023 prova paes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEMA",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEMA/2023/uema-2023-prova-paes.pdf",
    "relativePath": "Provas UEMA/2023/uema-2023-prova-paes.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-1acf43ba-474",
    "filename": "uema-2024-prova-paes.pdf",
    "title": "uema 2024 prova paes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEMA",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEMA/2024/uema-2024-prova-paes.pdf",
    "relativePath": "Provas UEMA/2024/uema-2024-prova-paes.pdf",
    "sizeFormatted": "2.0 MB"
  },
  {
    "id": "acervo-ff4e9c2d-475",
    "filename": "uema-2025-prova-paes.pdf",
    "title": "uema 2025 prova paes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UEMA",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UEMA/2025/uema-2025-prova-paes.pdf",
    "relativePath": "Provas UEMA/2025/uema-2025-prova-paes.pdf",
    "sizeFormatted": "2.0 MB"
  },
  {
    "id": "acervo-f1681caf-476",
    "filename": "UERJ_2024_1_EQ_Caderno_de_Questoes.pdf",
    "title": "UERJ 2024 1 EQ Caderno de Questoes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UERJ",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2024/1o%20Exame%20de%20Qualificacao/UERJ_2024_1_EQ_Caderno_de_Questoes.pdf",
    "relativePath": "Provas UERJ/2024/1o Exame de Qualificacao/UERJ_2024_1_EQ_Caderno_de_Questoes.pdf",
    "sizeFormatted": "0.2 MB"
  },
  {
    "id": "acervo-84bd64ad-477",
    "filename": "UERJ_2024_1_EQ_Gabarito.pdf",
    "title": "UERJ 2024 1 EQ Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UERJ",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2024/1o%20Exame%20de%20Qualificacao/UERJ_2024_1_EQ_Gabarito.pdf",
    "relativePath": "Provas UERJ/2024/1o Exame de Qualificacao/UERJ_2024_1_EQ_Gabarito.pdf",
    "sizeFormatted": "0.3 MB"
  },
  {
    "id": "acervo-298ed049-478",
    "filename": "UERJ_2024_2_EQ_Caderno_de_Questoes.pdf",
    "title": "UERJ 2024 2 EQ Caderno de Questoes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UERJ",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2024/2o%20Exame%20de%20Qualificacao/UERJ_2024_2_EQ_Caderno_de_Questoes.pdf",
    "relativePath": "Provas UERJ/2024/2o Exame de Qualificacao/UERJ_2024_2_EQ_Caderno_de_Questoes.pdf",
    "sizeFormatted": "0.2 MB"
  },
  {
    "id": "acervo-74e516f4-479",
    "filename": "UERJ_2024_2_EQ_Gabarito.pdf",
    "title": "UERJ 2024 2 EQ Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UERJ",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2024/2o%20Exame%20de%20Qualificacao/UERJ_2024_2_EQ_Gabarito.pdf",
    "relativePath": "Provas UERJ/2024/2o Exame de Qualificacao/UERJ_2024_2_EQ_Gabarito.pdf",
    "sizeFormatted": "0.3 MB"
  },
  {
    "id": "acervo-be73059d-480",
    "filename": "UERJ_2025_1_EQ_Caderno_de_Questoes.pdf",
    "title": "UERJ 2025 1 EQ Caderno de Questoes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UERJ",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2025/1o%20Exame%20de%20Qualificacao/UERJ_2025_1_EQ_Caderno_de_Questoes.pdf",
    "relativePath": "Provas UERJ/2025/1o Exame de Qualificacao/UERJ_2025_1_EQ_Caderno_de_Questoes.pdf",
    "sizeFormatted": "0.2 MB"
  },
  {
    "id": "acervo-51be4a2c-481",
    "filename": "UERJ_2025_1_EQ_Gabarito.pdf",
    "title": "UERJ 2025 1 EQ Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UERJ",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2025/1o%20Exame%20de%20Qualificacao/UERJ_2025_1_EQ_Gabarito.pdf",
    "relativePath": "Provas UERJ/2025/1o Exame de Qualificacao/UERJ_2025_1_EQ_Gabarito.pdf",
    "sizeFormatted": "0.3 MB"
  },
  {
    "id": "acervo-d5455eee-482",
    "filename": "UERJ_2025_2_EQ_Caderno_de_Questoes.pdf",
    "title": "UERJ 2025 2 EQ Caderno de Questoes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UERJ",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2025/2o%20Exame%20de%20Qualificacao/UERJ_2025_2_EQ_Caderno_de_Questoes.pdf",
    "relativePath": "Provas UERJ/2025/2o Exame de Qualificacao/UERJ_2025_2_EQ_Caderno_de_Questoes.pdf",
    "sizeFormatted": "0.3 MB"
  },
  {
    "id": "acervo-586a3c26-483",
    "filename": "UERJ_2025_2_EQ_Gabarito.pdf",
    "title": "UERJ 2025 2 EQ Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UERJ",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UERJ/2025/2o%20Exame%20de%20Qualificacao/UERJ_2025_2_EQ_Gabarito.pdf",
    "relativePath": "Provas UERJ/2025/2o Exame de Qualificacao/UERJ_2025_2_EQ_Gabarito.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-6ebc72ea-484",
    "filename": "ufg-2010-prova-2010-1-1-etapa.pdf",
    "title": "ufg 2010 prova 2010 1 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2010,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2010/2010.1/ufg-2010-prova-2010-1-1-etapa.pdf",
    "relativePath": "Provas UFG/2010/2010.1/ufg-2010-prova-2010-1-1-etapa.pdf",
    "sizeFormatted": "2.4 MB"
  },
  {
    "id": "acervo-d883cd38-485",
    "filename": "ufg-2010-prova-2010-1-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2010 prova 2010 1 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2010,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2010/2010.1/ufg-2010-prova-2010-1-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2010/2010.1/ufg-2010-prova-2010-1-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-291a0c56-486",
    "filename": "ufg-2010-prova-2010-1-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2010 prova 2010 1 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2010,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2010/2010.1/ufg-2010-prova-2010-1-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2010/2010.1/ufg-2010-prova-2010-1-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "2.5 MB"
  },
  {
    "id": "acervo-8551216c-487",
    "filename": "ufg-2010-prova-2010-2-1-etapa.pdf",
    "title": "ufg 2010 prova 2010 2 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2010,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2010/2010.2/ufg-2010-prova-2010-2-1-etapa.pdf",
    "relativePath": "Provas UFG/2010/2010.2/ufg-2010-prova-2010-2-1-etapa.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-05686ae4-488",
    "filename": "ufg-2010-prova-2010-2-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2010 prova 2010 2 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2010,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2010/2010.2/ufg-2010-prova-2010-2-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2010/2010.2/ufg-2010-prova-2010-2-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-c261df1f-489",
    "filename": "ufg-2010-prova-2010-2-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2010 prova 2010 2 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2010,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2010/2010.2/ufg-2010-prova-2010-2-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2010/2010.2/ufg-2010-prova-2010-2-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-1f39779a-490",
    "filename": "ufg-2011-prova-2011-1-1-etapa.pdf",
    "title": "ufg 2011 prova 2011 1 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2011,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2011/2011.1/ufg-2011-prova-2011-1-1-etapa.pdf",
    "relativePath": "Provas UFG/2011/2011.1/ufg-2011-prova-2011-1-1-etapa.pdf",
    "sizeFormatted": "6.2 MB"
  },
  {
    "id": "acervo-ef5012d5-491",
    "filename": "ufg-2011-prova-2011-1-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2011 prova 2011 1 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2011,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2011/2011.1/ufg-2011-prova-2011-1-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2011/2011.1/ufg-2011-prova-2011-1-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "5.3 MB"
  },
  {
    "id": "acervo-9278d1da-492",
    "filename": "ufg-2011-prova-2011-1-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2011 prova 2011 1 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2011,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2011/2011.1/ufg-2011-prova-2011-1-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2011/2011.1/ufg-2011-prova-2011-1-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "2.0 MB"
  },
  {
    "id": "acervo-f1b457c9-493",
    "filename": "ufg-2011-prova-2011-2-1-etapa.pdf",
    "title": "ufg 2011 prova 2011 2 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2011,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2011/2011.2/ufg-2011-prova-2011-2-1-etapa.pdf",
    "relativePath": "Provas UFG/2011/2011.2/ufg-2011-prova-2011-2-1-etapa.pdf",
    "sizeFormatted": "13.8 MB"
  },
  {
    "id": "acervo-ebae2cc4-494",
    "filename": "ufg-2011-prova-2011-2-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2011 prova 2011 2 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2011,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2011/2011.2/ufg-2011-prova-2011-2-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2011/2011.2/ufg-2011-prova-2011-2-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "3.3 MB"
  },
  {
    "id": "acervo-1b55c021-495",
    "filename": "ufg-2011-prova-2011-2-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2011 prova 2011 2 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2011,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2011/2011.2/ufg-2011-prova-2011-2-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2011/2011.2/ufg-2011-prova-2011-2-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "2.0 MB"
  },
  {
    "id": "acervo-90a055ce-496",
    "filename": "ufg-2012-prova-2012-1-1-etapa.pdf",
    "title": "ufg 2012 prova 2012 1 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2012,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2012/2012.1/ufg-2012-prova-2012-1-1-etapa.pdf",
    "relativePath": "Provas UFG/2012/2012.1/ufg-2012-prova-2012-1-1-etapa.pdf",
    "sizeFormatted": "4.2 MB"
  },
  {
    "id": "acervo-c126b770-497",
    "filename": "ufg-2012-prova-2012-1-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2012 prova 2012 1 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2012,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2012/2012.1/ufg-2012-prova-2012-1-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2012/2012.1/ufg-2012-prova-2012-1-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-dcf86bf3-498",
    "filename": "ufg-2012-prova-2012-1-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2012 prova 2012 1 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2012,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2012/2012.1/ufg-2012-prova-2012-1-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2012/2012.1/ufg-2012-prova-2012-1-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "2.9 MB"
  },
  {
    "id": "acervo-3320f11c-499",
    "filename": "ufg-2012-prova-2012-2-1-etapa.pdf",
    "title": "ufg 2012 prova 2012 2 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2012,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2012/2012.2/ufg-2012-prova-2012-2-1-etapa.pdf",
    "relativePath": "Provas UFG/2012/2012.2/ufg-2012-prova-2012-2-1-etapa.pdf",
    "sizeFormatted": "3.6 MB"
  },
  {
    "id": "acervo-a305a7af-500",
    "filename": "ufg-2012-prova-2012-2-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2012 prova 2012 2 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2012,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2012/2012.2/ufg-2012-prova-2012-2-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2012/2012.2/ufg-2012-prova-2012-2-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-6d9946f2-501",
    "filename": "ufg-2012-prova-2012-2-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2012 prova 2012 2 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2012,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2012/2012.2/ufg-2012-prova-2012-2-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2012/2012.2/ufg-2012-prova-2012-2-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-ed0715dc-502",
    "filename": "ufg-2013-prova-2013-1-1-etapa.pdf",
    "title": "ufg 2013 prova 2013 1 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2013,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2013/2013.1/ufg-2013-prova-2013-1-1-etapa.pdf",
    "relativePath": "Provas UFG/2013/2013.1/ufg-2013-prova-2013-1-1-etapa.pdf",
    "sizeFormatted": "5.5 MB"
  },
  {
    "id": "acervo-8d1db9a0-503",
    "filename": "ufg-2013-prova-2013-1-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2013 prova 2013 1 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2013,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2013/2013.1/ufg-2013-prova-2013-1-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2013/2013.1/ufg-2013-prova-2013-1-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-f10a0ef9-504",
    "filename": "ufg-2013-prova-2013-1-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2013 prova 2013 1 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2013,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2013/2013.1/ufg-2013-prova-2013-1-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2013/2013.1/ufg-2013-prova-2013-1-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-c09398a9-505",
    "filename": "ufg-2013-prova-2013-2-1-etapa.pdf",
    "title": "ufg 2013 prova 2013 2 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2013,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2013/2013.2/ufg-2013-prova-2013-2-1-etapa.pdf",
    "relativePath": "Provas UFG/2013/2013.2/ufg-2013-prova-2013-2-1-etapa.pdf",
    "sizeFormatted": "3.5 MB"
  },
  {
    "id": "acervo-7da038a4-506",
    "filename": "ufg-2013-prova-2013-2-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2013 prova 2013 2 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2013,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2013/2013.2/ufg-2013-prova-2013-2-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2013/2013.2/ufg-2013-prova-2013-2-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-76b12c60-507",
    "filename": "ufg-2013-prova-2013-2-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2013 prova 2013 2 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2013,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2013/2013.2/ufg-2013-prova-2013-2-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2013/2013.2/ufg-2013-prova-2013-2-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-103ecba9-508",
    "filename": "ufg-2014-prova-2014-1-1-etapa.pdf",
    "title": "ufg 2014 prova 2014 1 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2014,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2014/2014.1/ufg-2014-prova-2014-1-1-etapa.pdf",
    "relativePath": "Provas UFG/2014/2014.1/ufg-2014-prova-2014-1-1-etapa.pdf",
    "sizeFormatted": "4.7 MB"
  },
  {
    "id": "acervo-ad68dd05-509",
    "filename": "ufg-2014-prova-2014-1-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2014 prova 2014 1 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2014,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2014/2014.1/ufg-2014-prova-2014-1-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2014/2014.1/ufg-2014-prova-2014-1-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-3d5d702d-510",
    "filename": "ufg-2014-prova-2014-1-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2014 prova 2014 1 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2014,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2014/2014.1/ufg-2014-prova-2014-1-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2014/2014.1/ufg-2014-prova-2014-1-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-0162aa52-511",
    "filename": "ufg-2014-prova-2014-2-1-etapa.pdf",
    "title": "ufg 2014 prova 2014 2 1 etapa",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2014,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2014/2014.2/ufg-2014-prova-2014-2-1-etapa.pdf",
    "relativePath": "Provas UFG/2014/2014.2/ufg-2014-prova-2014-2-1-etapa.pdf",
    "sizeFormatted": "6.5 MB"
  },
  {
    "id": "acervo-a1f52978-512",
    "filename": "ufg-2014-prova-2014-2-2-etapa-grupo-1-dia-1.pdf",
    "title": "ufg 2014 prova 2014 2 2 etapa grupo 1 dia 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2014,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2014/2014.2/ufg-2014-prova-2014-2-2-etapa-grupo-1-dia-1.pdf",
    "relativePath": "Provas UFG/2014/2014.2/ufg-2014-prova-2014-2-2-etapa-grupo-1-dia-1.pdf",
    "sizeFormatted": "2.6 MB"
  },
  {
    "id": "acervo-28e3b27d-513",
    "filename": "ufg-2014-prova-2014-2-2-etapa-grupo-1-dia-2.pdf",
    "title": "ufg 2014 prova 2014 2 2 etapa grupo 1 dia 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2014,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2014/2014.2/ufg-2014-prova-2014-2-2-etapa-grupo-1-dia-2.pdf",
    "relativePath": "Provas UFG/2014/2014.2/ufg-2014-prova-2014-2-2-etapa-grupo-1-dia-2.pdf",
    "sizeFormatted": "2.9 MB"
  },
  {
    "id": "acervo-394c474f-514",
    "filename": "ufg-2026-prova-2026-1-matutino.pdf",
    "title": "ufg 2026 prova 2026 1 matutino",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2026/Matutino/ufg-2026-prova-2026-1-matutino.pdf",
    "relativePath": "Provas UFG/2026/Matutino/ufg-2026-prova-2026-1-matutino.pdf",
    "sizeFormatted": "4.6 MB"
  },
  {
    "id": "acervo-f8a32068-515",
    "filename": "ufg-2026-prova-2026-1-vespertino.pdf",
    "title": "ufg 2026 prova 2026 1 vespertino",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFG",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFG/2026/Vespertino/ufg-2026-prova-2026-1-vespertino.pdf",
    "relativePath": "Provas UFG/2026/Vespertino/ufg-2026-prova-2026-1-vespertino.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-21c614d7-516",
    "filename": "uft-2023-prova-2023-1.pdf",
    "title": "uft 2023 prova 2023 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2023/Vestibular%20Geral/uft-2023-prova-2023-1.pdf",
    "relativePath": "Provas UFT - EXATO/2023/Vestibular Geral/uft-2023-prova-2023-1.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-fadd12b9-517",
    "filename": "uft-2023-prova-2023-2.pdf",
    "title": "uft 2023 prova 2023 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2023/Vestibular%20Geral/uft-2023-prova-2023-2.pdf",
    "relativePath": "Provas UFT - EXATO/2023/Vestibular Geral/uft-2023-prova-2023-2.pdf",
    "sizeFormatted": "2.5 MB"
  },
  {
    "id": "acervo-e09693f8-518",
    "filename": "uft-2024-prova-exato-2024.pdf",
    "title": "uft 2024 prova exato 2024",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2024/EXATO/uft-2024-prova-exato-2024.pdf",
    "relativePath": "Provas UFT - EXATO/2024/EXATO/uft-2024-prova-exato-2024.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-f784715c-519",
    "filename": "uft-2024-prova-2024-1.pdf",
    "title": "uft 2024 prova 2024 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2024/Vestibular%20Geral/uft-2024-prova-2024-1.pdf",
    "relativePath": "Provas UFT - EXATO/2024/Vestibular Geral/uft-2024-prova-2024-1.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-c5acfaa8-520",
    "filename": "uft-2024-prova-2024-2.pdf",
    "title": "uft 2024 prova 2024 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2024/Vestibular%20Geral/uft-2024-prova-2024-2.pdf",
    "relativePath": "Provas UFT - EXATO/2024/Vestibular Geral/uft-2024-prova-2024-2.pdf",
    "sizeFormatted": "2.1 MB"
  },
  {
    "id": "acervo-1f9f5282-521",
    "filename": "uft-2025-prova-exato-2025-1.pdf",
    "title": "uft 2025 prova exato 2025 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2025/EXATO/uft-2025-prova-exato-2025-1.pdf",
    "relativePath": "Provas UFT - EXATO/2025/EXATO/uft-2025-prova-exato-2025-1.pdf",
    "sizeFormatted": "3.2 MB"
  },
  {
    "id": "acervo-6704c168-522",
    "filename": "uft-2025-prova-exato-2025-2.pdf",
    "title": "uft 2025 prova exato 2025 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2025/EXATO/uft-2025-prova-exato-2025-2.pdf",
    "relativePath": "Provas UFT - EXATO/2025/EXATO/uft-2025-prova-exato-2025-2.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-ce245ed5-523",
    "filename": "uft-2025-prova-2025-1_v2.pdf",
    "title": "uft 2025 prova 2025 1 v2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2025/Vestibular%20Geral/uft-2025-prova-2025-1_v2.pdf",
    "relativePath": "Provas UFT - EXATO/2025/Vestibular Geral/uft-2025-prova-2025-1_v2.pdf",
    "sizeFormatted": "2.5 MB"
  },
  {
    "id": "acervo-331054a4-524",
    "filename": "uft-2026-prova-exato-2026-1.pdf",
    "title": "uft 2026 prova exato 2026 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UFT",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UFT%20-%20EXATO/2026/EXATO/uft-2026-prova-exato-2026-1.pdf",
    "relativePath": "Provas UFT - EXATO/2026/EXATO/uft-2026-prova-exato-2026-1.pdf",
    "sizeFormatted": "3.0 MB"
  },
  {
    "id": "acervo-27875cd7-525",
    "filename": "UNESP_2023_1a_Fase_Caderno_de_Questoes.pdf",
    "title": "UNESP 2023 1a Fase Caderno de Questoes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNESP",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNESP/2023/UNESP_2023_1a_Fase_Caderno_de_Questoes.pdf",
    "relativePath": "Provas UNESP/2023/UNESP_2023_1a_Fase_Caderno_de_Questoes.pdf",
    "sizeFormatted": "3.2 MB"
  },
  {
    "id": "acervo-45eab384-526",
    "filename": "UNESP_2023_1a_Fase_Gabarito_Comentado.pdf",
    "title": "UNESP 2023 1a Fase Gabarito Comentado",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UNESP",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNESP/2023/UNESP_2023_1a_Fase_Gabarito_Comentado.pdf",
    "relativePath": "Provas UNESP/2023/UNESP_2023_1a_Fase_Gabarito_Comentado.pdf",
    "sizeFormatted": "51.5 MB"
  },
  {
    "id": "acervo-d4ced777-527",
    "filename": "UNESP_2024_1a_Fase_Caderno_de_Questoes.pdf",
    "title": "UNESP 2024 1a Fase Caderno de Questoes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNESP",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNESP/2024/UNESP_2024_1a_Fase_Caderno_de_Questoes.pdf",
    "relativePath": "Provas UNESP/2024/UNESP_2024_1a_Fase_Caderno_de_Questoes.pdf",
    "sizeFormatted": "2.8 MB"
  },
  {
    "id": "acervo-579aee6d-528",
    "filename": "UNESP_2024_1a_Fase_Gabarito_Comentado.pdf",
    "title": "UNESP 2024 1a Fase Gabarito Comentado",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UNESP",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNESP/2024/UNESP_2024_1a_Fase_Gabarito_Comentado.pdf",
    "relativePath": "Provas UNESP/2024/UNESP_2024_1a_Fase_Gabarito_Comentado.pdf",
    "sizeFormatted": "49.9 MB"
  },
  {
    "id": "acervo-5524a4be-529",
    "filename": "UNESP_2025_1a_Fase_Caderno_de_Questoes.pdf",
    "title": "UNESP 2025 1a Fase Caderno de Questoes",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNESP",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNESP/2025/UNESP_2025_1a_Fase_Caderno_de_Questoes.pdf",
    "relativePath": "Provas UNESP/2025/UNESP_2025_1a_Fase_Caderno_de_Questoes.pdf",
    "sizeFormatted": "2.8 MB"
  },
  {
    "id": "acervo-0b7368b1-530",
    "filename": "unirg-2019-prova-2019-1.pdf",
    "title": "unirg 2019 prova 2019 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRG",
    "year": 2019,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRG/2019/unirg-2019-prova-2019-1.pdf",
    "relativePath": "Provas UNIRG/2019/unirg-2019-prova-2019-1.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-7d94d3b5-531",
    "filename": "unirg-2019-prova-2019-2.pdf",
    "title": "unirg 2019 prova 2019 2",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRG",
    "year": 2019,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRG/2019/unirg-2019-prova-2019-2.pdf",
    "relativePath": "Provas UNIRG/2019/unirg-2019-prova-2019-2.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-c52954ae-532",
    "filename": "unirg-2020-prova-2020.pdf",
    "title": "unirg 2020 prova 2020",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRG",
    "year": 2020,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRG/2020/unirg-2020-prova-2020.pdf",
    "relativePath": "Provas UNIRG/2020/unirg-2020-prova-2020.pdf",
    "sizeFormatted": "1.5 MB"
  },
  {
    "id": "acervo-cec851a3-533",
    "filename": "unirg-2021-prova-2021.pdf",
    "title": "unirg 2021 prova 2021",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRG",
    "year": 2021,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRG/2021/unirg-2021-prova-2021.pdf",
    "relativePath": "Provas UNIRG/2021/unirg-2021-prova-2021.pdf",
    "sizeFormatted": "2.1 MB"
  },
  {
    "id": "acervo-932437b1-534",
    "filename": "unirg-2022-prova-2022-1-gurupi.pdf",
    "title": "unirg 2022 prova 2022 1 gurupi",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRG",
    "year": 2022,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRG/2022/unirg-2022-prova-2022-1-gurupi.pdf",
    "relativePath": "Provas UNIRG/2022/unirg-2022-prova-2022-1-gurupi.pdf",
    "sizeFormatted": "2.1 MB"
  },
  {
    "id": "acervo-99cf898a-535",
    "filename": "unirg-2022-prova-2022-1-paraiso.pdf",
    "title": "unirg 2022 prova 2022 1 paraiso",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRG",
    "year": 2022,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRG/2022/unirg-2022-prova-2022-1-paraiso.pdf",
    "relativePath": "Provas UNIRG/2022/unirg-2022-prova-2022-1-paraiso.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-48c6d8a4-536",
    "filename": "unirv-2023-prova-2023-1-medicina.pdf",
    "title": "unirv 2023 prova 2023 1 medicina",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRV",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRV/2023/unirv-2023-prova-2023-1-medicina.pdf",
    "relativePath": "Provas UNIRV/2023/unirv-2023-prova-2023-1-medicina.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-7c5a40d6-537",
    "filename": "unirv-2023-prova-2023-2-medicina.pdf",
    "title": "unirv 2023 prova 2023 2 medicina",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRV",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRV/2023/unirv-2023-prova-2023-2-medicina.pdf",
    "relativePath": "Provas UNIRV/2023/unirv-2023-prova-2023-2-medicina.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-37891888-538",
    "filename": "unirv-2024-prova-2024-1-rio-verde.pdf",
    "title": "unirv 2024 prova 2024 1 rio verde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRV",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRV/2024/unirv-2024-prova-2024-1-rio-verde.pdf",
    "relativePath": "Provas UNIRV/2024/unirv-2024-prova-2024-1-rio-verde.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-2ad0109c-539",
    "filename": "unirv-2024-prova-2024-2-rio-verde.pdf",
    "title": "unirv 2024 prova 2024 2 rio verde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRV",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRV/2024/unirv-2024-prova-2024-2-rio-verde.pdf",
    "relativePath": "Provas UNIRV/2024/unirv-2024-prova-2024-2-rio-verde.pdf",
    "sizeFormatted": "0.5 MB"
  },
  {
    "id": "acervo-694a2228-540",
    "filename": "unirv-2025-prova-2025-1-rio-verde.pdf",
    "title": "unirv 2025 prova 2025 1 rio verde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRV",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRV/2025/unirv-2025-prova-2025-1-rio-verde.pdf",
    "relativePath": "Provas UNIRV/2025/unirv-2025-prova-2025-1-rio-verde.pdf",
    "sizeFormatted": "0.3 MB"
  },
  {
    "id": "acervo-4e299c11-541",
    "filename": "unirv-2025-prova-2025-2-rio-verde.pdf",
    "title": "unirv 2025 prova 2025 2 rio verde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNIRV",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNIRV/2025/unirv-2025-prova-2025-2-rio-verde.pdf",
    "relativePath": "Provas UNIRV/2025/unirv-2025-prova-2025-2-rio-verde.pdf",
    "sizeFormatted": "0.4 MB"
  },
  {
    "id": "acervo-de5dba81-542",
    "filename": "unitins-2023-prova-2023-1.pdf",
    "title": "unitins 2023 prova 2023 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNITINS",
    "year": 2023,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNITINS/2023/unitins-2023-prova-2023-1.pdf",
    "relativePath": "Provas UNITINS/2023/unitins-2023-prova-2023-1.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-b3e05a3e-543",
    "filename": "unitins-2024-prova-2024-1.pdf",
    "title": "unitins 2024 prova 2024 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNITINS",
    "year": 2024,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNITINS/2024/unitins-2024-prova-2024-1.pdf",
    "relativePath": "Provas UNITINS/2024/unitins-2024-prova-2024-1.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-b96d6f20-544",
    "filename": "unitins-2025-prova-2025-1.pdf",
    "title": "unitins 2025 prova 2025 1",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "UNITINS",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/Provas%20UNITINS/2025/unitins-2025-prova-2025-1.pdf",
    "relativePath": "Provas UNITINS/2025/unitins-2025-prova-2025-1.pdf",
    "sizeFormatted": "1.7 MB"
  },
  {
    "id": "acervo-58e7eebb-545",
    "filename": "01 - Simulado CICLO ZERO (MANHÃ) + Gabarito.pdf",
    "title": "01 Simulado CICLO ZERO (MANHÃ) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/01%20-%20Ciclo%20Zero/01%20-%20Simulado%20CICLO%20ZERO%20(MANH%C3%83)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/01 - Ciclo Zero/01 - Simulado CICLO ZERO (MANHÃ) + Gabarito.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-8bb0bc1a-546",
    "filename": "02 - Simulado CICLO ZERO (TARDE) + Gabarito.pdf",
    "title": "02 Simulado CICLO ZERO (TARDE) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/01%20-%20Ciclo%20Zero/02%20-%20Simulado%20CICLO%20ZERO%20(TARDE)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/01 - Ciclo Zero/02 - Simulado CICLO ZERO (TARDE) + Gabarito.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-e9838d9e-547",
    "filename": "01 - Simulado TRADICIONAIS (31 janeiro) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (31 janeiro) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/01%20-%20Janeiro/01%20-%20Simulado%20TRADICIONAIS%20(31%20janeiro)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/01 - Janeiro/01 - Simulado TRADICIONAIS (31 janeiro) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-b2dfeae7-548",
    "filename": "01 - Simulado TRADICIONAIS (07 de fevereiro) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (07 de fevereiro) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/02%20-%20Fevereiro/01%20-%20Simulado%20TRADICIONAIS%20(07%20de%20fevereiro)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/02 - Fevereiro/01 - Simulado TRADICIONAIS (07 de fevereiro) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-f7ea3210-549",
    "filename": "02 - Simulado TRADICIONAIS (14 de fevereiro) + Gabarito.pdf",
    "title": "02 Simulado TRADICIONAIS (14 de fevereiro) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/02%20-%20Fevereiro/02%20-%20Simulado%20TRADICIONAIS%20(14%20de%20fevereiro)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/02 - Fevereiro/02 - Simulado TRADICIONAIS (14 de fevereiro) + Gabarito.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-63471990-550",
    "filename": "03 - Simulado TRADICIONAIS (21 de fevereiro) + Gabarito.pdf",
    "title": "03 Simulado TRADICIONAIS (21 de fevereiro) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/02%20-%20Fevereiro/03%20-%20Simulado%20TRADICIONAIS%20(21%20de%20fevereiro)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/02 - Fevereiro/03 - Simulado TRADICIONAIS (21 de fevereiro) + Gabarito.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-726467b1-551",
    "filename": "04 - Simulado TRADICIONAIS (28 de fevereiro) + Gabarito.pdf",
    "title": "04 Simulado TRADICIONAIS (28 de fevereiro) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/02%20-%20Fevereiro/04%20-%20Simulado%20TRADICIONAIS%20(28%20de%20fevereiro)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/02 - Fevereiro/04 - Simulado TRADICIONAIS (28 de fevereiro) + Gabarito.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-868442b0-552",
    "filename": "01 - Simulado TRADICIONAIS (07 de março) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (07 de março) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/03%20-%20Mar%C3%A7o/01%20-%20Simulado%20TRADICIONAIS%20(07%20de%20mar%C3%A7o)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/03 - Março/01 - Simulado TRADICIONAIS (07 de março) + Gabarito.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-5eb42c7c-553",
    "filename": "02 - Simulado TRADICIONAIS (14 de março) + Gabarito.pdf",
    "title": "02 Simulado TRADICIONAIS (14 de março) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/03%20-%20Mar%C3%A7o/02%20-%20Simulado%20TRADICIONAIS%20(14%20de%20mar%C3%A7o)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/03 - Março/02 - Simulado TRADICIONAIS (14 de março) + Gabarito.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-1380825c-554",
    "filename": "03 - Simulado TRADICIONAIS (21 de março) + Gabarito.pdf",
    "title": "03 Simulado TRADICIONAIS (21 de março) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/03%20-%20Mar%C3%A7o/03%20-%20Simulado%20TRADICIONAIS%20(21%20de%20mar%C3%A7o)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/03 - Março/03 - Simulado TRADICIONAIS (21 de março) + Gabarito.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-212d3383-555",
    "filename": "01 - Simulado TRADICIONAIS (04 de abril) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (04 de abril) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/04%20-%20Abril/01%20-%20Simulado%20TRADICIONAIS%20(04%20de%20abril)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/04 - Abril/01 - Simulado TRADICIONAIS (04 de abril) + Gabarito.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-f933ddb8-556",
    "filename": "02 - Simulado TRADICIONAIS (11 de abril) + Gabarito.pdf",
    "title": "02 Simulado TRADICIONAIS (11 de abril) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/04%20-%20Abril/02%20-%20Simulado%20TRADICIONAIS%20(11%20de%20abril)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/04 - Abril/02 - Simulado TRADICIONAIS (11 de abril) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-162e6bd1-557",
    "filename": "03 - Simulado TRADICIONAIS (18 de abril) + Gabarito.pdf",
    "title": "03 Simulado TRADICIONAIS (18 de abril) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/04%20-%20Abril/03%20-%20Simulado%20TRADICIONAIS%20(18%20de%20abril)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/04 - Abril/03 - Simulado TRADICIONAIS (18 de abril) + Gabarito.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-2dfb5896-558",
    "filename": "04 - Simulado TRADICIONAIS (25 de abril) + Gabarito.pdf",
    "title": "04 Simulado TRADICIONAIS (25 de abril) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/04%20-%20Abril/04%20-%20Simulado%20TRADICIONAIS%20(25%20de%20abril)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/04 - Abril/04 - Simulado TRADICIONAIS (25 de abril) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-bd44188d-559",
    "filename": "01 - Simulado TRADICIONAIS (30 de maio) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (30 de maio) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/05%20-%20Maio/01%20-%20Simulado%20TRADICIONAIS%20(30%20de%20maio)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/05 - Maio/01 - Simulado TRADICIONAIS (30 de maio) + Gabarito.pdf",
    "sizeFormatted": "0.7 MB"
  },
  {
    "id": "acervo-41a07445-560",
    "filename": "01 - Simulado TRADICIONAIS (06 de junho) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (06 de junho) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/06%20-%20Junho/01%20-%20Simulado%20TRADICIONAIS%20(06%20de%20junho)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/06 - Junho/01 - Simulado TRADICIONAIS (06 de junho) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-887c3de7-561",
    "filename": "02 - Simulado TRADICIONAIS (13 de junho) + Gabarito.pdf",
    "title": "02 Simulado TRADICIONAIS (13 de junho) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/06%20-%20Junho/02%20-%20Simulado%20TRADICIONAIS%20(13%20de%20junho)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/06 - Junho/02 - Simulado TRADICIONAIS (13 de junho) + Gabarito.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-2a6ebd21-562",
    "filename": "03 - Simulado TRADICIONAIS (20 de junho) + Gabarito.pdf",
    "title": "03 Simulado TRADICIONAIS (20 de junho) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/06%20-%20Junho/03%20-%20Simulado%20TRADICIONAIS%20(20%20de%20junho)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/06 - Junho/03 - Simulado TRADICIONAIS (20 de junho) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-e421af6f-563",
    "filename": "04 - Simulado TRADICIONAIS (27 de junho) + Gabarito.pdf",
    "title": "04 Simulado TRADICIONAIS (27 de junho) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/06%20-%20Junho/04%20-%20Simulado%20TRADICIONAIS%20(27%20de%20junho)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/06 - Junho/04 - Simulado TRADICIONAIS (27 de junho) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-1465cf69-564",
    "filename": "01 - Simulado TRADICIONAIS (04 de julho) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (04 de julho) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/07%20-%20Julho/01%20-%20Simulado%20TRADICIONAIS%20(04%20de%20julho)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/07 - Julho/01 - Simulado TRADICIONAIS (04 de julho) + Gabarito.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-18dd8539-565",
    "filename": "02 - Simulado TRADICIONAIS (11 de julho) + Gabarito.pdf",
    "title": "02 Simulado TRADICIONAIS (11 de julho) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/07%20-%20Julho/02%20-%20Simulado%20TRADICIONAIS%20(11%20de%20julho)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/07 - Julho/02 - Simulado TRADICIONAIS (11 de julho) + Gabarito.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-ba8cafa9-566",
    "filename": "01 - Simulado TRADICIONAIS (01 de agosto) + Gabarito.pdf",
    "title": "01 Simulado TRADICIONAIS (01 de agosto) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/08%20-%20Agosto/01%20-%20Simulado%20TRADICIONAIS%20(01%20de%20agosto)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/08 - Agosto/01 - Simulado TRADICIONAIS (01 de agosto) + Gabarito.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-32b2e3c4-567",
    "filename": "02 - Simulado TRADICIONAIS (08 de agosto) + Gabarito.pdf",
    "title": "02 Simulado TRADICIONAIS (08 de agosto) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/02%20-%20Tradicionais/08%20-%20Agosto/02%20-%20Simulado%20TRADICIONAIS%20(08%20de%20agosto)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/02 - Tradicionais/08 - Agosto/02 - Simulado TRADICIONAIS (08 de agosto) + Gabarito.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-6ba7b8f3-568",
    "filename": "01 - SIMULADO EXATO  - OUTUBRO DE 2025 (MANHÃ) + Gabarito.pdf",
    "title": "01 SIMULADO EXATO OUTUBRO DE 2025 (MANHÃ) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Especiais%20e%20Tem%C3%A1ticos/01%20-%20SIMULADO%20EXATO%20%20-%20OUTUBRO%20DE%202025%20(MANH%C3%83)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Especiais e Temáticos/01 - SIMULADO EXATO  - OUTUBRO DE 2025 (MANHÃ) + Gabarito.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-da1661a8-569",
    "filename": "02 - SIMULADO EXATO  - OUTUBRO DE 2025 (TARDE) + Gabarito.pdf",
    "title": "02 SIMULADO EXATO OUTUBRO DE 2025 (TARDE) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "year": 2025,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Especiais%20e%20Tem%C3%A1ticos/02%20-%20SIMULADO%20EXATO%20%20-%20OUTUBRO%20DE%202025%20(TARDE)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Especiais e Temáticos/02 - SIMULADO EXATO  - OUTUBRO DE 2025 (TARDE) + Gabarito.pdf",
    "sizeFormatted": "4.9 MB"
  },
  {
    "id": "acervo-c0f001cc-570",
    "filename": "SIMULADO EXATO - NATUREZAS + Gabarito.pdf",
    "title": "SIMULADO EXATO NATUREZAS + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Especiais%20e%20Tem%C3%A1ticos/SIMULADO%20EXATO%20-%20NATUREZAS%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Especiais e Temáticos/SIMULADO EXATO - NATUREZAS + Gabarito.pdf",
    "sizeFormatted": "1.8 MB"
  },
  {
    "id": "acervo-705fdca8-571",
    "filename": "SIMULADO INÉDITO EXATO - 03 DE MAIO + Gabarito.pdf",
    "title": "SIMULADO INÉDITO EXATO 03 DE MAIO + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Especiais%20e%20Tem%C3%A1ticos/SIMULADO%20IN%C3%89DITO%20EXATO%20-%2003%20DE%20MAIO%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Especiais e Temáticos/SIMULADO INÉDITO EXATO - 03 DE MAIO + Gabarito.pdf",
    "sizeFormatted": "2.6 MB"
  },
  {
    "id": "acervo-363c5f09-572",
    "filename": "SIMULADO OFICIAL EXATO (29 de março) + Gabarito.pdf",
    "title": "SIMULADO OFICIAL EXATO (29 de março) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Especiais%20e%20Tem%C3%A1ticos/SIMULADO%20OFICIAL%20EXATO%20(29%20de%20mar%C3%A7o)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Especiais e Temáticos/SIMULADO OFICIAL EXATO (29 de março) + Gabarito.pdf",
    "sizeFormatted": "5.7 MB"
  },
  {
    "id": "acervo-6c31119f-573",
    "filename": "Simulado 1 - EXATO 2026 - Gabarito Comentado.pdf",
    "title": "Simulado 1 EXATO 2026 Gabarito Comentado",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%201/Simulado%201%20-%20EXATO%202026%20-%20Gabarito%20Comentado.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 1/Simulado 1 - EXATO 2026 - Gabarito Comentado.pdf",
    "sizeFormatted": "0.6 MB"
  },
  {
    "id": "acervo-2b4bd453-574",
    "filename": "Simulado 1 - EXATO 2026 - Prova Manhã.pdf",
    "title": "Simulado 1 EXATO 2026 Prova Manhã",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%201/Simulado%201%20-%20EXATO%202026%20-%20Prova%20Manh%C3%A3.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 1/Simulado 1 - EXATO 2026 - Prova Manhã.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-7c9b6fcf-575",
    "filename": "Simulado 1 - EXATO 2026 - Prova Tarde.pdf",
    "title": "Simulado 1 EXATO 2026 Prova Tarde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%201/Simulado%201%20-%20EXATO%202026%20-%20Prova%20Tarde.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 1/Simulado 1 - EXATO 2026 - Prova Tarde.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-23ce64b4-576",
    "filename": "Simulado 2 - EXATO 2026 - Gabarito Comentado.pdf",
    "title": "Simulado 2 EXATO 2026 Gabarito Comentado",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%202/Simulado%202%20-%20EXATO%202026%20-%20Gabarito%20Comentado.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 2/Simulado 2 - EXATO 2026 - Gabarito Comentado.pdf",
    "sizeFormatted": "0.9 MB"
  },
  {
    "id": "acervo-fc49f017-577",
    "filename": "Simulado 2 - EXATO 2026 - Prova Manhã.pdf",
    "title": "Simulado 2 EXATO 2026 Prova Manhã",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%202/Simulado%202%20-%20EXATO%202026%20-%20Prova%20Manh%C3%A3.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 2/Simulado 2 - EXATO 2026 - Prova Manhã.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-0550a2e3-578",
    "filename": "Simulado 2 - EXATO 2026 - Prova Tarde.pdf",
    "title": "Simulado 2 EXATO 2026 Prova Tarde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%202/Simulado%202%20-%20EXATO%202026%20-%20Prova%20Tarde.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 2/Simulado 2 - EXATO 2026 - Prova Tarde.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-499af343-579",
    "filename": "Simulado 3 - EXATO 2026 - Gabarito Comentado.pdf",
    "title": "Simulado 3 EXATO 2026 Gabarito Comentado",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%203/Simulado%203%20-%20EXATO%202026%20-%20Gabarito%20Comentado.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 3/Simulado 3 - EXATO 2026 - Gabarito Comentado.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-ecfd0715-580",
    "filename": "Simulado 3 - EXATO 2026 - Prova Manhã.pdf",
    "title": "Simulado 3 EXATO 2026 Prova Manhã",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%203/Simulado%203%20-%20EXATO%202026%20-%20Prova%20Manh%C3%A3.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 3/Simulado 3 - EXATO 2026 - Prova Manhã.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-84fc9382-581",
    "filename": "Simulado 3 - EXATO 2026 - Prova Tarde.pdf",
    "title": "Simulado 3 EXATO 2026 Prova Tarde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%203/Simulado%203%20-%20EXATO%202026%20-%20Prova%20Tarde.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 3/Simulado 3 - EXATO 2026 - Prova Tarde.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-82fa02e9-582",
    "filename": "Simulado 4 - EXATO 2026 - Gabarito Comentado.pdf",
    "title": "Simulado 4 EXATO 2026 Gabarito Comentado",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%204/Simulado%204%20-%20EXATO%202026%20-%20Gabarito%20Comentado.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 4/Simulado 4 - EXATO 2026 - Gabarito Comentado.pdf",
    "sizeFormatted": "4.3 MB"
  },
  {
    "id": "acervo-99604365-583",
    "filename": "Simulado 4 - EXATO 2026 - Prova Manhã.pdf",
    "title": "Simulado 4 EXATO 2026 Prova Manhã",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%204/Simulado%204%20-%20EXATO%202026%20-%20Prova%20Manh%C3%A3.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 4/Simulado 4 - EXATO 2026 - Prova Manhã.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-eee91616-584",
    "filename": "Simulado 4 - EXATO 2026 - Prova Tarde.pdf",
    "title": "Simulado 4 EXATO 2026 Prova Tarde",
    "discipline": "geral",
    "category": "prova_oficial",
    "banca": "Outras",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/EXATO%202026%20(1%C2%AA%20Edi%C3%A7%C3%A3o)/Simulado%204/Simulado%204%20-%20EXATO%202026%20-%20Prova%20Tarde.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/EXATO 2026 (1ª Edição)/Simulado 4/Simulado 4 - EXATO 2026 - Prova Tarde.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-d7f96d6d-585",
    "filename": "SIMULADO 1 - EXATO + Gabarito.pdf",
    "title": "SIMULADO 1 EXATO + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Seriados%20(1%20a%204)/SIMULADO%201%20-%20EXATO%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Seriados (1 a 4)/SIMULADO 1 - EXATO + Gabarito.pdf",
    "sizeFormatted": "2.5 MB"
  },
  {
    "id": "acervo-f22729b5-586",
    "filename": "SIMULADO 2 - EXATO + Gabarito.pdf",
    "title": "SIMULADO 2 EXATO + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Seriados%20(1%20a%204)/SIMULADO%202%20-%20EXATO%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Seriados (1 a 4)/SIMULADO 2 - EXATO + Gabarito.pdf",
    "sizeFormatted": "2.3 MB"
  },
  {
    "id": "acervo-6321b36a-587",
    "filename": "SIMULADO 3 - EXATO + Gabarito.pdf",
    "title": "SIMULADO 3 EXATO + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Seriados%20(1%20a%204)/SIMULADO%203%20-%20EXATO%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Seriados (1 a 4)/SIMULADO 3 - EXATO + Gabarito.pdf",
    "sizeFormatted": "2.2 MB"
  },
  {
    "id": "acervo-414afe73-588",
    "filename": "SIMULADO 4 - EXATO + Gabarito.pdf",
    "title": "SIMULADO 4 EXATO + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Seriados%20(1%20a%204)/SIMULADO%204%20-%20EXATO%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Seriados (1 a 4)/SIMULADO 4 - EXATO + Gabarito.pdf",
    "sizeFormatted": "2.4 MB"
  },
  {
    "id": "acervo-0d9a59e7-589",
    "filename": "01 - SIMULADO EXATO (MANHÃ) + Gabarito.pdf",
    "title": "01 SIMULADO EXATO (MANHÃ) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Turnos%20(Manh%C3%A3%20e%20Tarde)/01%20-%20SIMULADO%20EXATO%20(MANH%C3%83)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Turnos (Manhã e Tarde)/01 - SIMULADO EXATO (MANHÃ) + Gabarito.pdf",
    "sizeFormatted": "1.1 MB"
  },
  {
    "id": "acervo-2db9d0e8-590",
    "filename": "01 - SIMULADO EXATO 2° (MANHÃ) + Gabarito.pdf",
    "title": "01 SIMULADO EXATO 2° (MANHÃ) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Turnos%20(Manh%C3%A3%20e%20Tarde)/01%20-%20SIMULADO%20EXATO%202%C2%B0%20(MANH%C3%83)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Turnos (Manhã e Tarde)/01 - SIMULADO EXATO 2° (MANHÃ) + Gabarito.pdf",
    "sizeFormatted": "1.4 MB"
  },
  {
    "id": "acervo-48e74b50-591",
    "filename": "02 - SIMULADO EXATO (TARDE) + Gabarito.pdf",
    "title": "02 SIMULADO EXATO (TARDE) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Turnos%20(Manh%C3%A3%20e%20Tarde)/02%20-%20SIMULADO%20EXATO%20(TARDE)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Turnos (Manhã e Tarde)/02 - SIMULADO EXATO (TARDE) + Gabarito.pdf",
    "sizeFormatted": "1.0 MB"
  },
  {
    "id": "acervo-0b41a96e-592",
    "filename": "02 - SIMULADO EXATO 2° (TARDE) + Gabarito.pdf",
    "title": "02 SIMULADO EXATO 2° (TARDE) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "Outras",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/03%20-%20Exato/Turnos%20(Manh%C3%A3%20e%20Tarde)/02%20-%20SIMULADO%20EXATO%202%C2%B0%20(TARDE)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/03 - Exato/Turnos (Manhã e Tarde)/02 - SIMULADO EXATO 2° (TARDE) + Gabarito.pdf",
    "sizeFormatted": "1.3 MB"
  },
  {
    "id": "acervo-36e44c7b-593",
    "filename": "GABARITO SIMULADO UEMA 23.08.pdf",
    "title": "GABARITO SIMULADO UEMA 23.08",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UEMA",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/04%20-%20UEMA/GABARITO%20SIMULADO%20UEMA%2023.08.pdf",
    "relativePath": "simulados separados (EXTRAS)/04 - UEMA/GABARITO SIMULADO UEMA 23.08.pdf",
    "sizeFormatted": "0.8 MB"
  },
  {
    "id": "acervo-326c4cf3-594",
    "filename": "SIMULADO UEMA 2308.pdf",
    "title": "SIMULADO UEMA 2308",
    "discipline": "geral",
    "category": "simulado",
    "banca": "UEMA",
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/04%20-%20UEMA/SIMULADO%20UEMA%202308.pdf",
    "relativePath": "simulados separados (EXTRAS)/04 - UEMA/SIMULADO UEMA 2308.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-f92910d7-595",
    "filename": "01 - SIMULADO UFG (MANHÃ) - Agosto, 2026.pdf",
    "title": "01 SIMULADO UFG (MANHÃ) Agosto, 2026",
    "discipline": "geral",
    "category": "simulado",
    "banca": "UFG",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/05%20-%20UFG/01%20-%20SIMULADO%20UFG%20(MANH%C3%83)%20-%20Agosto%2C%202026.pdf",
    "relativePath": "simulados separados (EXTRAS)/05 - UFG/01 - SIMULADO UFG (MANHÃ) - Agosto, 2026.pdf",
    "sizeFormatted": "1.2 MB"
  },
  {
    "id": "acervo-fabf51da-596",
    "filename": "02 - SIMULADO UFG (TARDE) - Agosto, 2026.pdf",
    "title": "02 SIMULADO UFG (TARDE) Agosto, 2026",
    "discipline": "geral",
    "category": "simulado",
    "banca": "UFG",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/05%20-%20UFG/02%20-%20SIMULADO%20UFG%20(TARDE)%20-%20Agosto%2C%202026.pdf",
    "relativePath": "simulados separados (EXTRAS)/05 - UFG/02 - SIMULADO UFG (TARDE) - Agosto, 2026.pdf",
    "sizeFormatted": "1.6 MB"
  },
  {
    "id": "acervo-6283dd6d-597",
    "filename": "03 - SIMULADO UFG - Agosto, 2026 - Gabarito.pdf",
    "title": "03 SIMULADO UFG Agosto, 2026 Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UFG",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/05%20-%20UFG/03%20-%20SIMULADO%20UFG%20-%20Agosto%2C%202026%20-%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/05 - UFG/03 - SIMULADO UFG - Agosto, 2026 - Gabarito.pdf",
    "sizeFormatted": "0.3 MB"
  },
  {
    "id": "acervo-2df38fe0-598",
    "filename": "SIMULADO UNIRG - ESPANHOL (MAIO, 2026) + Gabarito.pdf",
    "title": "SIMULADO UNIRG ESPANHOL (MAIO, 2026) + Gabarito",
    "discipline": "geral",
    "category": "gabarito_comentado",
    "banca": "UNIRG",
    "year": 2026,
    "topics": [],
    "githubUrl": "https://github.com/VitorDMandrade/mestre-card/blob/main/Provas%20Oficiais%20e%20Exerc%C3%ADcios/simulados%20separados%20(EXTRAS)/06%20-%20UNIRG/SIMULADO%20UNIRG%20-%20ESPANHOL%20(MAIO%2C%202026)%20%2B%20Gabarito.pdf",
    "relativePath": "simulados separados (EXTRAS)/06 - UNIRG/SIMULADO UNIRG - ESPANHOL (MAIO, 2026) + Gabarito.pdf",
    "sizeFormatted": "1.1 MB"
  }
];
