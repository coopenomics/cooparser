import { db } from './Database'
import { ActionsParser } from './ActionParser'
import { DeltasParser } from './DeltaParser'
import { loadReader } from './Reader'
import { BlockParser } from './BlockParser/Parser/BlockParser'

export async function init() {
  return db.connect().then(() => {
    console.log('parser databases connected')
  })
}

export async function getCurrentBlock() {
  return await db.getCurrentBlock()
}

export class Parser {
  async start() {
    await init()
    const reader = await loadReader(db)
    BlockParser(db, reader)
    ActionsParser(db, reader)
    DeltasParser(db, reader)
  }
}
