# Layal Perfumes

Loja em Next.js App Router, TypeScript e Tailwind CSS, com identidade preta e dourada, catálogo comercial oficial e layouts responsivos. Mudanças isoladas em `feat/layal-storefront`, para revisão no [PR #1](https://github.com/Axispfc/layal_perfumes/pull/1). Sem merge ou publicação em produção.

## Visualizar localmente

Requer Node.js 20.9+ (recomendado 22) e acesso ao npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Abra http://localhost:3000. Nenhuma variável é necessária para explorar o catálogo e o carrinho. Para produção local: `npm run build` e `npm start`.

## Catálogo e fotografias

21 fichas do PDF comercial oficial fornecido pela Layal, páginas 02–22. Nomes, marcas, preços em reais, volumes, descrições, público, perfis e notas foram transcritos desse documento. Preços de outras lojas não são usados. A fonte versionada está em `src/data/official-catalog.json`; build/dev/test geram `published-products.json` com os registros validados.

Os quatro fictícios saíram da coleção pública. As duas fichas Ana Al Awwal e as duas Fakhar mantêm nomes iguais aos do PDF, com IDs/URLs distintos e a ficha indicada na interface. Variantes comerciais não foram presumidas. Mais vendidos permanece sem produtos até confirmação da Layal.

As 21 fotografias seguem pendentes de obtenção e conferência. Produtos oficiais usam placeholders identificados, nunca ilustrações de outros perfumes. A arte conceitual do hero continua sinalizada como tal. Não há vídeo fictício.

- [Transcrição e critérios](docs/CATALOGO-OFICIAL.md)
- [Planilha de conferência](docs/catalogo-oficial-21.csv)
- [Lista de fotos e pendências](docs/FOTOGRAFIAS.md)
- [Registro de fontes candidatas](docs/product-photo-sources.json)

## Funcionalidades

- Home, catálogo e páginas individuais para todos os registros oficiais.
- Filtros masculino, feminino, unissex, kits e mais vendidos.
- Carrinho persistente, controles de quantidade, remoção e subtotal em centavos.
- Atendimento flutuante, rodapé, menu móvel, navegação por teclado e preferência de movimento reduzido.
- Estrutura para o futuro quiz, ainda sem recomendações automatizadas.

Não há pagamentos, checkout financeiro, pedidos, reserva de estoque ou garantia de disponibilidade. A loja permanece sem indexação nesta etapa.

## Configuração

Variáveis públicas em `.env.example`: `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_CONTACT_EMAIL` e `NEXT_PUBLIC_INSTAGRAM_URL`. Sem telefone, o atendimento mostra aviso de disponibilidade futura. Nunca colocar segredos em variáveis `NEXT_PUBLIC_*`.

Vídeo oficial: adicionar `public/videos/layal-hero.mp4` e recompilar. A home detecta o arquivo no build, aplica camada escura e respeita movimento reduzido. Consulte `public/videos/README.md`.

## Arquitetura

`src/app`: rotas; `src/components`: interface; `src/data`: catálogo oficial e fixtures de teste; `src/lib/catalog.ts`: acesso ao catálogo; `src/lib/cart.ts`: validação e cálculo; `src/lib/quiz.ts`: contrato futuro. Uma futura integração de estoque, banco e pagamentos deverá validar disponibilidade e preços no servidor.

## Verificações

```sh
npm run catalog:validate
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium
npm run test:e2e
```

O GitHub Actions instala via `npm ci`, audita dependências, valida dados, executa lint/TypeScript/testes/build e Playwright em Chromium para computador e celular. Os testes cobrem os 21 preços do PDF, notas de fonte, volumes, páginas individuais, filtros, persistência, quantidades, remoção, subtotal, quiz e 404. As capturas de home, catálogo, produto e carrinho ficam nos artefatos de validação por sete dias.

Localmente, a instalação desta etapa falhou com `connect EPERM 172.31.7.61:8080` ao baixar dependências do npm. Sucessos devem ser confirmados pelo CI; nenhuma verificação local dependente dessas ferramentas foi considerada aprovada.

A análise de segurança e a pendência conhecida de desenvolvimento estão em [docs/SECURITY.md](docs/SECURITY.md). Opções de prévia: [docs/PREVIEW.md](docs/PREVIEW.md). Nenhuma hospedagem foi configurada nesta etapa.
