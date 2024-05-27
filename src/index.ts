import type { Filter } from 'mongodb'
import { db } from './Database'
import { ActionsParser } from './ActionParser'
import { DeltasParser } from './DeltaParser'
import { loadReader } from './Reader'
import { BlockParser } from './BlockParser/Parser/BlockParser'
import type { IAction, IDelta } from './Types'

export async function init() {
  return db.connect().then(() => {
    console.log('parser databases connected')
  })
}

export async function getTables(filter?: Filter<IDelta>, page: number = 1, limit: number = 10): Promise<IDelta[]> {
  return await db.getTables(filter, page, limit)
}

export async function getActions(filter?: Filter<IAction>, page: number = 1, limit: number = 10): Promise<IAction[]> {
  return await db.getActions(filter, page, limit)
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
