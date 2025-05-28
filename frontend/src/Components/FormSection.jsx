import { Upload, Link, Move } from 'lucide-react';
import { CATEGORIES } from '../Pages/types';



function FormSection({ pageData, onChange, onImageUpload, onGifUpload, onSave }) {
  const handleImageUrl = (url) => {
    onChange({ image: url });
  };

  const handleGifUrl = (url) => {
    onChange({ gif: url });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-sm h-full overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Créer une page</h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Catégorie</label>
          <select
            value={pageData.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition duration-150 ease-in-out hover:border-indigo-300"
          >
            <option value="">Sélectionner une catégorie</option>
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Grand titre</label>
          <input
            type="text"
            value={pageData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out hover:border-indigo-300"
            placeholder="Entrez un titre"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={pageData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out hover:border-indigo-300"
            placeholder="Entrez une description"
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Entrez l'URL de l'image"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  onChange={(e) => handleImageUrl(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600">
                  <Link size={20} />
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={onImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors duration-200">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Upload size={20} />
                  <span>Glissez une image ou cliquez pour télécharger</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">GIF</label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Entrez l'URL du GIF"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  onChange={(e) => handleGifUrl(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600">
                  <Link size={20} />
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type="file"
                accept="image/gif"
                onChange={onGifUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 transition-colors duration-200">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <Upload size={20} />
                  <span>Glissez un GIF ou cliquez pour télécharger</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Position du GIF</label>
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <Move size={20} />
              <span>Faites glisser le GIF sur la prévisualisation pour le positionner</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Position X</label>
                <input
                  type="number"
                  value={Math.round(pageData.gifPosition.x)}
                  onChange={(e) =>
                    onChange({
                      gifPosition: {
                        ...pageData.gifPosition,
                        x: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Position Y</label>
                <input
                  type="number"
                  value={Math.round(pageData.gifPosition.y)}
                  onChange={(e) =>
                    onChange({
                      gifPosition: {
                        ...pageData.gifPosition,
                        y: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={pageData.date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm transition duration-150 ease-in-out hover:border-indigo-300"
          />
        </div>

        <button
          onClick={onSave}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium"
        >
          Sauvegarder
        </button>
      </div>
    </div>
  );
}

export default FormSection;
