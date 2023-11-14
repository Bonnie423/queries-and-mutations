import { Outlet } from 'react-router-dom'
import AddPokemon from './AddPokemon.tsx'

function App() {
  return (
    <main>
      <h1>Evolving Pokémon? More like, mutating... 🐣➡️🦆</h1>
      <AddPokemon />
      <Outlet />
    </main>
  )
}

export default App
