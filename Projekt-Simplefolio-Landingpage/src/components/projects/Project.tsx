import React from "react"

type ProjectProps = {
  title: string
  description: string
  tech: string
}

export default function Project({ title, description, tech }: ProjectProps) {
  return (
    <>
      <div className=" flex flex-col items-center gap-4 px-4 py-4 w-sm text-center [&>h1]:font-bold [&>h2]:font-bold bg-[var(--color-dark-2)] shadow-sm shadow-black [&>p]:text-[var(--color-light)] ">
        <h1>{title}</h1>
        <p>{description}</p>
        <h2>{tech}</h2>
      </div>
    </>
  )
}
