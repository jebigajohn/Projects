import type { FilmListItem, FilmListResponse } from "./types/Film"
import type { People } from "./types/People"
import type { Planet, Result } from "./types/Planet"
import "./style.css"

const BASE_URL = "https://www.swapi.tech/api"
const FILM_URL = `${BASE_URL}/films`
const PLANETS_URL = `${BASE_URL}/planets`
const PEOPLE_URL = `${BASE_URL}/people`

const outputElement = document.getElementById("output") as HTMLDivElement
// Inputs einmal greifen
const filmSearch = document.getElementById("film-search") as HTMLInputElement
const planetSearch = document.getElementById("planet-search") as HTMLInputElement
const peopleSearch = document.getElementById("people-search") as HTMLInputElement

// Tabs
const filmElement = document.getElementById("films") as HTMLAnchorElement
const planetElement = document.getElementById("planets") as HTMLAnchorElement
const peopleElement = document.getElementById("people") as HTMLAnchorElement

// Caches
let allFilms: FilmListItem[] = []
let allPlanets: Result[] = []
let allPeople: Result[] = []

function showOnly(input: HTMLInputElement) {
  ;[filmSearch, planetSearch, peopleSearch].forEach((i) => i.classList.add("hidden"))
  input.classList.remove("hidden")
  input.value = "" // Suche resetten
  input.focus()
}

function renderFilms(list: FilmListItem[]) {
  outputElement.innerHTML = ""
  list.forEach((item) => {
    const p = document.createElement("p")
    p.textContent = `Episode ${item.properties.episode_id}: ${item.properties.title}`
    outputElement.appendChild(p)
  })
}

function renderPlanets(list: Result[]) {
  outputElement.innerHTML = ""
  list.forEach((item) => {
    const p = document.createElement("p")
    p.textContent = `Planet ${item.uid}: ${item.name}`
    outputElement.appendChild(p)
  })
}

function renderPeople(list: Result[]) {
  outputElement.innerHTML = ""
  list.forEach((item) => {
    const p = document.createElement("p")
    p.textContent = `People ${item.uid}: ${item.name}`
    outputElement.appendChild(p)
  })
}

async function loadFilms() {
  try {
    const resp = await fetch(FILM_URL)
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const data = (await resp.json()) as FilmListResponse

    // sortiert nach Episode 1→6
    allFilms = data.result.sort((a, b) => a.properties.episode_id - b.properties.episode_id)

    renderFilms(allFilms)
  } catch (err) {
    console.error(err)
  }
}

async function loadPlanets() {
  try {
    const resp = await fetch(PLANETS_URL)
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const data = (await resp.json()) as Planet

    allPlanets = data.results
    renderPlanets(allPlanets)
  } catch (err) {
    console.error(err)
  }
}

async function loadPeople() {
  try {
    const resp = await fetch(PEOPLE_URL)
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
    const data = (await resp.json()) as People

    allPeople = data.results
    renderPeople(allPeople)
  } catch (err) {
    console.error(err)
  }
}

// --- Klick-Handler: Tabs ---
filmElement.addEventListener("click", (e) => {
  e.preventDefault()
  showOnly(filmSearch)
  if (allFilms.length === 0) loadFilms()
  else renderFilms(allFilms)
})

planetElement.addEventListener("click", (e) => {
  e.preventDefault()
  showOnly(planetSearch)
  if (allPlanets.length === 0) loadPlanets()
  else renderPlanets(allPlanets)
})

peopleElement.addEventListener("click", (e) => {
  e.preventDefault()
  showOnly(peopleSearch)
  if (allPeople.length === 0) loadPeople()
  else renderPeople(allPeople)
})

// --- Suche: lokal filtern ---
filmSearch.addEventListener("input", () => {
  const q = filmSearch.value.trim().toLowerCase()
  if (!q) return renderFilms(allFilms)
  renderFilms(allFilms.filter((f) => f.properties.title.toLowerCase().includes(q)))
})

planetSearch.addEventListener("input", () => {
  const q = planetSearch.value.trim().toLowerCase()
  if (!q) return renderPlanets(allPlanets)
  renderPlanets(allPlanets.filter((p) => p.name.toLowerCase().includes(q)))
})

peopleSearch.addEventListener("input", () => {
  const q = peopleSearch.value.trim().toLowerCase()
  if (!q) return renderPeople(allPeople)
  renderPeople(allPeople.filter((p) => p.name.toLowerCase().includes(q)))
})
