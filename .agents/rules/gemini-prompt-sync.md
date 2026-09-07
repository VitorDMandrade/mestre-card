# REGRA PERMANENTE: SINCRONIZAÇÃO OBRIGATÓRIA DO PROMPT MESTRE (GEMINI ARQUITETO)

## 1. Princípio Fundamental
Sempre que uma nova funcionalidade, mecânica lúdica, seção de estudo, componente tático ou campo do contrato TypeScript (`src/types/mestre-card.ts`) for adicionado, alterado ou expandido no aplicativo **MestreCard**:
- O modelo / agente de IA **DEVE OBRIGATORIAMENTE** atualizar e versionar o **PROMPT MESTRE DO GEMINI ARQUITETO** (`PROMPT_MESTRECARD_ARQUITETO_V<X>.md`).
- É estritamente proibido introduzir novos recursos no frontend sem atualizar simultaneamente o prompt correspondente para que o Gemini Pro / Advanced saiba gerar dados nativos para essa mecânica.

## 2. Padrão de Versionamento do Prompt
- O arquivo de prompt principal fica na raiz do repositório: `PROMPT_MESTRECARD_ARQUITETO_V<VERSAO>.md` e no diretório de artefatos da conversa.
- Cada nova versão deve detalhar:
  1. O propósito pedagógico da nova seção/funcionalidade.
  2. As regras de preenchimento quantitativo e qualitativo.
  3. O contrato JSON exato no Schema TypeScript.
  4. Exemplos práticos em português de como preencher os novos campos sem placeholders (`"..."` ou `"etc"`).

## 3. Checklist Obrigatório em Cada Ciclo de Entrega
Antes de concluir qualquer tarefa que altere o esquema de dados do MestreCard:
- [ ] O arquivo `src/types/mestre-card.ts` reflete o contrato atualizado.
- [ ] A engine/componente suporta os campos de forma resiliente (com fallback se o JSON antigo não contiver o campo).
- [ ] O arquivo `PROMPT_MESTRECARD_ARQUITETO_V<VERSAO>.md` foi criado com todas as instruções necessárias para o usuário alimentar o Gemini.
- [ ] O usuário é informado no Walkthrough com instruções diretas de como utilizar o novo prompt no Gemini.
