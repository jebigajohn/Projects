import React from "react"

export default function Main() {
  return (
    <>
      <main>
        <div className="flex flex-col items-center gap-10">
          <h1 className="text-5xl font-bold text-[var(--color-light)]">
            Hi, I am <span className="text-[var(--color-accent)]">John Smith</span>
          </h1>
          <h2 className="text-[var(--color-light)] font-bold">A Front End Developer.</h2>
          <p className="text-[var(--color-light)] w-4xl text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore quo, magnam dolorum neque qui
            veritatis quasi voluptatum iure fugit? Quasi libero obcaecati voluptatem explicabo.
          </p>
          <button className="text-[var(--color-light)] border-2 px-5 py-2 border-[var(--color-gray)]">resume</button>
        </div>
      </main>
    </>
  )
}
