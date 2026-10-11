# Design System: Veti Health & Care (design.md)

Este documento estabelece as diretrizes de design, tokens de estilo, padrões tipográficos e especificações de componentes da identidade visual da **Veti Health & Care**, derivada das definições do sistema e do arquivo de componentes `Veti.fig`.

---

## 1. Visão Geral da Marca e Princípios

A **Veti Health & Care** é uma plataforma clínica e veterinária voltada para a gestão ágil de consultas, acompanhamento de pacientes e comunicação multicanal (WhatsApp e Web Push).

### Princípios de Design:

- **Clareza e Confiabilidade:** Interface limpa, com dados clínicos e lembretes de agendamento visíveis e de fácil leitura.
- **Eficiência Operacional:** Componentes de ação rápida (_Quick Actions_, CTAs diretos e alternadores de notificação) para agilizar rotinas clínicas.
- **Acessibilidade e Contraste:** Tipografia legível com contraste seguro (texto principal sobre superfícies claras em conformidade com WCAG AA).

---

## 2. Tokens de Cor (Color Palette)

### 2.1 Cores da Marca (Brand Colors)

| Token                 | Hex       | Descrição / Aplicação                                                                                           |
| :-------------------- | :-------- | :-------------------------------------------------------------------------------------------------------------- |
| `color-primary`       | `#8B3FBF` | Roxo institucional. Botões principais, status ativos e destaques de marca.                                      |
| `color-primary-dark`  | `#7121A5` | Roxo profundo para estados hover/focus e cabeçalhos escuros.                                                    |
| `color-primary-light` | `#F2EDF8` | Tom lavanda sutil para backgrounds de chips, tags e estados selecionados.                                       |
| `color-text-primary`  | `#1E0930` | Roxo berinjela quase preto. Utilizado para títulos, nomes de pacientes, valores e tipografia de alto contraste. |

### 2.2 Ações e Feedback (Action & System Colors)

| Token                  | Hex       | Descrição / Aplicação                                                                                     |
| :--------------------- | :-------- | :-------------------------------------------------------------------------------------------------------- |
| `color-action-blue`    | `#0096DE` | Azul de ação. Utilizado em links, botões de ação em mensagens (CTA Buttons, Quick Actions, List Buttons). |
| `color-whatsapp-bg`    | `#D3FFC8` | Verde claro para bolhas de mensagem enviadas pelo usuário e indicadores WhatsApp.                         |
| `color-danger`         | `#B3261E` | Vermelho para alertas, avisos de vencimento e tags de emergência.                                         |
| `color-text-secondary` | `#9DA3A7` | Cinza para carimbos de data/hora (timestamps), legendas e metadados.                                      |
| `color-dark-neutral`   | `#2C2C2C` | Cinza carvão para tags de estado ativo/on.                                                                |

### 2.3 Superfícies e Fundos (Surfaces & Containers)

| Token               | Hex       | Descrição / Aplicação                                                             |
| :------------------ | :-------- | :-------------------------------------------------------------------------------- |
| `surface-base`      | `#FFFFFF` | Branco puro para cartões, balões de mensagem e formulários.                       |
| `surface-subtle`    | `#FCFBFE` | Fundo base suave com leve matiz lilás para áreas clínicas e cards de agendamento. |
| `surface-alt`       | `#FEF7FF` | Fundo alternativo para tabs e seções secundárias.                                 |
| `border-divider`    | `#EBE4F0` | Linhas de divisão e bordas sutis de cartões.                                      |
| `image-placeholder` | `#C4C4C4` | Placeholder neutro para imagens e mídias de mensagens.                            |

---

## 3. Tipografia (Typography)

Conforme diretriz do projeto, o sistema utiliza **exclusivamente** duas famílias tipográficas: **Inter** e **Roboto**.

### 3.1 Famílias Tipográficas

- **Inter (`font-family: 'Inter', sans-serif`):**
  - Utilizada para: Títulos, cabeçalhos, dados clínicos estruturados, nomes de pacientes/procedimentos, valores monetários (ex.: `R$ 95,00`), datas e horários (`12/04/20 14:00`).
  - Pesos: Regular (400), Medium (500), SemiBold (600).
- **Roboto (`font-family: 'Roboto', sans-serif`):**
  - Utilizada para: Corpo de mensagens no chat, rótulos de botões (_Link action_, _Quick actions_), legendas, tabs e textos de apoio.
  - Pesos: Regular (400), Medium (500).

### 3.2 Escala Tipográfica

| Nível                       | Família        | Peso           | Tamanho / Line Height | Uso                                                  |
| :-------------------------- | :------------- | :------------- | :-------------------- | :--------------------------------------------------- |
| **Heading 1**               | Inter          | 600 (SemiBold) | 24px / 32px           | Título principal da página ou dashboard              |
| **Heading 2**               | Inter          | 600 (SemiBold) | 20px / 28px           | Seções clínicas e cabeçalhos de lista                |
| **Subtitle / Procedimento** | Inter          | 500 (Medium)   | 16px / 22px           | Nomes de procedimentos e valores (`v10 · Vermífugo`) |
| **Body (Mensagens)**        | Roboto         | 400 (Regular)  | 16px / 24px           | Corpo de texto em mensagens e cartões                |
| **Button / Link Action**    | Roboto         | 400 (Regular)  | 16px / 20px           | Rótulos de botões CTA e ações rápidas                |
| **Label / Tabs**            | Roboto         | 500 (Medium)   | 14px / 20px           | Rótulos de navegação em abas e inputs                |
| **Caption / Timestamp**     | Roboto / Inter | 400 (Regular)  | 12px / 16px           | Horários de envio (`11:14 AM`), badge de data        |

---

## 4. Espaçamento, Bordas e Elevações

### 4.1 Espaçamento (Spacing Scale)

- `spacing-xs`: 4px (gaps internos entre elementos de texto e botões)
- `spacing-sm`: 8px (paddings internos de cartões e gaps de grupos)
- `spacing-md`: 12px (espaçamento entre blocos de informação do paciente)
- `spacing-lg`: 16px (margens laterais padrão e espaçamento entre mensagens)
- `spacing-xl`: 24px (separação entre seções principais)

### 4.2 Raios de Borda (Border Radius)

- `radius-sm`: **4px** — Balões de mensagem, campos de formulário, botões de ação e containers internos.
- `radius-md`: **8px** — Cartões de agendamento (`NextAppointment`), cards de resumo de paciente.
- `radius-pill`: **20px a 30px** — Toggles de notificação, botões de ação redondos (`Size=sm`, `Size=md`), chips e tags de status.
- `radius-full`: **100px** — Botões de ação flutuante, avatares e badges de notificação.

### 4.3 Sombras e Elevação

- `shadow-subtle`: `0 1px 3px rgba(30, 9, 48, 0.06)` — Para cartões de agendamento e balões de mensagem.
- `shadow-floating`: `0 4px 12px rgba(113, 33, 165, 0.12)` — Para barras de navegação flutuantes e modais.

---

## 5. Padrões de Componentes (Component Library)

### 5.1 Card de Próximo Agendamento (`NextAppointment`)

- **Dimensões:** Largura padrão móvel ~365px, altura auto (~116px).
- **Estrutura:**
  - **Área Superior (`PatientInfo`):** Fundo `#FCFBFE`, cantos 8px.
    - Informações do Procedimento: `Inter 500`, 16px, cor `#1E0930` (ex.: "v10 · Vermífugo\nR$ 95,00").
    - Selo de Data/Horário: Caixa compacta centralizada com data e hora em duas linhas (12px, `#1E0930`).
    - Ação WhatsApp: Ícone de acesso rápido com 24x24px.
  - **Área Inferior (`Link`):**
    - Controles de notificação via WhatsApp e Web Push com toggles arredondados (radius 20px).

### 5.2 Sistema de Mensagens e Chat

- **Tipos de Emissor:**
  - **Empresa/Clínica (Business):** Balão branco (`#FFFFFF`), texto em Roboto 16px (`#000000`), alinhado à esquerda.
  - **Usuário/Tutor (User):** Balão verde suave (`#D3FFC8`), alinhado à direita.
- **Variações de Mídia:**
  - Com imagem: container de 266x150px (`#C4C4C4` com radius 4px) posicionado acima do texto.
  - Sem imagem: bloco de texto direto.
- **Tipos de Botão no Rodapé da Mensagem:**
  1. **CTA Buttons:** Até 2 botões empilhados com ícone à esquerda e texto em azul `#0096DE`.
  2. **Quick Action Buttons:** Até 3 botões em pilha com ações rápidas centralizadas (`#0096DE`).
  3. **List Button:** Botão único delimitado por divisor horizontal para abrir menus/listas de opções.

### 5.3 Campos de Formulário (`Input`)

- Rótulo superior em `Inter 400`, 16px, cor `#1E0930`.
- Campo de entrada com fundo `#FCFBFE`, bordas arredondadas (4px), padding confortável (8px 16px).

### 5.4 Botões Pill (`Size=sm` e `Size=md`)

- Fundo primário `#8B3FBF` com cantos arredondados de 20px a 30px.
- Texto em `Roboto 14px` na cor lavanda `#F2EDF8` com ícone vetorial de 16x16px à esquerda.

---

## 6. Diretrizes de Acessibilidade e Boas Práticas

1. **Contraste de Texto:** O texto principal em `#1E0930` sobre `#FFFFFF` e `#FCFBFE` garante uma taxa de contraste superior a 14:1, excedendo os requisitos AAA da WCAG.
2. **Área de Toque:** Todos os botões interativos (toggles, botões CTA e quick actions) devem ter uma área de toque mínima de 44x44px.
3. **Comunicação Multicanal:** Sempre oferecer indicação visual clara do canal de envio ativo (WhatsApp x Web Push) por meio dos toggles e cores de apoio.
