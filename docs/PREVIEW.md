# Prévia visual da Layal Perfumes

A prévia deve usar a branch `feat/layal-storefront`, mantendo o PR #1 aberto. Não é necessário integrar à `main` nem configurar domínio, pagamentos ou banco de dados.

## Vercel (opção recomendada)

1. Na sua conta Vercel, importe `Axispfc/layal_perfumes` como projeto Next.js, dando acesso somente a esse repositório.
2. Mantenha a branch de produção como `main`. Se o deploy inicial da `main` falhar (ela ainda não contém a aplicação), não integre o PR para contornar isso.
3. No projeto, crie um deploy da branch `feat/layal-storefront` como **Preview**. As atualizações dessa branch devem gerar novas prévias.
4. Use Node.js 22, instalação `npm install` (ou `npm ci` quando o lockfile estiver versionado), build `npm run build` e diretório de saída padrão do Next.js.
5. Nenhuma variável é necessária para a demonstração. Dados oficiais futuros são documentados em `.env.example`.
6. Compartilhe o endereço de Preview. Confira a proteção de acesso da Vercel se o endereço exigir login.

## Netlify

Importe apenas o mesmo repositório, selecione Next.js e configure um branch deploy para `feat/layal-storefront` ou um deploy preview do PR #1. Use Node.js 22 e a integração oficial de Next.js da plataforma. Não use publicação estática simples: o catálogo usa parâmetros de consulta e a aplicação mantém rotas Next.js.

## Revisão no navegador

Teste a prévia no computador e no celular: home, categorias, detalhe, adição ao carrinho, alteração de quantidades, recarga, remoção e navegação móvel. Confira se avisos de demonstração continuam visíveis, se não há rolagem horizontal e se botões de atendimento sem contato oficial exibem o aviso correto.

A escolha da plataforma e a conexão à conta são necessárias antes de publicar um endereço externo. Nenhum serviço foi configurado automaticamente.
