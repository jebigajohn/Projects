import React from "react"

export default function Contact() {
  return (
    <>
      <div className="flex flex-col text-center gap-20 mt-20 uppercase [&>h1]:font-bold [&>h1]:text-2xl text-[var(--color-light)] justify-center items-center">
        <h1>Contact</h1>
        <button className="text-[var(--color-light)] border-2 px-5 py-2 border-[var(--color-gray)] w-fit ">
          email me
        </button>
      </div>
    </>
  )
}
