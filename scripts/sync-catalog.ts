import {writeFileSync} from 'node:fs';
import {join} from 'node:path';
import officialData from '../src/data/official-catalog.json' with {type:'json'};
import {parseOfficialCatalog} from '../src/lib/official-catalog';
const products=parseOfficialCatalog(officialData);
const published=products.map(p=>({...p,status:'published',family:p.family??null,photoPath:p.photoPath??null}));
writeFileSync(join(process.cwd(),'src/data/published-products.json'),JSON.stringify(published,null,2)+'\n');
console.log(`Fonte pública sincronizada: ${published.length} perfumes oficiais. Rascunhos não são enviados ao navegador.`);
