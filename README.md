# Layal Perfumes

Primeira versão demonstrativa do e-commerce, em Next.js App Router, TypeScript e Tailwind CSS. Identidade visual em preto profundo, dourado champagne e marfim, com layouts responsivos.

## Visualizar localmente

Requer Node.js 20.9+ (recomendado 22) e acesso ao npm.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Abra http://localhost:3000. Não é necessário configurar variáveis para explorar o catálogo e o carrinho. Para produção local: `npm run build` e `npm start`.

## Funcionalidades

- Home, espaço para vídeo cinematográfico e identidade provisória.
- Catálogo com filtros masculino, feminino, kits e mais vendidos demonstrativos.
- Página individual, notas olfativas, volume e adição ao carrinho.
- Carrinho persistente no navegador, alteração de quantidade, remoção e subtotal em centavos.
- Atendimento flutuante, rodapé e página preparada para o futuro quiz.
- Navegação por teclado, menu móvel, avisos de demonstração e preferência de movimento reduzido.

Todos os nomes, preços, volumes e notas são **fictícios**, claramente sinalizados na interface. Os frascos são ilustrações conceituais em CSS, não fotos oficiais. Mais vendidos não representa dados reais. Nenhum pagamento, pedido, reserva de estoque ou checkout financeiro é implementado. A demonstração envia instrução para não indexar as páginas.

## Configuração oficial futura

As variáveis públicas são documentadas em `.env.example`:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`: telefone oficial com código do país e DDD. Sem valor, o botão mostra aviso de atendimento em breve.
- `NEXT_PUBLIC_CONTACT_EMAIL`: e-mail oficial.
- `NEXT_PUBLIC_INSTAGRAM_URL`: URL oficial completa.
- `NEXT_PUBLIC_HERO_VIDEO_URL`: URL de vídeo autorizado. Sem valor, a home exibe a composição visual com aviso de espaço reservado.

Nunca coloque segredos em variáveis `NEXT_PUBLIC_*`. Reinicie/recompile ao alterar as variáveis.

## Organização e integrações

`src/app` contém as rotas; `src/components`, os componentes; `src/data/products.ts`, as fixtures; `src/lib/catalog.ts`, a interface de acesso ao catálogo; `src/lib/cart.ts`, validação e cálculo; `src/lib/quiz.ts`, o contrato futuro do quiz.

Substitua o repositório de demonstração por uma integração com banco de dados e passe a validar preços e estoque no servidor antes de implementar pedidos. O carrinho atual só demonstra interação local e não oferece garantias de disponibilidade. O quiz aguarda informações oficiais para recomendar produtos. Nenhum provedor de pagamento foi configurado.

## Verificações

```sh
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install --with-deps chromium
npm run build
npm run test:e2e
```

Testes do carrinho cobrem dados corrompidos, quantidades, duplicatas e subtotal. Testes de navegador cobrem produto/carrinho, persistência, filtros, layout desktop/móvel, quiz e 404. O workflow do GitHub executa essas verificações.

## Estado da entrega

Mudanças isoladas na branch `feat/layal-storefront`. A branch principal não foi alterada.

A revisão confirmou as rotas, componentes, fixtures, configuração e testes versionados. Foi acrescentado `next-env.d.ts` para que as referências de tipos do Next.js estejam disponíveis antes do primeiro build.

A instalação foi tentada novamente e falhou com `EPERM` ao conectar ao proxy `172.31.7.61:8080` para acessar `https://registry.npmjs.org/@playwright%2ftest`. A tentativa de permissão adicional foi interrompida. Não foi possível instalar dependências ou gerar lockfile.

Os comandos de build, lint, TypeScript e testes foram tentados, mas falharam pela ausência dos executáveis locais (`next`, `eslint`, `tsc`, `tsx`; o comando `playwright` disponível não reconhece `test`). **Nenhuma dessas verificações passou no ambiente local.** `git diff origin/main --check` passou. A validação funcional e visual continua pendente, assim como a revisão do lockfile após a primeira instalação autorizada.

## Resultado do primeiro CI no GitHub

O GitHub Actions instalou as dependências, aprovou lint (com um aviso), TypeScript e os três testes unitários do carrinho. O build falhou porque `package.json` declarava CommonJS enquanto os arquivos usam módulos ES. A declaração foi corrigida para `type: module` e o aviso de exportação anônima no PostCSS foi removido. O build e os testes de navegador precisam ser confirmados na execução seguinte.

## Testes de navegador

Playwright inicia a versão de produção (`npm start`), após o build. O CI publica o relatório de auditoria, lockfile resolvido, relatório HTML e capturas/rastros de falhas como artefatos por sete dias. Assim os testes não dependem de HMR ou permissões de origem do servidor de desenvolvimento.

## Validação e prévia

O CI aprovou build, lint, TypeScript, três testes unitários e seis testes de navegador após trocar o servidor de desenvolvimento pelo de produção. O lockfile foi recuperado do artefato do CI, preservando as versões testadas. O CI usa `npm ci`. Novas capturas da home em desktop/celular também são coletadas no próximo ciclo.

A análise de segurança e a pendência de desenvolvimento estão em [docs/SECURITY.md](docs/SECURITY.md). As opções e instruções de hospedagem da prévia estão em [docs/PREVIEW.md](docs/PREVIEW.md). Nenhum endereço externo foi publicado.
