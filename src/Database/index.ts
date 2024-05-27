import type { Collection, Db } from 'mongodb'
import { MongoClient } from 'mongodb'
import { mongoUri } from '../config'

export class Database {
  private client: MongoClient
  private db: Db | undefined
  private actions: Collection | undefined
  private deltas: Collection | undefined
  private sync: Collection | undefined

  constructor() {
    this.client = new MongoClient(mongoUri)
  }

  async connect() {
    await this.client.connect()
    this.db = this.client.db('cooperative')
    this.actions = this.db.collection('actions')
    this.deltas = this.db.collection('deltas')
    this.sync = this.db.collection('sync')
  }

  async saveActionToDB(action: any): Promise<void> {
    if (!this.actions)
      throw new Error('Database not connected')

    await this.actions.insertOne(action)
  }

  async saveDeltaToDB(delta: any): Promise<void> {
    if (!this.deltas)
      throw new Error('Database not connected')

    await this.deltas.insertOne(delta)
  }

  // async getDeltaFromDB(filter: Filter<IFilterDeltas>): Promise<any> {
  //   if (!this.deltas)
  //     throw new Error('Database not connected')

  //   const result = await this.deltas.findOne(filter as any)

  //   return result
  // }

  // async getDeltasFromDB(filter: Filter<IFilterDeltas>): Promise<any> {
  //   if (!this.deltas)
  //     throw new Error('Database not connected')

  //   const pipeline = [
  //     { $match: filter },
  //     { $sort: { primary_key: -1 } },
  //     { $group: { _id: '$primary_key', present: { $first: '$present' }, value: { $first: '$value' } } },
  //     { $match: { present: true } },
  //     { $project: { _id: 0, value: 1 } },
  //   ]

  //   const result = await this.deltas.aggregate(pipeline).toArray()

  //   return result
  // }

  // async getActionsFromDB(filter: Filter<IFilterDeltas>): Promise<any> {
  //   if (!this.actions)
  //     throw new Error('Database not connected')

  //   const result = await this.actions.find(filter as any).toArray()

  //   return result
  // }

  // async getActionFromDB(filter: Filter<IFilterActions>): Promise<any> {
  //   if (!this.actions)
  //     throw new Error('Database not connected')

  //   const result = await this.actions.findOne(filter as any)

  //   return result ? result.value : null
  // }

  async getCurrentBlock(): Promise<number> {
    if (!this.sync)
      throw new Error('Database not connected')

    const currentBlockDocument = await this.sync.findOne({ key: 'currentBlock' })

    return currentBlockDocument ? currentBlockDocument.block_num : 0
  }

  async updateCurrentBlock(block_num: number): Promise<void> {
    if (!this.sync)
      throw new Error('Database not connected')

    await this.sync.updateOne({ key: 'currentBlock' }, { $set: { block_num } }, { upsert: true })
  }

  async purgeAfterBlock(since_block: number) {
    if (!this.actions || !this.deltas)
      throw new Error('Database not connected')

    await this.actions.deleteMany({ block_num: { $gt: since_block } })
    await this.deltas.deleteMany({ block_num: { $gt: since_block } })
  }
}

export const db = new Database()
