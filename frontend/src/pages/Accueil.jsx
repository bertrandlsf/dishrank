import { useState } from 'react'

function Accueil({ setPage, setPlatActif }) {
  const [recherche, setRecherche] = useState('')
  const [resultats, setResultats] = useState([])

  async function handleRecherche(e) {
    const valeur = e.target.value
    setRecherche(valeur)

    if (valeur.length < 2) {
      setResultats([])
      return
    }

    try {
      const response = await fetch(`/api/plats?search=${valeur}`)
      const data = await response.json()
      setResultats(data)
    } catch (error) {
      console.error('Erreur recherche:', error)
    }
  }

  function ouvrirPlat(plat) {
    setPlatActif(plat)
    setPage('plat')
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

        {resultats.length > 0 && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow">
            {resultats.map((plat) => (
              <div
                key={plat.id}
                onClick={() => ouvrirPlat(plat)}
                className="px-4 py-3 hover:bg-green-50 cursor-pointer border-b border-gray-100 last:border-none"
              >
                <p className="font-semibold text-gray-800">{plat.nom}</p>
                <p className="text-sm text-gray-500">🍽️ {plat.restaurant.nom}</p>
              </div>
            ))}
          </div>
        )}

        {recherche.length >= 2 && resultats.length === 0 && (
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