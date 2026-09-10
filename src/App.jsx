import React from 'react'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import ProjectGrid from './components/sections/ProjectGrid.jsx'
import About from './components/sections/About.jsx'
import Contact from './components/sections/Contact.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <ProjectGrid />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
