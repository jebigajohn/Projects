export const TYPE_BUTTON_CLASS: Record<string, string> = {
  default: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",
  all: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50",

  // Pokémon types
  normal: "bg-gray-400 text-white hover:bg-gray-500",
  fighting: "bg-red-600 text-white hover:bg-red-700",
  flying: "bg-sky-400 text-white hover:bg-sky-500",
  poison: "bg-purple-600 text-white hover:bg-purple-700",
  ground: "bg-amber-600 text-white hover:bg-amber-700",
  rock: "bg-yellow-800 text-white hover:bg-yellow-900",
  bug: "bg-green-600 text-white hover:bg-green-700",
  ghost: "bg-indigo-700 text-white hover:bg-indigo-800",
  steel: "bg-gray-500 text-white hover:bg-gray-600",
  fire: "bg-orange-500 text-white hover:bg-orange-600",
  water: "bg-blue-500 text-white hover:bg-blue-600",
  grass: "bg-green-500 text-white hover:bg-green-600",
  electric: "bg-yellow-400 text-black hover:bg-yellow-500",
  psychic: "bg-pink-500 text-white hover:bg-pink-600",
  ice: "bg-cyan-300 text-black hover:bg-cyan-400",
  dragon: "bg-purple-800 text-white hover:bg-purple-900",
  dark: "bg-stone-800 text-white hover:bg-stone-900",
  fairy: "bg-pink-300 text-black hover:bg-pink-400",
  stellar: "bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 text-black hover:brightness-95",
  unknown: "bg-gray-700 text-white hover:bg-gray-800",
} as const

export const BTN_BASE =
  "px-3 py-1 rounded capitalize shadow-sm border border-black/10 " +
  "transition focus:outline-none focus:ring-2 focus:ring-black/20"

export function getTypeBtnClass(typeName: string) {
  return `${BTN_BASE} ${TYPE_BUTTON_CLASS[typeName] ?? TYPE_BUTTON_CLASS.default}`
}
