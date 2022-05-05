import React from 'react'
import { Route, Routes } from 'react-router'
import { Landing } from './pages/Landing'

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
      <header>Welcome!</header>
      <main>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
        </Routes>
      </main>
    </div>
  )
}
