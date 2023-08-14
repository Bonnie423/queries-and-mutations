import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'

import AppLayout from './components/AppLayout.tsx'
import PokemonList from './components/PokemonList.tsx'

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<Navigate to="pokemon" />} />
    <Route path="pokemon" element={<PokemonList />} />
  </Route>
)
