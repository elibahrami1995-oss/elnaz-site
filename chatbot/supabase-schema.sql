-- ======================================================
-- Elnaz Chatbot — Supabase Schema
-- Run this in your Supabase SQL Editor
-- ======================================================

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Documents table (RAG knowledge base)
CREATE TABLE IF NOT EXISTS documents (
  id        BIGSERIAL PRIMARY KEY,
  content   TEXT        NOT NULL,
  metadata  JSONB       DEFAULT '{}',
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS documents_embedding_idx
  ON documents USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 3. Long-term memory per user
CREATE TABLE IF NOT EXISTS memories (
  id        BIGSERIAL PRIMARY KEY,
  user_id   TEXT        NOT NULL,
  content   TEXT        NOT NULL,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS memories_user_idx ON memories (user_id);
CREATE INDEX IF NOT EXISTS memories_embedding_idx
  ON memories USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 50);

-- 4. Leads (captured via chatbot)
CREATE TABLE IF NOT EXISTS leads (
  id       BIGSERIAL PRIMARY KEY,
  name     TEXT,
  phone    TEXT,
  email    TEXT,
  interest TEXT,
  source   TEXT        DEFAULT 'unknown',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Registrations (for status-check tool)
CREATE TABLE IF NOT EXISTS registrations (
  id          BIGSERIAL PRIMARY KEY,
  phone       TEXT,
  email       TEXT,
  course_name TEXT        NOT NULL,
  status      TEXT        DEFAULT 'pending',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ======================================================
-- RPC Functions
-- ======================================================

-- match_documents: semantic search over knowledge base
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1536),
  match_threshold FLOAT  DEFAULT 0.7,
  match_count     INT    DEFAULT 5
)
RETURNS TABLE (
  id         BIGINT,
  content    TEXT,
  metadata   JSONB,
  similarity FLOAT
)
LANGUAGE SQL STABLE AS $$
  SELECT
    id,
    content,
    metadata,
    1 - (embedding <=> query_embedding) AS similarity
  FROM documents
  WHERE 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;

-- match_memories: semantic search over a specific user's long-term memory
CREATE OR REPLACE FUNCTION match_memories(
  query_embedding  VECTOR(1536),
  user_id_filter   TEXT,
  match_threshold  FLOAT  DEFAULT 0.6,
  match_count      INT    DEFAULT 3
)
RETURNS TABLE (
  id         BIGINT,
  content    TEXT,
  similarity FLOAT
)
LANGUAGE SQL STABLE AS $$
  SELECT
    id,
    content,
    1 - (embedding <=> query_embedding) AS similarity
  FROM memories
  WHERE
    user_id = user_id_filter
    AND 1 - (embedding <=> query_embedding) > match_threshold
  ORDER BY embedding <=> query_embedding
  LIMIT match_count;
$$;
