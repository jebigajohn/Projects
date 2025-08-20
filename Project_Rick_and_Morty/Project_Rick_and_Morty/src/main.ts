import type { Character, Location, Result } from "./interfaces/Character"
import type { Episode, IEpisodeResult } from "./interfaces/Episode"
import type { ILocation, LocationResult } from "./interfaces/Location"

const BASE_URL = "https://rickandmortyapi.com/api"
const CHARACTER_URL = `${BASE_URL}/character`
const LOCATION_URL = `${BASE_URL}/location`
const EPISODE_URL = `${BASE_URL}/episode`

// # ELEMENTE abholen von dem Aufbau

const outputElement = document.getElementById("output") as HTMLDivElement
const characterElement = document.getElementById("api-character") as HTMLAnchorElement
const locationElement = document.getElementById("api-location") as HTMLAnchorElement
const episodeElement = document.getElementById("api-episode") as HTMLAnchorElement

// ? Fetchen der API (ABRUF DER DATEN)
characterElement.addEventListener("click", async () => {
  // ! DIV LEEREN DAMIT DIE NEUEN ERGEBNISSE ANGEZEIGT WERDEN KÖNNEN
  outputElement.innerHTML = ""
  try {
    const resp = await fetch(CHARACTER_URL)
    if (resp.status === 200 && resp.ok) {
      // const data: Character = await resp.json()
      const { results } = (await resp.json()) as Character

      results.forEach((result: Result) => {
        const characterContainer = document.createElement("div") as HTMLDivElement
        characterContainer.innerHTML = displayCharacter(result)
        outputElement.appendChild(characterContainer)
      })
    }
  } catch (error) {
    console.error(error)
  }
})

function displayCharacter(character: Result): string {
  const resultAsString = `
  <div>
    <p>Name: ${character.name}</p>
    <p>Status: ${character.status}</p>
    <p>Gender: ${character.gender}</p>
    <p>Origin: ${character?.origin?.name}</p>
    <p>Location: ${character?.location?.name}</p>
    <img src=" ${character.image}" alt="${character.name}">
  </div>
  `
  return resultAsString
}

locationElement.addEventListener("click", async () => {
  // ! DIV LEEREN DAMIT DIE NEUEN ERGEBNISSE ANGEZEIGT WERDEN KÖNNEN
  outputElement.innerHTML = ""
  try {
    const resp = await fetch(LOCATION_URL)
    const { results } = (await resp.json()) as ILocation
    console.log(results)
    for (let result of results) {
      const locationContainer = document.createElement("div") as HTMLDivElement
      locationContainer.innerHTML = await displayLocation(result)
      outputElement.appendChild(locationContainer)
    }
  } catch (error) {
    console.error(error)
  }
})

async function displayLocation(location: LocationResult): Promise<string> {
  const nameCharacterInResident = await fetchResident(location.residents)
  const resultAsString = `
  <p>${location.name}</p>
  <p>Resident-Character Namen: ${nameCharacterInResident}</p>
  `
  return resultAsString
}

async function fetchResident(locationResidentUrl: string[]): Promise<string> {
  const characterArray: string[] = []
  for (let residentUrl of locationResidentUrl) {
    try {
      const resp = await fetch(residentUrl)
      const character: Result = await resp.json()
      if (character.name) {
        characterArray.push(character.name)
      }
    } catch (error) {
      console.error(error)
    }
  }
  return characterArray.join(", ")
}

episodeElement.addEventListener("click", async () => {
  // ! DIV LEEREN DAMIT DIE NEUEN ERGEBNISSE ANGEZEIGT WERDEN KÖNNEN
  outputElement.innerHTML = ""
  try {
    const resp = await fetch(EPISODE_URL)
    const data = await resp.json()

    await Promise.all(
      data.results.map(async (result: IEpisodeResult) => {
        console.log(result)
        const episodeContainer = document.createElement("div") as HTMLDivElement
        episodeContainer.innerHTML = await displayEpisode(result)
        outputElement.appendChild(episodeContainer)
      })
    )
  } catch (error) {
    console.error(error)
  }
})

async function displayEpisode(episode: IEpisodeResult): Promise<string> {
  const characterName = await fetchResident(episode.characters)
  const resultAsString = `
  <div>
    <p>Name: ${episode.name}</p>
    <p>Charakter: ${characterName}</p>
  </div>
  `
  return resultAsString
}
