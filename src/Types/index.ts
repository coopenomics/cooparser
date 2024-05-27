import type { EosioReaderTableRowsStreamData, createEosioShipReader } from '@blockmatic/eosio-ship-reader'
import type { Database } from '../Database'

export { EosioReaderTableRowsStreamData } from '@blockmatic/eosio-ship-reader'
export { EosioReaderBlock } from '@blockmatic/eosio-ship-reader'
export { EosioReaderAction } from '@blockmatic/eosio-ship-reader'

export type EosioShipReader = ReturnType<typeof createEosioShipReader>
export type EosioShipReaderResolved = Awaited<EosioShipReader>

export interface IParserDelta {
  process: (db: Database, delta: EosioReaderTableRowsStreamData) => Promise<void>
}

export interface IParserAction {
  process: (db: Database, action: any) => Promise<void>
}
