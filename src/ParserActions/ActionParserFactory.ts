import type { IParserAction } from './IParserAction'
import { SovietDraftParser } from './Effects/SovietDraft'

export class ActionParserFactory {
  static create(accountName: string, actionName: string): IParserAction | null {
    switch (`${accountName}::${actionName}`) {
      case 'soviet::draft':
        return new SovietDraftParser()
      // Добавьте дополнительные case для других действий с учетом accountName
      default:
        return null
    }
  }
}
