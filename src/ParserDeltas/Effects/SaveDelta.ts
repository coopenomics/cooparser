import { saveDeltaToDB } from '../../Database'
import type { IParserDelta } from '../IParserDelta'

export class DeltaParser implements IParserDelta {
  async process(delta: any) {
    console.log('delta', delta)
    // Обработка действия draft и сохранение в базу данных
    saveDeltaToDB(delta) // add the actual implementation of `saveActionToDB`
  }
}
