import { loadReader } from '../Shipper'
import { DeltaParserFactory } from './DeltaParserFactory'

export async function run() {
  const { rows$ } = await loadReader()

  rows$.subscribe(async (delta) => {
    console.log('new delta: ', delta)
    const parser = DeltaParserFactory.create()
    if (parser)
      await parser.process(delta)
  })

  console.log('Подписка на дельты активирована')
}
