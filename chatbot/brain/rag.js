import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function embedText(text) {
  const res = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text.slice(0, 8191), // model token limit
  });
  return res.data[0].embedding;
}

export async function searchDocuments(query, topK = 5) {
  const embedding = await embedText(query);
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
    match_threshold: 0.65,
    match_count: topK,
  });
  if (error) {
    console.error('RAG search error:', error.message);
    return [];
  }
  return data || [];
}
