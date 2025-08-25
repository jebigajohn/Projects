import React from "react"

export default function Skill() {
  return (
    <>
      <div className="flex flex-col justify-center gap-5 items-center mt-20">
        <h1 className="uppercase font-bold text-[var(--color-light)] text-2xl">Skills</h1>
        <div className="flex gap-5  [&>button]:border-[var(--color-light)] [&>button]:px-3 [&>button]:py-1 [&>button]:w-fit [&>button]:bg-[var(--color-dark-2)] [&>button]:text-[var(--color-light)]">
          <button>HTML</button>
          <button>CSS</button>
          <button>JavaScript</button>
          <button>React</button>
        </div>
        <div className="flex gap-5  [&>button]:border-[var(--color-light)] [&>button]:px-3 [&>button]:py-1 [&>button]:w-fit [&>button]:bg-[var(--color-dark-2)] [&>button]:text-[var(--color-light)]">
          <button>SASS</button>
          <button>Tailwind CSS</button>
          <button>Git</button>
          <button>UX/UI</button>
        </div>
      </div>
    </>
  )
}
