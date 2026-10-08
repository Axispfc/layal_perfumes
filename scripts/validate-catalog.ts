import {existsSync} from 'node:fs';
import {join} from 'node:path';
import data from '../src/data/official-catalog.json' with {type:'json'};
import {parseOfficialCatalog} from '../src/lib/official-catalog';
const published=parseOfficialCatalog(data);
console.log(`Catálogo válido: ${data.products.length} cadastros, ${published.length} publicados, ${data.products.length-published.length} rascunhos.`);
for(const product of published){
 if(!product.photoPath || !existsSync(join(process.cwd(),'public',product.photoPath)))console.warn(`${product.id}: fotografia pendente; o site usará o espaço reservado identificado.`);
}
