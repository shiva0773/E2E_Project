import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function required(name) {
  const value = process.env[name];
  if (value === undefined || value === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// The rest of the framework reads configuration only from here.
export const env = {
  baseUrl: required('BASE_URL'),
  standardUser: required('STANDARD_USER'),
  password: required('PASSWORD'),
  aiEnabled: process.env.AI_ENABLED === 'true',
  openAiKey: process.env.OPENAI_API_KEY ?? '',
  isCI: Boolean(process.env.CI),
};