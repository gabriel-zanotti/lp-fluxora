# LP Fluxora

Landing page institucional de um SaaS de gestao financeira, com foco em conversao, navegacao interativa e visual moderno.

## Sobre o projeto

A LP foi criada para apresentar a proposta de valor da Fluxora com uma experiencia premium, destacando:

- Recursos do produto
- Resultados de negocio
- Planos de assinatura
- Chamada para demonstracao (demo)

O projeto e 100% front-end estatico (HTML, CSS e JavaScript), sem dependencias de framework.

## Paginas

- `index.html`
  - Home com hero, preview de recursos, demo interativa e FAQ
- `pages/recursos.html`
  - Catalogo de funcionalidades com filtro por categoria
- `pages/resultados.html`
  - KPIs com animacao, cases e roadmap de 90 dias
- `pages/planos.html`
  - 3 planos (Essencial, Profissional e Enterprise) com alternancia mensal/anual

## Estrutura de pastas

```text
lp-fluxora/
  index.html
  assets/
    css/
      main.css
    js/
      main.js
  pages/
    recursos.html
    resultados.html
    planos.html
```

## Interacoes implementadas

- Efeito magnetico + ripple nos botoes
- Animacoes de entrada por scroll (`IntersectionObserver`)
- Barra de progresso da rolagem no topo
- Menu com destaque automatico da pagina ativa
- Demo com abas interativas (caixa, cobranca, forecast)
- Formulario de demo com feedback visual
- FAQ em acordeao
- Filtro de cards na pagina de recursos
- Toggle mensal/anual na pagina de planos
- Contadores animados na pagina de resultados
- Scroll suave com compensacao do header fixo para anchors

## Como executar localmente

1. Abra a pasta `lp-fluxora`.
2. Execute o arquivo `index.html` no navegador.

Opcional (PowerShell):

```powershell
start .\index.html
```

## Objetivo de negocio

Converter visitantes em oportunidades comerciais para o SaaS de gestao financeira, comunicando valor de forma clara e com experiencia visual refinada.

## Autor

Desenvolvido por Gabriel Zanotti com suporte de implementacao e estruturacao tecnica via Codex.
