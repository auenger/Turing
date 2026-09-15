import {build} from 'esbuild';

await build({
  entryPoints:['src/lab/LogoAnimation.tsx'],
  outfile:'public/logo-animation.js',
  bundle:true,
  format:'iife',
  platform:'browser',
  target:['es2022'],
  jsx:'automatic',
  minify:true,
  legalComments:'eof',
  define:{'process.env.NODE_ENV':'"production"'},
});
console.log('Built public/logo-animation.js');
await build({
  entryPoints:['src/lib/logo-geometry.js'],
  outfile:'public/logo-geometry.js',
  bundle:true,
  format:'esm',
  platform:'browser',
  target:['es2022'],
  minify:true,
});
console.log('Built public/logo-geometry.js');
