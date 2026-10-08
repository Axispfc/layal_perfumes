# Catálogo comercial oficial — Layal Perfumes

21 fichas transcritas do PDF fornecido Catalogo_Layal_Compactado_Codex.pdf, páginas 02–22. Nome, marca (inclusive texto legível da embalagem), preço, volume, descrição, público, perfil e três grupos de notas vêm exclusivamente desse documento. Não foram usados preços ou atributos de outras lojas. O hash SHA-256 da fonte está em src/data/official-catalog.json.

## Dados e publicação

A fonte é src/data/official-catalog.json. Os 21 registros estão published, com IDs estáveis layal-001 a layal-021, sourcePage, gender, category e preço inteiro priceCents. Todos têm 100 ml, exceto Club de Nuit Intense Man, com 105 ml. docs/catalogo-oficial-21.csv disponibiliza a transcrição para conferência. Mais vendido permanece false para todos: o PDF não apresenta ranking de vendas. Campos desconhecidos devem usar null, sem inferência.

Build, dev e test sincronizam src/data/published-products.json com os campos validados. Não editar essa saída manualmente. npm run catalog:validate valida identidades, dados e fotografias. A publicação oficial retira todos os quatro fictícios da loja e suas URLs. Fixtures de demonstração permanecem somente para compatibilidade e testes; não integram a coleção oficial.

## Pontos de conferência comercial

O PDF contém duas fichas com o nome Ana Al Awwal (04 feminina, 05 unissex) e duas com o nome Fakhar (07 e 08, ambas unissex), com notas/embalagens distintas. Mantivemos os nomes e criamos IDs/URLs distintos com ficha-XX; os cards mostram público e ficha. Não renomeamos nenhuma ficha para Gold, Black ou outra variante por suposição. A correspondência de Fakhar Gold mencionado na solicitação com as fichas do PDF ainda depende de confirmação da Layal.

Na ficha 13 (Liberté), “Pimenta Peta” foi preservada literalmente como no PDF. Não usamos a internet para corrigir notas ou classificações. O campo family conserva o perfil olfativo publicado, incluindo descritores; não atribui classificação adicional.

## Fotografias

21 pendentes; placeholders claramente identificados. Consulte docs/FOTOGRAFIAS.md e docs/product-photo-sources.json para fontes candidatas e impedimento de download. Não foram recortadas as artes comerciais do PDF nem geradas fotografias substitutas.

Para completar, fornecer um ZIP dos originais associados aos IDs/fichas da planilha, ou liberar o acesso de rede às fontes selecionadas. Nomes de arquivos em minúsculas, sem acentos, com hífens: marca-perfume-volume-principal.ext. Em nomes repetidos, incluir ficha-XX. Arquivos em public/images/products/ e caminhos /images/products/. Imagens exibidas inteiras, sem filtro e sem mudança de cores/embalagens.

## Funcionamento e revisão

Carrinho mantém quantidades, persistência e cálculo em centavos. Itens fictícios antigos são descartados ao recarregar. Filtros e páginas usam os 21 oficiais. Não há checkout financeiro, pagamentos, reserva de estoque, merge ou publicação em produção. PR #1 permanece aberto para revisão.
