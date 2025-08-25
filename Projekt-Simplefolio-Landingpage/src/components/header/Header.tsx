import React from "react"

export default function Header() {
  return (
    <>
      <header>
        <nav className="flex justify-between px-20 py-8">
          <div className="cursor-default">
            <h1 className="uppercase font-bold text-2xl text-[var(--color-accent)] ">js.</h1>
          </div>
          <div className="flex gap-7 [&>a]:text-[var(--color-light)] [&>a:hover]:text-[var(--color-accent)] [&>a]:text-sm">
            <a href="#">projects</a>
            <a href="#">skills</a>
            <a href="#">contact</a>
          </div>
        </nav>
      </header>
    </>
  )
}
