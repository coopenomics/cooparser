export interface IParserAction {
  process: (action: any) => Promise<void>
}
