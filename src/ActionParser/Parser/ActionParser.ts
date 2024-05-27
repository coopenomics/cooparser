import type { Database } from '../../Database'
import type { EosioReaderAction, EosioShipReaderResolved } from '../../Types'
import { ActionParserFactory } from '../Factory/ActionFactory'

export async function ActionsParser(db: Database, reader: EosioShipReaderResolved) {
  const { actions$ } = reader

  actions$.subscribe(async (action: EosioReaderAction) => {
    console.log(`\nACTION - account: ${action.account}, name: ${action.name}, authorization: ${JSON.stringify(action.authorization)}, data: ${JSON.stringify(action.data)}`)

    const parser = ActionParserFactory.create(action.account, action.name)
    if (parser)
      await parser.process(db, action)
  })

  console.log('Подписка на действия активирована')
}
