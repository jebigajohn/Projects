export interface ICharacter {
  info: Info
  results: ICharacterResult[]
}

export interface Info {
  count: number
  pages: number
  next: string
  prev: null
}

export interface ICharacterResult {
  id?: number
  name?: string | undefined
  status?: Status
  species?: Species
  type?: string
  gender?: Gender
  origin?: Location
  location?: Location
  image?: string
  episode?: string[]
  url?: string
  created?: Date
}

export enum Gender {
  Female = "Female",
  Male = "Male",
  Unknown = "unknown",
}

export interface Location {
  name: string
  url: string
}

export enum Species {
  Alien = "Alien",
  Human = "Human",
}

export enum Status {
  Alive = "Alive",
  Dead = "Dead",
  Unknown = "unknown",
}
