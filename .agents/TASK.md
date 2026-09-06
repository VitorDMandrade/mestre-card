# TASK.md - Mestre Card V16: Estado de Execução e Ciclos

## Ciclo 1: Estabilização, Homologação e Deploy de Produção (Concluído)
- [x] 1. Correção de fronteira de índice em `GameTimeline.tsx` (`step >= questions.length`).
- [x] 2. Desacoplamento de side-effect impuro em `GameMatch.tsx`.
- [x] 3. Blindagem de reconciliação React 18 (`insertBefore`) via pré-alocação estática e `ErrorBoundary` tri-nível (`[ADR-18]`).
- [x] 4. Elaboração e consolidação do Prompt Arquiteto V16 (`PROMPT_MESTRECARD_ARQUITETO_V16.md`).
- [x] 5. Configuração de base relativa (`base: './'`) no `vite.config.ts`.
- [x] 6. Fallback universal de SPA (`dist/404.html`) no build do `package.json`.
- [x] 7. Integração e ativação do GitHub MCP Server via Node/npx.
- [x] 8. Provisionamento do repositório remoto `VitorDMandrade/mestre-card` via GitHub MCP.
- [x] 9. Pipeline CI/CD operacional via GitHub Actions (`.github/workflows/deploy.yml`).
- [x] 10. v1.0.2 Homologada em Produção via GitHub Pages (https://vitordmandrade.github.io/mestre-card/).

## Estado Operacional Atual
- **Status:** Repositório congelado para Validação de Campo PWA (Dogfooding).
- **Ambiente Ativo:** GitHub Pages com HTTPS, PWA Standalone e Service Worker offline.
- **Portas Locais:** Encerradas (Zero instâncias órfãs).

## Próxima Etapa (Pós-Validação de Campo)
- [ ] Protocolo de Teste de Voo: Ingestão de card real no tablet/smartphone e auditoria de ergonomia touch/offline.
- [ ] Ciclo 2 (Congelado temporariamente): Avaliação de SM-2 / Zip após 10 sessões reais de estudo.
