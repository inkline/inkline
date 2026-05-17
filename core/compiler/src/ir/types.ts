export interface SourceLocation {
  readonly file: string;
  readonly line: number;
  readonly column: number;
  readonly offset: number;
  readonly length: number;
}

export const UNKNOWN_LOCATION: SourceLocation = Object.freeze({
  file: "<unknown>",
  line: 0,
  column: 0,
  offset: 0,
  length: 0,
});
