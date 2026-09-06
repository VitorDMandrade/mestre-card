# Mestre Card V16 - Manual Operacional

Plataforma tática Local-First para Hiper-Revisão e Retenção Ativa. Desenvolvido para transformar sessões de estudo em operações de alta performance.

## Instalação PWA (Recomendado)
Para a melhor experiência e foco total (Standalone Mode), instale o aplicativo localmente.
- **Desktop (Chrome/Edge):** Acesse a plataforma e clique no botão nativo "Instalar Mestre Card" localizado à direita na barra de endereços (Omnibox).
- **Tablet/Smartphone (iOS/Android):** Acesse no navegador, abra o menu de compartilhamento/opções e selecione **"Adicionar à Tela de Início"**.

O Mestre Card funcionará totalmente offline e em tela cheia via Service Worker, blindando o usuário contra distrações externas.

## Ciclo de Ingestão de Conteúdo (2 Passos)
1. **Geração do Dossiê (Arquiteto JSON):** Copie todo o texto do artefato `prompt_arquiteto_json_v16.md`, insira o tema que deseja estudar na última linha e envie ao Gemini Advanced (ou modelo de contexto equivalente).
2. **Importação Tática:** Pegue o bloco de código JSON gerado de forma bruta, retorne ao Mestre Card, acesse o Terminal HUD na home e cole o código. Pressione "Iniciar Simulação".

## Mapeamento de Atalhos do Teclado (Pentágono Revisional)
Agilize sua revisão sem tocar no mouse durante os confrontos diretos:
- `,` (Vírgula) e `.` (Ponto): Navega horizontalmente entre as abas e instâncias do Arcade.
- `1` a `4`: Seleciona automaticamente a respectiva alternativa em Questões Múltipla Escolha e Boss Fights.
- `V` / `F`: Aciona Verdadeiro ou Falso instantaneamente no modo de Pressão TRI.
- `Espaço` (Spacebar): Confirma/Avança o prompt na interface.

## Comandos de Desenvolvimento & Engenharia
- `npm run dev`: Inicia o servidor local de desenvolvimento na porta padrão (5173) com HMR rápido.
- `npm run build`: Compila, tipa e empacota a aplicação (TypeScript Strict) para o diretório `/dist` com otimização de minificação.
- `npm run preview`: Inicia o servidor com o build de produção final (Ideal para auditar ativação do cache offline do Service Worker).
