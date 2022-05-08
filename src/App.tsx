import React from 'react'
import { Route, Routes } from 'react-router'
import { Link } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { PetDetails } from './pages/PetDetails'

export type PetType = {
  id: number
  name: string
  birthday: string
  hungerLevel: number
  happinessLevel: number
  lastInteractedWithDate: string
  isDead: boolean
}

export function App() {
  return (
    <div>
      <Link to="/">
        <header>💖 Tamagotchi World 💖</header>
      </Link>
      <main>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/:id" element={<PetDetails />}></Route>
          <Route path="*" element={'That URL is unknown'} />
        </Routes>
      </main>
    </div>
  )
}
