import { useState } from 'react'

function AjouterPlat({ setPage }) {
  const [nom, setNom] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [photo, setPhoto] = useState(null)
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setErreur('')

    if (!nom || !restaurant || !photo || note === 0 || !commentaire) {
      setErreur('Tous les champs sont obligatoires.')
      return
    }

    setChargement(true)

    try {
      const formData = new FormData()
      formData.append('nom', nom)
      formData.append('restaurantNom', restaurant)
      formData.append('photo', photo)
      formData.append('note', note)
      formData.append('commentaire', commentaire)

      const response = await fetch('/api/plats', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setPage('accueil')
      } else {
        setErreur(data.message || 'Une erreur est survenue.')
      }
    } catch (error) {
      setErreur('Impossible de contacter le serveur.')
    } finally {
      setChargement(false)
    }
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

        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Ajouter un plat
        </h1>
        <p className="text-gray-500 mb-8">
          Ce plat n'existe pas encore ? Ajoutez-le !
        </p>

        {erreur && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg mb-4">
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nom du plat *
            </label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="ex: Pad Thai aux crevettes"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nom du restaurant *
            </label>
            <input
              type="text"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              placeholder="ex: Thai Express Waterloo"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Photo du plat *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Note *
            </label>
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
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Commentaire *
            </label>
            <textarea
              value={commentaire}
              onChange={(e) => setCommentaire(e.target.value)}
              placeholder="Justifiez votre note..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            disabled={chargement}
            className="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {chargement ? 'Envoi en cours...' : 'Ajouter le plat'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default AjouterPlat