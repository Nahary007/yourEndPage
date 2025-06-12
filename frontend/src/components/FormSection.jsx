import { Upload, Link, Move } from 'lucide-react';
import { CATEGORIES } from '../pages/types';

function FormSection({ pageData, onChange, onImageUpload,onGifUpload, onSave,onImageUrl, onGifUrl }) {
  // const handleImageUrl = (url) => {
  //   onChange({ image: url });
  // };

  // const handleGifUrl = (url) => {
  //   onChange({ gif: url });
  // };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-2xl h-full overflow-y-auto text-white">
      <h2 className="text-2xl font-bold mb-6 text-white">Créer une page</h2>

      <div className="space-y-6">
        {/* Catégorie */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Catégorie</label>
            <select
              value={pageData.category}
              onChange={(e) => onChange({ category: e.target.value })}
              className="w-full p-3 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg placeholder-white/70 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition duration-200"
            >
              <option value="">Sélectionner une catégorie</option>
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value} className="bg-[#0d0d0d] text-white">
                  {category.label}
                </option>
              ))}
            </select>

        </div>

        {/* Titre */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Grand titre</label>
          <input
            type="text"
            value={pageData.title}
            onChange={(e) => onChange({ title: e.target.value })}
            className="w-full p-3 border border-white/30 bg-white/20 rounded-lg placeholder-white/70 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Entrez un titre"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Description</label>
          <textarea
            value={pageData.description}
            onChange={(e) => onChange({ description: e.target.value })}
            rows={5}
            className="w-full p-3 border border-white/30 bg-white/20 rounded-lg placeholder-white/70 text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            placeholder="Entrez une description"
          />
        </div>

        {/* Image */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white/80">Image</label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
              <input
                type="url"
                placeholder="Entrez l'URL de l'image"
                className="w-full p-3 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  onChange={(e) => {
                    onImageUrl(e.target.value);
                    if (e.target.value) {
                      // Si URL, on ignore l'upload
                      document.querySelector('#image-file-input').value = ''; // vide le champ fichier
                    }
                  }}
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
                  id="image-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    onImageUpload(e);
                  }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="p-4 border-2 border-dashed border-white/30 text-white rounded-lg hover:border-indigo-500 transition-colors duration-200">
                <div className="flex items-center justify-center gap-2">
                  <Upload size={20} />
                  <span>Glissez une image ou cliquez pour télécharger</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GIF */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white/80">GIF</label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Entrez l'URL du GIF"
                  className="w-full p-3 border border-white/30 bg-white/20 text-white placeholder-white/70 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  onChange={(e) => onGifUrl(e.target.value)}
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
              <div className="p-4 border-2 border-dashed border-white/30 text-white rounded-lg hover:border-indigo-500 transition-colors duration-200">
                <div className="flex items-center justify-center gap-2">
                  <Upload size={20} />
                  <span>Glissez un GIF ou cliquez pour télécharger</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position GIF */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-white/80">Position du GIF</label>
          <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
            <div className="flex items-center gap-2 text-white/70 mb-2">
              <Move size={20} />
              <span>Faites glisser le GIF sur la prévisualisation pour le positionner</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-white/70 mb-1">Position X</label>
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
                  className="w-full p-2 border border-white/30 bg-white/20 text-white rounded-md"
                />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Position Y</label>
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
                  className="w-full p-2 border border-white/30 bg-white/20 text-white rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Date</label>
          <input
            type="date"
            value={pageData.date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full p-3 border border-white/30 bg-white/20 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
          />
        </div>

        {/* Bouton */}
        <button
          onClick={onSave}
          className="w-full py-3 px-4 rounded-lg font-medium text-white bg-indigo-600/80 hover:bg-indigo-600 backdrop-blur-md border border-white/20 transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-0 shadow-lg"
        >
          Sauvegarder
        </button>

      </div>
    </div>
  );
}

export default FormSection;
