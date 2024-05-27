import type { EosioReaderTableRowsStreamData } from '@blockmatic/eosio-ship-reader'
import type { Database } from '../../Database'
import type { IParserDelta } from '../../Types'

export class DeltaParser implements IParserDelta {
  async process(db: Database, delta: EosioReaderTableRowsStreamData) {
    // Обработка действия draft и сохранение в базу данных
    db.saveDeltaToDB(delta) // add the actual implementation of `saveActionToDB`
  }
}
