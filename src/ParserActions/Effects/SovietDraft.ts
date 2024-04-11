import { saveActionToDB } from '../../Database'
import type { IParserAction } from '../IParserAction'

export class SovietDraftParser implements IParserAction {
  async process(action: any) {
    // Обработка действия draft и сохранение в базу данных
    saveActionToDB(action) // add the actual implementation of `saveActionToDB`
  }
}
