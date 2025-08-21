export interface IEpisode {
  info: Info
  results: IEpisodeResult[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: null
}

export interface IEpisodeResult {
  id: number
  name: string
  air_date: string
  episode: string
  characters: string[]
  url: string
  created: Date
}
