import { useQuery } from '@tanstack/react-query'
import { Pokemon } from '../../models/pokemon.ts'
import PokemonListItem from './PokemonListItem.tsx'
import { getAllPokemon } from '../apis/pokemon.ts'
import LoadingSpinner from './LoadingSpinner.tsx'

export default function PokemonList() {
  const {
    data: pokemon,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['pokemons'],
    queryFn: getAllPokemon,
  })

  if (isError) {
    return <p>Pokemons are not found</p>
  }

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div>
      <h2>Pokemon List</h2>
      {pokemon.map((p) => (
        <PokemonListItem key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  )
}
