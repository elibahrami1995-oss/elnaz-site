import { createClient } from '@supabase/supabase-js';
import { embedText } from './rag.js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Short-term: in-process map { sessionId -> Message[] }
// Each message: { role: 'user'|'assistant', content: string }
const shortTermStore = new Map();
const SHORT_TERM_LIMIT = 20; // max messages kept per session

export function getShortTermMemory(sessionId) {
  return shortTermStore.get(sessionId) || [];
}

export function addToShortTerm(sessionId, role, content) {
  const history = shortTermStore.get(sessionId) || [];
  history.push({ role, content });
  if (history.length > SHORT_TERM_LIMIT) {
    history.splice(0, history.length - SHORT_TERM_LIMIT);
  }
  shortTermStore.set(sessionId, history);
}

// Long-term: Supabase memories table, per userId
export async function saveLongTermMemory(userId, content) {
  const embedding = await embedText(content);
  const { error } = await supabase.from('memories').insert({
    user_id: userId,
    content,
    embedding,
  });
  if (error) console.error('Save memory error:', error.message);
}

export async function getLongTermMemory(userId, query) {
  const embedding = await embedText(query);
  const { data, error } = await supabase.rpc('match_memories', {
    query_embedding: embedding,
    user_id_filter: userId,
    match_threshold: 0.55,
    match_count: 3,
  });
  if (error) {
    console.error('Get memory error:', error.message);
    return [];
  }
  return data || [];
}
