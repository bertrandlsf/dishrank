import { useState } from 'react'
import Accueil from './pages/Accueil'
import AjouterPlat from './pages/AjouterPlat'
import Plat from './pages/Plat'

function App() {
  const [page, setPage] = useState('accueil')
  const [platActif, setPlatActif] = useState(null)

  return (
    <div>
      {page === 'accueil' && <Accueil setPage={setPage} setPlatActif={setPlatActif} />}
      {page === 'ajouter' && <AjouterPlat setPage={setPage} />}
      {page === 'plat' && <Plat plat={platActif} setPage={setPage} />}
    </div>
  )
}

export default App