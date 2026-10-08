import test from 'node:test';
import assert from 'node:assert/strict';
import {parseOfficialCatalog,selectPublicCatalog} from '../src/lib/official-catalog';
import {demoProducts} from '../src/data/demo-products';
import officialData from '../src/data/official-catalog.json' with {type:'json'};
import {sanitizeCart,subtotal} from '../src/lib/cart';
const entry=()=>({id:'layal-test',status:'published',slug:'produto-test',name:'Produto de teste técnico',brand:'Marca de teste técnico',priceCents:12345,volume:'50 ml',category:'unissex',description:'Fixture exclusiva dos testes automatizados.',family:null,notes:{top:null,heart:null,base:null},photoPath:null,bestseller:false});
const parse=(items:unknown[])=>parseOfficialCatalog({schemaVersion:1,products:items});
test('21 real commercial PDF records replace every demo and retain Layal prices',()=>{
 const official=parseOfficialCatalog(officialData);
 assert.equal(official.length,21);
 assert.deepEqual(official.map(p=>p.priceCents),[31900,24900,24900,24900,59900,29900,29900,34900,30900,30900,23900,20900,27900,22900,28900,27900,28900,45900,59900,29900,29900]);
 assert.deepEqual(official.map(p=>p.sourcePage),Array.from({length:21},(_,i)=>i+2));
 assert.equal(official.at(-1)?.volume,'105 ml');
 assert.ok(official.slice(0,-1).every(p=>p.volume==='100 ml'));
 assert.ok(selectPublicCatalog(official,demoProducts).every(p=>!p.isDemo && p.id.startsWith('layal-')));
 assert.equal(official.find(p=>p.name==='Afeef')?.notes.top,'Pera, Bergamota, Pêssego e Frutas Vermelhas');
 assert.ok(official.every(p=>!p.bestseller));
});
test('unfilled drafts stay private and do not leak into the public source',()=>{
 assert.deepEqual(parse([{id:'layal-draft',status:'draft',name:null}]),[]);
 assert.equal(selectPublicCatalog([],demoProducts),demoProducts);
});
test('official publication removes all demo products and supports missing notes and photos',()=>{
 const official=parse([entry()]);const active=selectPublicCatalog(official,demoProducts);
 assert.deepEqual(active,official);assert.equal(active[0].isDemo,false);assert.equal(active[0].photoPath,null);assert.equal(active[0].notes.top,null);
 assert.deepEqual(sanitizeCart([{id:'demo-1',quantity:2},{id:'layal-test',quantity:2}],active),[{id:'layal-test',quantity:2}]);
 assert.equal(subtotal([{id:'layal-test',quantity:2}],active),24690);
});
test('rejects unsafe prices, duplicate identities and incomplete published records',()=>{
 assert.throws(()=>parse([{...entry(),priceCents:12.3}]));assert.throws(()=>parse([{...entry(),priceCents:-1}]));
 assert.throws(()=>parse([entry(),entry()]));assert.throws(()=>parse([entry(),{...entry(),id:'layal-another'}]));
 assert.throws(()=>parse([{...entry(),id:'demo-1'}]));
 assert.throws(()=>parse([{...entry(),name:null}]));assert.throws(()=>parse([{...entry(),brand:''}]));assert.throws(()=>parse([{...entry(),notes:{}}]));
});
test('only normalized local official photo paths are accepted',()=>{
 assert.equal(parse([{...entry(),photoPath:'/images/products/marca-produto-50ml-principal.jpg'}])[0].photoPath,'/images/products/marca-produto-50ml-principal.jpg');
 for(const path of ['https://example.com/another-perfume.jpg','/images/products/../wrong.jpg','/images/products/Photo.JPG','/images/products/a.svg'])assert.throws(()=>parse([{...entry(),photoPath:path}]));
});
