import type { Database } from '../../Database'
import type { EosioShipReaderResolved, IDelta } from '../../Types'
import { DeltaParserFactory } from '../Factory'

export async function DeltasParser(db: Database, reader: EosioShipReaderResolved) {
  const { rows$ } = reader

  rows$.subscribe(async (delta: IDelta) => {
    console.log(`\nDELTA - code: ${delta.code}, scope: ${delta.scope}, table: ${delta.table}, primary_key: ${delta.primary_key}, data: ${JSON.stringify(delta.value)}`)

    const parser = DeltaParserFactory.create(delta.code, delta.scope, delta.table)
    if (parser)
      await parser.process(db, delta)
  })

  console.log('Подписка на дельты активирована')
}
