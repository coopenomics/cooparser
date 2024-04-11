import { loadReader } from '../Shipper'
import { ActionParserFactory } from './ActionParserFactory'

export async function run() {
  const reader = await loadReader()

  const actions$ = reader.actions$

  actions$.subscribe(async (action) => {
    console.log('new action: ', action.account, action.name)
    const parser = ActionParserFactory.create(action.account, action.name)
    if (parser)
      await parser.process(action)
  })

  console.log('Подписка на действия активирована')
}
