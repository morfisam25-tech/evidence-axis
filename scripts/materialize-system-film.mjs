import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const parts = [0, 1, 2, 3].map((i) =>
  readFileSync(`assets-source/system-film.${i}.b64`, 'utf8').trim()
);
const bytes = Buffer.from(parts.join(''), 'base64');
if (bytes.length !== 12349) {
  throw new Error(`Unexpected system film size: ${bytes.length}`);
}
const out = 'public/assets/v10/approved/system-film.mp4';
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, bytes);
console.log(`Materialized ${out} (${bytes.length} bytes)`);
