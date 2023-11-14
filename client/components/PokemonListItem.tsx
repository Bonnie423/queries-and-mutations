import { useState } from 'react'
import styles from './PokemonListItem.module.css'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deletePokemon, renamePokemon } from '../apis/pokemon.ts'
import { Pokemon } from '../../models/pokemon.ts'
interface Props {
  id: number
  name: string
}
export default function PokemonListItem({ id, name }: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(name)

  const queryClient = useQueryClient()
  const deletePokemonMutation = useMutation({
    mutationFn: () => deletePokemon({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['pokemons'])
    },
  })

  const renamePokemonMutation = useMutation({
    mutationFn: () => renamePokemon({ id, newName: text }),
    onSuccess: () => {
      queryClient.invalidateQueries(['pokemons'])
    },
  })

  const handleDeleteClick = () => {
    // TODO: submit the form to delete the pokemon

    deletePokemonMutation.mutate()
    console.log('deleting', id)
  }

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    renamePokemonMutation.mutate()
    // TODO: submit the form to change the name
    console.log('submitting', text)

    setEditing(false)
  }

  const handleStopEditingClick = () => {
    setEditing(false)
    setText(name)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEditSubmit} className={styles.form}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {id} - {name} -{' '}
          <span className={styles.buttons}>
            <button onClick={handleStartEditingClick}>Rename</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </p>
      )}
    </div>
  )
}
