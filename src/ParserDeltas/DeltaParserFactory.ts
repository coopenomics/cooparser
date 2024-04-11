import type { IParserDelta } from './IParserDelta'
import { DeltaParser } from './Effects/SaveDelta'

export class DeltaParserFactory {
  static create(): IParserDelta | null {
    return new DeltaParser()
  }
}
