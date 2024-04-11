export interface IParserDelta {
  process: (delta: any) => Promise<void>
}
