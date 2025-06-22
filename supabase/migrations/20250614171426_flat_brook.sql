/*
  # Create Content Tables

  1. New Tables
    - `jobs` - Job categories with metadata
    - `job_prompt_structures` - Prompt templates for each job
    - `tools` - AI tools directory
    - `use_cases` - Job-specific tutorials and guides
    - `glossary_terms` - AI terminology definitions
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  use_case_count INTEGER NOT NULL DEFAULT 0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create job_prompt_structures table
CREATE TABLE IF NOT EXISTS job_prompt_structures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  example TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create tools table
CREATE TABLE IF NOT EXISTS tools (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  pros TEXT[] NOT NULL DEFAULT '{}',
  cons TEXT[] NOT NULL DEFAULT '{}',
  use_cases TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create use_cases table
CREATE TABLE IF NOT EXISTS use_cases (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  time_estimate TEXT NOT NULL,
  tools TEXT[] NOT NULL DEFAULT '{}',
  steps JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create glossary_terms table
CREATE TABLE IF NOT EXISTS glossary_terms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  term TEXT NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_prompt_structures ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE use_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE glossary_terms ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access for jobs" ON jobs
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for job_prompt_structures" ON job_prompt_structures
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for tools" ON tools
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for use_cases" ON use_cases
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access for glossary_terms" ON glossary_terms
  FOR SELECT USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS jobs_featured_idx ON jobs(featured);
CREATE INDEX IF NOT EXISTS job_prompt_structures_job_id_idx ON job_prompt_structures(job_id);
CREATE INDEX IF NOT EXISTS job_prompt_structures_order_idx ON job_prompt_structures(job_id, order_index);
CREATE INDEX IF NOT EXISTS tools_category_idx ON tools(category);
CREATE INDEX IF NOT EXISTS use_cases_job_id_idx ON use_cases(job_id);
CREATE INDEX IF NOT EXISTS glossary_terms_category_idx ON glossary_terms(category);

-- Add full-text search capabilities
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || description)) STORED;

ALTER TABLE tools ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', name || ' ' || description)) STORED;

ALTER TABLE use_cases ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', title || ' ' || description)) STORED;

ALTER TABLE glossary_terms ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', term || ' ' || definition)) STORED;

CREATE INDEX IF NOT EXISTS jobs_search_idx ON jobs USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS tools_search_idx ON tools USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS use_cases_search_idx ON use_cases USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS glossary_terms_search_idx ON glossary_terms USING GIN (search_vector);

-- Add update triggers for timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_jobs_timestamp
BEFORE UPDATE ON jobs
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_job_prompt_structures_timestamp
BEFORE UPDATE ON job_prompt_structures
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_tools_timestamp
BEFORE UPDATE ON tools
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_use_cases_timestamp
BEFORE UPDATE ON use_cases
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_glossary_terms_timestamp
BEFORE UPDATE ON glossary_terms
FOR EACH ROW EXECUTE FUNCTION update_timestamp();