//! Imports
import type { Type } from "./interfaces/Type"
import type { Pokemon } from "./interfaces/Pokemon"
import { getTypeBtnClass } from "./functions/buttonColors"
import { BADGE_BASE, TYPE_BADGE_CLASS } from "./functions/badgeColors"
import "./style.css"

//* API Endpoints – PokeAPI
const BASE_URL = "https://pokeapi.co/api/v2"
const POKEMON_URL = `${BASE_URL}/pokemon`
const TYPE_URL = `${BASE_URL}/type`

//* DOM Anchors – Buttons & Karten
const typeContainer = document.querySelector("#type-container") as HTMLDivElement
const pokemonContainer = document.querySelector("#pokemon-container") as HTMLDivElement
const searchInput = document.querySelector<HTMLInputElement>("#search")!

//* UI Styles für alle Buttons + aktiven Zustand
const BTN_BASE =
  "px-3 py-1 rounded capitalize shadow-sm border border-black/10 transition focus:outline-none focus:ring-2 focus:ring-black/20"
const ACTIVE_CLASS = "ring-2 ring-black/50 scale-[0.98]"

let allPokemons: Pokemon["results"] = [] // gesamte Liste { name, url }
let baseList: Pokemon["results"] = []
const typeCache = new Map<string, string[]>() // name -> ["grass", "poison"]

//? Hilfstypen für Detail-/Type-Endpunkte
type PokemonDetail = {
  types: { slot: number; type: { name: string; url: string } }[]
}
type TypeDetail = {
  pokemon: { pokemon: { name: string; url: string }; slot: number }[]
}

// Utils
// ? Suchfilter
function filterBySearch(list: Pokemon["results"]): Pokemon["results"] {
  const q = searchInput.value.trim().toLowerCase()
  if (!q) return list
  return list.filter((p) => p.name.toLowerCase().includes(q))
}

//? Aus der Detail-URL die Dex-ID ziehen (…/pokemon/25/ → 25)
function getDexIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean)
  return Number(parts[parts.length - 1])
}

//? Sprite-Quelle
function spriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

//* Loading-Status
function setLoading(on: boolean): void {
  if (on) {
    pokemonContainer.innerHTML = `
      <div class="w-full py-10 text-center text-gray-600">Loading…</div>
    `
  }
}

// Type-Badges (grass/poison etc.)

//* Detaildaten pro Pokemon cachen
async function getTypesFor(name: string): Promise<string[]> {
  if (typeCache.has(name)) return typeCache.get(name)!
  const res = await fetch(`${POKEMON_URL}/${name}`)
  if (!res.ok) throw new Error(`${res.status}`)
  const detail: PokemonDetail = await res.json()
  const types = detail.types.sort((a, b) => a.slot - b.slot).map((t) => t.type.name)
  typeCache.set(name, types)
  return types
}

//* Kleines Badge rendern
function renderTypeBadges(container: HTMLElement, types: string[]): void {
  container.innerHTML = types
    .map((t) => {
      const cls = TYPE_BADGE_CLASS[t] ?? TYPE_BADGE_CLASS.default
      return `<span class="${BADGE_BASE} ${cls}">${t}</span>`
    })
    .join("")
}

//? Nach dem Grid-Render: pro Karte die Types nachladen
async function hydrateTypes(): Promise<void> {
  const slots = Array.from(pokemonContainer.querySelectorAll<HTMLElement>("[data-types-for]"))
  if (!slots.length) return

  const POOL = 16
  let i = 0
  async function worker() {
    while (i < slots.length) {
      const idx = i++
      const el = slots[idx]
      const name = el.dataset.typesFor!
      try {
        el.innerHTML = `<span class="text-[10px] text-gray-400">loading…</span>`
        const types = await getTypesFor(name)
        renderTypeBadges(el, types)
      } catch (err) {
        console.error(err)
        el.innerHTML = `<span class="text-[10px] text-red-500">types error</span>`
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(POOL, slots.length) }, worker))
}

// Render: Karten-Grid

function renderPokemons(list: Pokemon["results"]): void {
  const visible = filterBySearch(list)
  if (!visible?.length) {
    pokemonContainer.innerHTML = `
      <div class="w-full py-10 text-center text-gray-600">No Pokémon found.</div>
    `
    return
  }

  const cards = visible
    .map((p) => {
      const id = getDexIdFromUrl(p.url)
      return `
        <!-- Eine Karte im Pokédex -->
        <article class="bg-white rounded-2xl p-4 shadow-sm border border-black/10 hover:shadow-md transition">
          <!-- Sprite -->
          <div class="w-full flex justify-center mb-2">
            <img
              src="${spriteUrl(id)}"
              alt="${p.name}"
              class="w-24 h-24 object-contain"
              loading="lazy"
            />
          </div>

          <!-- Name -->
          <h3 class="text-center capitalize font-medium">${p.name}</h3>

          <!-- Dex-Nr. (mit führenden Nullen) -->
          <p class="text-center text-xs text-gray-500">#${String(id).padStart(3, "0")}</p>

          <!-- Types landen hier (grass/poison usw.) -->
          <div class="mt-2 flex items-center justify-center gap-2" data-types-for="${p.name}"></div>
        </article>
      `
    })
    .join("")

  pokemonContainer.innerHTML = `
    <!-- Grid für die Karten -->
    <div class="max-w-7xl mx-auto px-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        ${cards}
      </div>
    </div>
  `

  hydrateTypes()
}

// Datenbeschaffung: ALL + Filter

//* Alle Pokémon name+url
async function loadAllPokemons(): Promise<void> {
  setLoading(true)
  const res = await fetch(`${POKEMON_URL}?limit=20000&offset=0`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data: Pokemon = await res.json()
  allPokemons = data.results
  baseList = allPokemons
  renderPokemons(baseList)
}

function normalizeTypeResults(td: TypeDetail): Pokemon["results"] {
  return td.pokemon.map(({ pokemon }) => pokemon)
}

// Type-Buttons

function setActiveButton(target: HTMLButtonElement): void {
  typeContainer.querySelectorAll("button").forEach((b) => {
    b.classList.remove(...ACTIVE_CLASS.split(" "))
    b.setAttribute("aria-pressed", "false")
  })
  target.classList.add(...ACTIVE_CLASS.split(" "))
  target.setAttribute("aria-pressed", "true")
}

function createAllButton(): void {
  const allBtn = document.createElement("button")
  allBtn.textContent = "all"
  allBtn.dataset.type = "all"
  allBtn.className = `${BTN_BASE} ${getTypeBtnClass("all")}`
  allBtn.addEventListener("click", () => {
    setActiveButton(allBtn)
    baseList = allPokemons
    renderPokemons(baseList)
  })
  typeContainer.prepend(allBtn)
  setActiveButton(allBtn) // direkt aktiv beim Start
}

//* Typen aus der API ziehen, Buttons bauen
async function loadTypes(): Promise<void> {
  const res = await fetch(TYPE_URL)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data: Type = await res.json()

  createAllButton()

  data.results.forEach((t) => {
    const btn = document.createElement("button")
    btn.textContent = t.name
    btn.dataset.type = t.name
    btn.className = `${BTN_BASE} ${getTypeBtnClass(t.name)}`
    btn.addEventListener("click", async () => {
      setActiveButton(btn)
      setLoading(true)
      try {
        const r = await fetch(`${TYPE_URL}/${t.name}`)
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        const td: TypeDetail = (await r.json()) as TypeDetail
        baseList = normalizeTypeResults(td)
        renderPokemons(baseList)
      } catch (error) {
        console.error(error)
        pokemonContainer.innerHTML = `
          <div class="w-full py-10 text-center text-red-600">
            Could not load type "${t.name}".
          </div>
        `
      }
    })
    typeContainer.appendChild(btn)
  })
}

searchInput.addEventListener("input", () => {
  renderPokemons(baseList)
})

// Init

loadAllPokemons()
loadTypes()
