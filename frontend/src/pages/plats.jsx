function Plat({ plat, setPage }) {
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
          src={plat.photo}
          alt={plat.nom}
          className="w-full h-56 object-cover rounded-lg mb-4"
        />

        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {plat.nom}
        </h1>

        <p className="text-gray-500 mb-2">
          🍽️ {plat.restaurant}
        </p>

        <p className="text-yellow-400 text-2xl mb-6">
          {'★'.repeat(Math.round(plat.noteMoyenne))}
          {'☆'.repeat(5 - Math.round(plat.noteMoyenne))}
          <span className="text-gray-500 text-base ml-2">
            ({plat.noteMoyenne}/5)
          </span>
        </p>

        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Commentaires
        </h2>

        {plat.avis.map((avis, index) => (
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