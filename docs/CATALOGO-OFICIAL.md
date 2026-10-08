# Entrega do catálogo oficial — 21 perfumes

A identidade preta e dourada foi preservada. Nenhum perfume real ou foto foi inventado. `src/data/official-catalog.json` contém 21 espaços de cadastro com IDs `layal-001` a `layal-021`, todos em `draft`, com dados ainda não fornecidos em `null`. Esses registros não aparecem no site.

## Como fornecer os dados

Envie uma planilha CSV/XLSX com uma linha por perfume. O modelo para preencher está em `docs/catalogo-oficial-21.csv`. Também pode enviar os dados em JSON usando `src/data/official-catalog.json`.

Campos:

| Campo na planilha | Informação necessária |
| --- | --- |
| id | Manter o ID do modelo, estável após publicação |
| status | `draft` enquanto incompleto; `published` após revisão dos dados oficiais |
| slug | Nome para URL, minúsculo, sem acentos e separado por hífens; único |
| nome / marca | Nome comercial e marca exatos |
| preco_brl | Preço oficial em reais; especificar moeda se diferente de BRL |
| volume | Volume exato da apresentação, incluindo unidade |
| categoria | `masculino`, `feminino`, `unissex` ou `kits` |
| descricao | Descrição aprovada, sem características presumidas |
| familia | Família olfativa oficial, se fornecida; pode ficar vazia |
| notas_saida / notas_coracao / notas_fundo | Notas oficiais; vazio significa não informado, nunca completar por dedução |
| fotografia | Nome do arquivo correspondente; vazio se ainda não enviado |
| mais_vendido | `true` somente quando confirmado; padrão `false` |

O campo JSON `priceCents` armazena um inteiro em centavos, não um decimal. Ao receber a planilha, os valores em reais deverão ser convertidos sem arredondamentos inesperados. No JSON, `photoPath`, `family` e cada nota usam `null` quando não informados. Nome, marca, preço, volume, categoria, descrição e slug são obrigatórios para publicar.

Não é necessário enviar tudo de uma vez: rascunhos permanecem privados e somente cadastros aprovados entram no catálogo.

## Como fornecer as fotografias

Envie um ZIP com os arquivos originais e associe cada fotografia ao ID da planilha. Pode enviar JPG/JPEG, PNG ou WebP. Use fotografias próprias ou autorizadas, dos frascos corretos, com rótulos legíveis. Recomenda-se boa resolução (por exemplo, pelo menos 1200 pixels no lado maior), sem baixa compressão que comprometa os detalhes.

Padrão: `marca-perfume-volume-principal.ext`, com letras minúsculas, números e hífens, sem acentos/espaços. Se houver apresentações diferentes, o volume deve diferenciá-las. Os arquivos ficam em `public/images/products/` e o caminho JSON começa com `/images/products/`.

Arquivos não serão alterados, recoloridos, recortados, retocados ou substituídos por fotos de outros perfumes. A apresentação usa `object-fit: contain`, sem filtros e com a otimização de imagem desativada para servir o arquivo original. Fotografias ausentes ou que falhem ao carregar recebem um espaço reservado “Fotografia oficial em breve”. Produtos oficiais nunca usam a ilustração de frasco da demonstração como substituta.

## Ativação e revisão

`npm run catalog:validate` verifica a estrutura, os IDs, slugs, valores, categorias e caminhos; informa o número de rascunhos e publicados e alerta sobre fotografias ainda ausentes.

Se não houver oficiais publicados, o catálogo demonstrativo permanece identificado. Ao publicar o primeiro cadastro oficial, todos os produtos fictícios são retirados do catálogo público e suas URLs deixam de existir. Não há mistura entre as duas fontes. Os demais cadastros oficiais permanecem privados até serem aprovados. Reexecute build/deploy após cadastrar os dados e fotografias.

O carrinho conserva IDs e quantidades; na recarga, itens da demonstração ou produtos retirados do catálogo são descartados, sem conversão para outro perfume. Os preços e o subtotal passam a usar os dados oficiais. Ainda não há checkout, pagamento ou reserva de estoque.

Execute lint, TypeScript, testes unitários, build e Playwright antes de atualizar o PR. Os testes funcionais usam os produtos ativos, para continuar validando os fluxos após a entrada do catálogo real. O PR #1 deve permanecer aberto, sem merge automático.
