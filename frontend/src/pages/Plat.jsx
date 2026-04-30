import { useState, useEffect } from 'react'

function Plat({ plat, setPage }) {
  const [details, setDetails] = useState(null)
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    async function chargerPlat() {
      try {
        const response = await fetch(`/api/plats/${plat.id}`)
        const data = await response.json()
        setDetails(data)
      } catch (error) {
        console.error('Erreur chargement plat:', error)
      }
    }
    chargerPlat()
  }, [plat.id])

  async function handleAvis(e) {
    e.preventDefault()
    setErreur('')

    if (note === 0 || !commentaire) {
      setErreur('La note et le commentaire sont obligatoires.')
      return
    }

    setChargement(true)

    try {
      const response = await fetch('/api/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platId: plat.id, note, commentaire }),
      })

      if (response.ok) {
        setNote(0)
        setCommentaire('')
        const updated = await fetch(`/api/plats/${plat.id}`)
        const data = await updated.json()
        setDetails(data)
      } else {
        setErreur('Une erreur est survenue.')
      }
    } catch (error) {
      setErreur('Impossible de contacter le serveur.')
    } finally {
      setChargement(false)
    }
  }

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <div className="w-full max-w-md">

        <button
          onClick={() => setPage('accueil')}
          className="text-green-600 font-semibold mb-6 hover:underline"
        >
          ← Retour
        </button>

        <img
          src={`http://localhost:3001${details.photo}`}
          alt={details.nom}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {details.nom}
        </h1>

        <p className="text-gray-500 mb-2">
          🍽️ {details.restaurant.nom}
        </p>

        {details.noteMoyenne !== null ? (
          <p className="text-yellow-400 text-2xl mb-6">
            {'★'.repeat(Math.round(details.noteMoyenne))}
            {'☆'.repeat(5 - Math.round(details.noteMoyenne))}
            <span className="text-gray-500 text-base ml-2">
              ({details.noteMoyenne}/5)
            </span>
          </p>
        ) : (
          <p className="text-gray-400 mb-6">Aucune note pour l'instant</p>
        )}

        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Donner un avis
        </h2>

        {erreur && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">
            {erreur}
          </div>
        )}

        <form onSubmit={handleAvis} className="flex flex-col gap-4 mb-8">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((etoile) => (
              <button
                key={etoile}
                type="button"
                onClick={() => setNote(etoile)}
                className={`text-3xl ${note >= etoile ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            placeholder="Écrivez votre commentaire..."
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
          />

          <button
            type="submit"
            disabled={chargement}
            className="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {chargement ? 'Envoi...' : 'Soumettre mon avis'}
          </button>
        </form>

        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Commentaires
        </h2>

        {details.avis.length === 0 && (
          <p className="text-gray-400 text-center">
            Aucun avis pour l'instant. Soyez le premier !
          </p>
        )}

        {details.avis.map((avis, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 mb-3">
            <p className="text-yellow-400">
              {'★'.repeat(avis.note)}{'☆'.repeat(5 - avis.note)}
            </p>
            <p className="text-gray-700 mt-1">{avis.commentaire}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Plat