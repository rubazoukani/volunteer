import React from 'react'
import Hero from '../sections/Hero'
import Header from '../layouts/Header'
import About from '../sections/About'
import Chances from '../sections/Chances'
import Contact from '../sections/Contact'
import Footer from '../sections/Footer'

const Home = (): React.JSX.Element => {
  return (
    <main className='position-relative'>
      <Header />
      <Hero />
      <About />
      <Chances />
      <Contact />
      <Footer />
    </main>
  )
}

export default Home