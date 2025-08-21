import "./style.css"

import type { ICharacter, ICharacterResult } from "./interfaces/ICharacter"
import type { ILocation, ILocationResult } from "./interfaces/ILocation"
import type { IEpisodeResult } from "./interfaces/IEpisode"

const BASE_URL = "https://rickandmortyapi.com/api"
const CHARACTER_URL = `${BASE_URL}/character`
const LOCATION_URL = `${BASE_URL}/location`
const EPISODE_URL = `${BASE_URL}/episode`

// # ELEMENTE abholen von dem Aufbau

const outputElement = document.getElementById("output") as HTMLDivElement
const characterElement = document.getElementById("api-character") as HTMLAnchorElement
const locationElement = document.getElementById("api-location") as HTMLAnchorElement
const episodeElement = document.getElementById("api-episode") as HTMLAnchorElement
const nextPageElement = document.getElementById("next-page") as HTMLButtonElement
const previousPageElement = document.getElementById("previous-page") as HTMLButtonElement

let currentPageURL: string = CHARACTER_URL

nextPageElement.addEventListener("click", async (event: Event) => {
  event.preventDefault()
  outputElement.innerHTML = ""
  try {
    const resp = await fetch(currentPageURL)
    // console.log(await resp.json());
    const { info, results } = (await resp.json()) as ICharacter
    console.log(info)
    console.log(results)
    results.forEach(async (result: ICharacterResult) => {
      const divElement = document.createElement("div") as HTMLDivElement
      divElement.innerHTML = await displayCharacter(result)
      outputElement.appendChild(divElement)
    })

    if (info.next) {
      currentPageURL = info.next
    }
  } catch (error) {
    console.error(error)
  }
})
previousPageElement.addEventListener("click", async (event: Event) => {
  event.preventDefault()
  outputElement.innerHTML = ""
  try {
    const resp = await fetch(currentPageURL)
    // console.log(await resp.json());
    const { info, results } = (await resp.json()) as ICharacter
    console.log(info)
    console.log(results)
    results.forEach(async (result: ICharacterResult) => {
      const divElement = document.createElement("div") as HTMLDivElement
      divElement.innerHTML = await displayCharacter(result)
      outputElement.appendChild(divElement)
    })

    if (info.prev) {
      currentPageURL = info.prev
    }
  } catch (error) {
    console.error(error)
  }
})

// ? Fetchen der API (ABRUF DER DATEN)
characterElement.addEventListener("click", async () => {
  outputElement.innerHTML = ""
  try {
    const resp = await fetch(CHARACTER_URL)
    if (resp.status === 200 && resp.ok) {
      // console.log(resp);
      // ! V1
      // const data: ICharacter = await resp.json()
      const { results } = (await resp.json()) as ICharacter
      results.forEach(async (result: ICharacterResult) => {
        const characterContainer = document.createElement("div") as HTMLDivElement
        characterContainer.innerHTML = await displayCharacter(result)
        outputElement.appendChild(characterContainer)
      })
    }
  } catch (error) {
    console.error(error)
  }
})

async function displayCharacter(character: ICharacterResult): Promise<string> {
  const resultAsString = `
    <div class="flex flex-col justify-between align-sub">
        <p class="text-red-600 font-bold">Name: ${character.name}</p>
        <p class="text-amber-300">Status:${character.status} </p>
        <p>Gender: ${character.gender} </p>
        <p>Origin: ${character?.origin?.name}</p>
        <p class="text-pink-400">Location: ${character?.location?.name}</p>
        <img src="${character.image}" alt="${character.name}">
    </div>
    `
  return resultAsString
}

locationElement.addEventListener("click", async () => {
  outputElement.innerHTML = ""
  try {
    const resp = await fetch(LOCATION_URL)
    const { results } = (await resp.json()) as ILocation
    for (let result of results) {
      const locationContainer = document.createElement("div") as HTMLDivElement
      locationContainer.innerHTML = await displayLocation(result)
      outputElement.appendChild(locationContainer)
    }
  } catch (error) {
    console.error(error)
  }
})

async function displayLocation(location: ILocationResult): Promise<string> {
  const nameCharacterInResident = await fetchResident(location.residents)
  const resultAsString = `
        <p>${location.name}</p>
        <p>Resident-Character Namen:${nameCharacterInResident}</p>`
  return resultAsString
}

async function fetchResident(locationResidentUrl: string[]): Promise<string> {
  const characterArray: string[] = []

  for (let residentUrl of locationResidentUrl) {
    try {
      const resp = await fetch(residentUrl)
      const character: ICharacterResult = await resp.json()
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
        <p>Character: ${characterName}</p>
     </div>
     `
  return resultAsString
}
