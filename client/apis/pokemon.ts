import request from 'superagent'
import type { Pokemon } from '../../models/pokemon.ts'

export async function getAllPokemon() {
  const response = await request.get('/api/v1/pokemon')


  return response.body as Pokemon[]
}

interface AddPokemon {
  name: Pokemon['name']
}
export async function addPokemon({ name }: AddPokemon): Promise<void> {
  const response = await request.post('/api/v1/pokemon').send({ name })
  // console.log(response.body.pokemon)
  return response.body.pokemon
}

interface RenamePokemon {
  id: Pokemon['id']
  newName: Pokemon['name']
}
export async function renamePokemon({
  id,
  newName,
}: RenamePokemon): Promise<void> {
  console.log(newName)
  await request.patch(`/api/v1/pokemon/${id}`).send({ name: newName })
}

interface DeletePokemon {
  id: Pokemon['id']
}
export async function deletePokemon({ id }: DeletePokemon): Promise<void> {
  await request.delete(`/api/v1/pokemon/${id}`)
}
