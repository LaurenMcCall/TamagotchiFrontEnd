import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PetType } from '../App'

// The home page should show a list of all the
// pets in your API. The listing should include their name,
// birthday, hunger level, and happiness level.
export function Landing() {
  const [pets, setPets] = useState<PetType[]>([])

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

    // const sortPets = [...data].sort((a, b) => {
    //   return a.birthday - b.birthday
    // })

    fetchPetList()
  }
  useEffect(getPetList, [])
  // console.log(getPetList)

  return (
    <div>
      <article>
        {pets
          .sort((a, b) => (a.birthday < b.birthday ? 1 : 0))
          .map((pets) => {
            return (
              <ul key={pets.id}>
                <li>Name: {pets.name}</li>
                <li>
                  Birthday: {new Date(pets.birthday).toLocaleDateString()}
                </li>
                <li>Hunger Level: {pets.hungerLevel}</li>
                <li>Happiness Level: {pets.happinessLevel}</li>
              </ul>
            )
          })}
      </article>
    </div>
  )
}
