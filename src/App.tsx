//import { useState } from 'react'
import './index.css'
import NavBar from './components/layouts/NavBar'
import Pokemon from './components/Pokemon'

function App() {

  return (
    <>
    <NavBar/>
    <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr-350px] h-screen font-poppins" >
    <Pokemon/>
    </main>
    </>
  )
}

export default App
