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
export const startBlock = getEnvVar('START_BLOCK')
export const finishBlock = getEnvVar('FINISH_BLOCK')

/// ///////////////////// TEST
const subsribedTablesTest = [
  // токены и балансы
  // { code: 'eosio.token', table: 'stat' },
  // { code: 'eosio.token', table: 'accounts' },

  // документы
  { code: 'draft', table: 'drafts' },
  { code: 'draft', table: 'translations' },

  // совет
  { code: 'soviet', table: 'decisions' },
  { code: 'soviet', table: 'boards' },
  { code: 'soviet', table: 'participants' },

  // registrator.joincoop
  { code: 'soviet', table: 'joincoops' },

  // регистратор
  { code: 'registrator', table: 'accounts' },
  { code: 'registrator', table: 'orgs' },

]

const subsribedActionsTest = [
  // // токены и балансы
  { code: 'soviet', action: 'votefor' },
  { code: 'soviet', action: 'voteagainst' },
  { code: 'soviet', action: 'newdraft' },
  { code: 'soviet', action: 'newstatement' },

  { code: 'soviet', action: 'newdecision' },

  // // registrator.joincoop
  { code: 'soviet', action: 'joincoop' },
  { code: 'soviet', action: 'joincoopdec' },

]

// --------------------------

/// //////////////////// PROD
const subsribedTablesProd = [
  // документы
  { code: 'draft', table: 'drafts' },
  { code: 'draft', table: 'translations' },

  // совет
  { code: 'soviet', table: 'decisions' },
  { code: 'soviet', table: 'boards' },
  { code: 'soviet', table: 'participants' },

  // registrator.joincoop
  { code: 'soviet', table: 'joincoops' },

  // регистратор
  { code: 'registrator', table: 'accounts' },
  { code: 'registrator', table: 'orgs' },
]

const subsribedActionsProd = [
  { code: 'soviet', action: 'votefor' },
  { code: 'soviet', action: 'voteagainst' },
  { code: 'soviet', action: 'newdraft' },
  { code: 'soviet', action: 'newstatement' },

  { code: 'soviet', action: 'newdecision' },

  // // registrator.joincoop
  { code: 'soviet', action: 'joincoop' },
  { code: 'soviet', action: 'joincoopdec' },

]

// --------------------------

export const subsribedTables = getEnvVar('NODE_ENV') === 'production' ? subsribedTablesProd : subsribedTablesTest
export const subsribedActions = getEnvVar('NODE_ENV') === 'production' ? subsribedActionsProd : subsribedActionsTest
