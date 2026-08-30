import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const slug = 'actualyze-ai-brief-0710642b';

const materialize = (name, partCount, expectedBytes) => {
  const parts = Array.from({ length: partCount }, (_, i) =>
    readFileSync(`assets-source/gift11-${name}.${i}.b64`, 'utf8').trim()
  );
  const bytes = Buffer.from(parts.join(''), 'base64');
  if (bytes.length !== expectedBytes) {
    throw new Error(`Unexpected Gift #11 ${name} size: ${bytes.length}`);
  }
  const out = `public/deliveries/${slug}/${name}.pdf`;
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, bytes);
  console.log(`Materialized ${out} (${bytes.length} bytes)`);
};

materialize('deck', 6, 76385);
materialize('appendix', 6, 87140);
