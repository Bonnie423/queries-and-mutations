import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Pokemon } from '../../models/pokemon.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addPokemon } from '../apis/pokemon.ts'
import e from 'express'

interface AddPokemon {
  name: string
}
const initialForm = {
  name: '',
}

const AddPokemon = () => {
  const [form, setForm] = useState<AddPokemon>(initialForm)
  const queryClient = useQueryClient()

  const addPokemonMutation = useMutation({
    mutationFn: addPokemon,
    onSuccess: (newPokemon) => {
      // queryClient.invalidateQueries({ queryKey: ['pokemons'] })
      try {
        const currentPokemon = queryClient.getQueryData<Pokemon[]>(['pokemons'])

        if (currentPokemon) {
          queryClient.setQueryData(
            ['pokemons'],
            [...currentPokemon, newPokemon]
          )
        } else {
          queryClient.invalidateQueries(['pokemons'])
        }
      } catch (error) {
        console.error(error)
      }
    },
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }

    setForm(newForm)
  }

  function handleAddPokemon(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addPokemonMutation.mutate(form)
    setForm(initialForm)
  }

  return (
    <div>
      <form action="" onSubmit={handleAddPokemon} aria-label="Add Pokemon Form">
        <p>
          <label htmlFor="name">Name:</label>
        </p>
        <br></br>
        <input
          id="name"
          onChange={handleChange}
          name="name"
          value={form.name}
        ></input>
        <button>Add Pokemon</button>
      </form>
    </div>
  )
}

export default AddPokemon
