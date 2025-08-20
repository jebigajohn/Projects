import type { Category } from "../enum/Category"
import type { Rating } from "./Rating"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: Category
  image: string
  rating: Rating
}
