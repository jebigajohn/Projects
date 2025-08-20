export interface ILocation {
  info: Info
  results: LocationResult[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: null
}

export interface LocationResult {
  id: number
  name: string
  type: string
  dimension: string
  residents: string[]
  url: string
  created: Date
}
