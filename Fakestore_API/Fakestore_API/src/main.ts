import "./style.css"

const API = "https://fakestoreapi.com/products"

const grid = document.getElementById("products-grid") as HTMLDivElement
const electronicsBtn = document.getElementById("electronicsBtn") as HTMLButtonElement
const jeweleryBtn = document.getElementById("jeweleryBtn") as HTMLButtonElement
const menClothingBtn = document.getElementById("menClothingBtn") as HTMLButtonElement
const womenClothingBtn = document.getElementById("womenClothingBtn") as HTMLButtonElement
const searchInput = document.getElementById("search-input") as HTMLInputElement

type Product = {
  id: number
  category: string
  image: string
  title: string
  price: number
}

let allProducts: Product[] = []

function createCard(p: Product): HTMLElement {
  const article = document.createElement("article")
  article.className = "card"
  article.id = `product-${p.id}`

  const media = document.createElement("div")
  media.className = "card-media"
  const img = document.createElement("img")
  img.src = p.image
  img.alt = p.title
  media.appendChild(img)

  const body = document.createElement("div")
  body.className = "card-body"
  const title = document.createElement("h3")
  title.className = "title"
  title.textContent = p.title

  body.appendChild(title)

  const actions = document.createElement("div")
  actions.className = "actions"
  const btn = document.createElement("button")
  btn.className = "btn"
  btn.textContent = "Add to cart"
  const price = document.createElement("div")
  price.className = "price"
  price.textContent = `$ ${p.price.toFixed(2)}`
  actions.append(price, btn)

  article.append(media, body, actions)
  return article
}
function renderProducts(list: Product[]) {
  grid.innerHTML = ""
  for (const p of list) {
    grid.appendChild(createCard(p))
  }
}

electronicsBtn.addEventListener("click", () => {
  const filterElectronics = allProducts.filter((p) => p.category === "electronics")
  renderProducts(filterElectronics)
})
jeweleryBtn.addEventListener("click", () => {
  const filterElectronics = allProducts.filter((p) => p.category === "jewelery")
  renderProducts(filterElectronics)
})
menClothingBtn.addEventListener("click", () => {
  const filterElectronics = allProducts.filter((p) => p.category === "men's clothing")
  renderProducts(filterElectronics)
})
womenClothingBtn.addEventListener("click", () => {
  const filterElectronics = allProducts.filter((p) => p.category === "women's clothing")
  renderProducts(filterElectronics)
})

searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase()
  if (q === "") {
    renderProducts(allProducts)
    return
  }
  const filtered = allProducts.filter((p) => p.title.toLowerCase().includes(q))
  renderProducts(filtered)
})

fetch(API)
  .then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json() as Promise<Product[]>
  })
  .then((items) => {
    allProducts = items
    renderProducts(allProducts)
  })
  .catch((err) => console.error(err))
