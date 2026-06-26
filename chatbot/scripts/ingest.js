/**
 * RAG Ingestion Script
 * Usage: node scripts/ingest.js path/to/file.txt
 *        node scripts/ingest.js path/to/file.md  --source "خدمات"
 *
 * Splits text into overlapping chunks, embeds them, and stores in Supabase.
 */
import 'dotenv/config';
import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const openai   = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node scripts/ingest.js <file.txt>');
  process.exit(1);
}

const sourceLabel = process.argv.includes('--source')
  ? process.argv[process.argv.indexOf('--source') + 1]
  : filePath;

const text = readFileSync(filePath, 'utf-8');

function splitIntoChunks(text, chunkSize = 400, overlap = 80) {
  const sentences = text.split(/(?<=[.!?؟]\s)/);
  const chunks    = [];
  let   current   = '';

  for (const s of sentences) {
    if ((current + s).length > chunkSize && current) {
      chunks.push(current.trim());
      // Keep overlap: last ~overlap chars of current
      current = current.slice(-overlap) + s;
    } else {
      current += s;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(c => c.length > 30);
}

async function embed(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8191),
  });
  return res.data[0].embedding;
}

async function run() {
  const chunks = splitIntoChunks(text);
  console.log(`Ingesting ${chunks.length} chunks from "${filePath}"…\n`);

  for (let i = 0; i < chunks.length; i++) {
    const chunk     = chunks[i];
    const embedding = await embed(chunk);

    const { error } = await supabase.from('documents').insert({
      content:   chunk,
      metadata:  { source: sourceLabel, chunk_index: i },
      embedding,
    });

    if (error) {
      console.error(`  [${i+1}] ERROR:`, error.message);
    } else {
      console.log(`  [${i+1}/${chunks.length}] ✓  ${chunk.slice(0, 60)}…`);
    }

    // Small delay to avoid rate limits
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\nDone! ✅');
}

run().catch(console.error);
