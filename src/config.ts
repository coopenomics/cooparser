import dotenv from 'dotenv'

dotenv.config()

function getEnvVar(key: string): string {
  const envVar = process.env[key]
  if (envVar === undefined)
    throw new Error(`Env variable ${key} is required`)

  return envVar
}

export const eosioApi = getEnvVar('API')
export const shipApi = getEnvVar('SHIP')
export const mongoUri = getEnvVar('MONGO_URI')

export const subsribedTables = [
  { code: 'soviettest1', table: 'decisions' },
]

export const subsribedActions = [
  { code: 'soviettest1', action: 'draft' },
]
