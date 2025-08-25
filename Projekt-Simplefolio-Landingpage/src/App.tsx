import { useState } from "react"

import "./App.css"
import Header from "./components/header/Header"
import Main from "./pages/main/Main"
import Project from "./components/projects/Project"
import Skill from "./components/skills/Skill"
import Contact from "./components/contact/Contact"
import Footer from "./components/footer/Footer"

function App() {
  return (
    <>
      <Header />
      <Main />
      <div className="projectWrapper flex flex-col items-center gap-10 mt-20">
        <h1 className="uppercase font-bold text-[var(--color-light)] text-2xl">Projects</h1>
        <div className="flex gap-5 ">
          <Project
            title="Project 1"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, reiciendis?"
            tech="JavaScript React Sass"
          />
          <Project
            title="Project 2"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, reiciendis?"
            tech="JavaScript React Sass"
          />
          <Project
            title="Project 3"
            description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, reiciendis?"
            tech="JavaScript React Sass"
          />
        </div>
      </div>
      <Skill />
      <Contact />
      <Footer />
    </>
  )
}

export default App
