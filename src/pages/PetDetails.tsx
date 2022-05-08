import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { PetType } from '../App'

export function PetDetails() {
  const history = useNavigate()
  console.log(history)

  const params =
    useParams<{ id: string; actions: 'Feedings' | 'Playtimes' | 'Scoldings' }>()

  const [petDetails, setPetDetails] = useState<PetType>({
    id: undefined!,
    name: '',
    birthday: '',
    hungerLevel: undefined!,
    happinessLevel: undefined!,
    lastInteractedWithDate: '',
    isDead: false,
  })
  const [hunger, setHunger] = useState<number>()
  const [play, setPlay] = useState<number>()
  const [scold, setScold] = useState<number>()

  useEffect(() => {
    async function loadPetDetails() {
      const response = await axios.get(
        `https://tamagotchilmccall.herokuapp.com/api/pets/${params.id}`
      )
      if (response.status === 200) {
        setPetDetails(response.data)
      }
    }
    loadPetDetails()
  }, [params.id])

  async function updatePetLevels() {
    const response = await axios.get(
      `https://tamagotchilmccall.herokuapp.com/api/pets/${params.id}`
    )
    if (response.status === 200) {
      setPetDetails(response.data)
      setHunger(response.data.hungerLevel)
      setPlay(response.data.happinessLevel)
      setScold(response.data.happinessLevel)
    }
  }

  async function feedPet() {
    const response = await axios.post(
      `https://tamagotchilmccall.herokuapp.com/api/pets/${params.id}/Feedings`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.status === 200) {
      setHunger(response.data.hungerLevel)
      updatePetLevels()
    }
  }

  async function playWithPet() {
    const response = await axios.post(
      `https://tamagotchilmccall.herokuapp.com/api/pets/${params.id}/Playtimes`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.status === 200) {
      setPlay(response.data.happinessLevel)
      updatePetLevels()
    }
  }

  async function scoldPet() {
    const response = await axios.post(
      `https://tamagotchilmccall.herokuapp.com/api/pets/${params.id}/Scoldings`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    if (response.status === 200) {
      setScold(response.data.happinessLevel)
      updatePetLevels()
    }
  }

  async function deletePet() {
    const response = await axios.delete(
      `https://tamagotchilmccall.herokuapp.com/api/pets/${params.id}`
    )
    if (response.status === 200) {
      history('/')
    }
  }

  if (!petDetails.id) {
    return null
  }

  console.log(hunger)
  console.log(play)
  console.log(scold)

  return (
    <div>
      <p className="petDetails-name">✨ {petDetails.name} ✨</p>
      <div>
        <Link to="/">
          <a className="fa-solid fa-house home-icon" href=""></a>
        </Link>
      </div>
      <article>
        <ul className="petDetails text-details">
          <li className="petDetails">
            Birthday: {new Date(petDetails.birthday).toLocaleDateString()}
          </li>
          <li className="petDetails">Hunger Level: {petDetails.hungerLevel}</li>
          <li className="petDetails">
            Happiness Level: {petDetails.happinessLevel}
          </li>
        </ul>
      </article>
      <section>
        <button className="button" onClick={feedPet}>
          Feed {petDetails.name}
        </button>
        <button className="button" onClick={playWithPet}>
          Play with {petDetails.name}
        </button>
        <button className="button" onClick={scoldPet}>
          Scold {petDetails.name}
        </button>
        <button className="button" onClick={deletePet}>
          Delete {petDetails.name}
        </button>
      </section>
    </div>
  )
}
