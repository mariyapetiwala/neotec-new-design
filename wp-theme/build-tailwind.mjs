import fs from 'node:fs/promises';
import path from 'node:path';
import { compile } from '@tailwindcss/node';
const base=path.resolve('wp-theme/my-theme');
const input=await fs.readFile(path.join(base,'theme-src.css'),'utf8');
const compiler=await compile(input,{base,onDependency(){}});
const files=['front-page.php','header.php','footer.php','page.php','single.php','index.php'].map(f=>path.join(base,f));
async function walk(dir){for(const ent of await fs.readdir(dir,{withFileTypes:true})){const file=path.join(dir,ent.name);if(ent.isDirectory())await walk(file);else if(file.endsWith('.php'))files.push(file)}}
await walk(path.join(base,'template-parts'));
const classes=new Set();
for(const file of files){const content=await fs.readFile(file,'utf8');for(const match of content.matchAll(/class="([^"]+)"/g))for(const cls of match[1].split(/\s+/))classes.add(cls)}
const utilities=compiler.build([...classes]);
const css=input.replace('@import "tailwindcss" source(none);','').replace('@source "../src";','').replace('@import "tw-animate-css";','');
await fs.writeFile(path.join(base,'assets/theme.css'),utilities+'\n'+css);
console.log(`Generated ${classes.size} Tailwind candidates.`);
