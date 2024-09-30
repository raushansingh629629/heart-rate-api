CREATE DATABASE monitor_heart_rate_db;

CREATE TABLE heart_rates (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  heart_rate JSONB NOT NULL,
  steps JSONB,
  weight JSONB,
  blood_glucose_level JSONB,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);