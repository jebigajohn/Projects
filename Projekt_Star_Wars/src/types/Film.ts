export interface FilmListResponse {
  message: string
  result: FilmListItem[]
}

export interface FilmListItem {
  properties: FilmProps
}

export interface FilmProps {
  created: Date
  edited: Date
  starships: string[]
  vehicles: string[]
  planets: string[]
  producer: string
  title: string
  episode_id: number
  director: string
  release_date: Date
  opening_crawl: string
  characters: string[]
  species: string[]
  url: string
}
