export interface Type {
  count: number
  next: string
  previous: null
  results: TypeResult[]
}

export interface TypeResult {
  name: string
  url: string
}
