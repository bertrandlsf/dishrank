import { useState } from 'react'

function AjouterPlat() {
  const [nom, setNom] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [photo, setPhoto] = useState(null)
  const [note, setNote] = useState(0)
  const [commentaire, setCommentaire] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    console.log({ nom, restaurant, photo, note, commentaire })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mt-10 mb-2">
        Ajouter un plat
      </h1>
      <p className="text-gray-500 mb-8">
        Ce plat n'existe pas encore ? Ajoutez-le !
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
        
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
          className="bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition"
        >
          Ajouter le plat
        </button>

      </form>
    </div>
  )
}

export default AjouterPlat