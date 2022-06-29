export interface SearchOptions {
  caseSensitive?: boolean;
  sort?: boolean;
}

export class FuzzySearch<TList> {
  constructor(haystack: TList[], keys: string[], options?: SearchOptions)
  search(query: string): TList[]
}
