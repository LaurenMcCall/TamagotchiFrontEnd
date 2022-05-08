import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PetType } from '../App'

export function Landing() {
  const [pets, setPets] = useState<PetType[]>([])
  const [newPetName, setNewPetName] = useState('')

  const params = useParams<{ id: string }>()
  console.log(params)

  function getPetList() {
    async function fetchPetList() {
      const response = await axios.get(
        'https://tamagotchilmccall.herokuapp.com/api/pets'
      )
      if (response.status === 200) {
        setPets(response.data)
        console.log(response.data)
      }
    }
    fetchPetList()
  }

  async function handleCreateNewPet() {
    const response = await axios.post(
      'https://tamagotchilmccall.herokuapp.com/api/pets',
      { name: newPetName }
    )

    if (response.status === 201) {
      getPetList()
      setNewPetName('')
    }
  }

  useEffect(getPetList, [])

  return (
    <div>
      <div className="form">
        Add a new pet:
        <form
          onSubmit={function (event) {
            event.preventDefault()

            handleCreateNewPet()
          }}
        >
          <input
            type="text"
            placeholder="Enter your new pet's name"
            value={newPetName}
            onChange={function (event) {
              setNewPetName(event.target.value)
            }}
          />
        </form>
      </div>
      <article>
        {pets
          .sort((a, b) => (a.birthday < b.birthday ? 1 : 0))
          .map((pets) => {
            return (
              <ul key={pets.id}>
                <Link to={`/${pets.id}`}>
                  <li className="name-text">{pets.name}</li>
                </Link>
                <li className="text-details">
                  Birthday: {new Date(pets.birthday).toLocaleDateString()}
                </li>
                <li className="text-details">
                  Hunger Level: {pets.hungerLevel}
                </li>
                <li className="text-details">
                  Happiness Level: {pets.happinessLevel}
                </li>
              </ul>
            )
          })}
      </article>
    </div>
  )
}
