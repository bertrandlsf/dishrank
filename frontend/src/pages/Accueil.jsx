import { useState } from 'react'

function Accueil({ setPage }) {
  const [recherche, setRecherche] = useState('')
  const [resultats, setResultats] = useState([])

  function handleRecherche(e) {
    const valeur = e.target.value
    setRecherche(valeur)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mt-10 mb-2">
        DishRank
      </h1>
      <p className="text-gray-500 mb-8">
        Noter les plats, pas les restaurants
      </p>

      <div className="w-full max-w-md">
        <input
          type="text"
          value={recherche}
          onChange={handleRecherche}
          placeholder="Chercher un plat... ex: Pad Thai"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg shadow-sm focus:outline-none focus:border-green-500"
        />

        {recherche && resultats.length === 0 && (
          <div className="mt-4 text-center text-gray-500">
            Aucun plat trouvé.{' '}
            <span
              onClick={() => setPage('ajouter')}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Ajouter ce plat ?
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Accueil