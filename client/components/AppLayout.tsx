import { Outlet } from 'react-router-dom'

function App() {
  return (
    <main>
      <h1>Evolving Pokémon? Nah, mutating...</h1>
      <Outlet />
    </main>
  )
}

export default App
