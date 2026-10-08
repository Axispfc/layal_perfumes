import test from 'node:test';
import assert from 'node:assert/strict';
import {sanitizeCart as sanitize,subtotal as total} from '../src/lib/cart';
import {demoProducts} from '../src/data/demo-products';
const sanitizeCart=(value:unknown)=>sanitize(value,demoProducts);
const subtotal=(items:Parameters<typeof total>[0])=>total(items,demoProducts);
test('ignores corrupt, unknown and invalid stored cart entries',()=>{
 assert.deepEqual(sanitizeCart(null),[]);
 assert.deepEqual(sanitizeCart([{id:'unknown',quantity:1},{id:'demo-1',quantity:-1},{id:'demo-2',quantity:1.5},null]),[]);
});
test('merges duplicate products and caps quantities at 99',()=>{
 assert.deepEqual(sanitizeCart([{id:'demo-1',quantity:80},{id:'demo-1',quantity:30}]),[{id:'demo-1',quantity:99}]);
});
test('calculates subtotal in integer cents and removes zero quantities',()=>{
 assert.equal(subtotal([{id:'demo-1',quantity:2},{id:'demo-2',quantity:1}]),90700);
 assert.deepEqual(sanitizeCart([{id:'demo-1',quantity:0}]),[]);
 assert.equal(subtotal([]),0);
});
