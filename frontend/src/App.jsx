import { useState } from 'react'
import Accueil from './pages/Accueil'
import AjouterPlat from './pages/AjouterPlat'

function App() {
  const [page, setPage] = useState('accueil')

  return (
    <div>
      {page === 'accueil' && <Accueil setPage={setPage} />}
      {page === 'ajouter' && <AjouterPlat setPage={setPage} />}
    </div>
  )
}

export default App