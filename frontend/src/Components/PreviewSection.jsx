import { useRef } from 'react';
import CategoryBackground from './CategoryBackground';
import DraggableGif from './DraggableGif';
import { formatDate } from "../Pages/utils";

function PreviewSection({ pageData, onGifPositionChange }) {
  const containerRef = useRef(null);
  const { category, title, description, image, gif, date, gifPosition } = pageData;

  return (
    <div
      ref={containerRef}
      className="relative h-full overflow-hidden rounded-lg shadow-md bg-white"
    >
      <CategoryBackground category={category} />

      <div className="absolute inset-0 overflow-auto p-6">
        <div className="relative z-10">
          {title && (
            <h1 className={`text-4xl font-bold mb-6 ${category ? 'text-white' : 'text-gray-900'} transition-colors duration-500`}>
              {title}
            </h1>
          )}

          <div className="flex flex-col md:flex-row gap-6">
            {image && (
              <div className="md:w-1/2 flex-shrink-0">
                <img
                  src={image}
                  alt="Contenu téléchargé"
                  className="rounded-lg shadow-md max-w-full h-auto object-cover"
                />
              </div>
            )}

            {description && (
              <div className={`md:w-1/2 ${category ? 'text-white' : 'text-gray-800'} transition-colors duration-500`}>
                <p className="text-lg whitespace-pre-wrap">{description}</p>
              </div>
            )}
          </div>

          {date && (
            <div className={`mt-6 ${category ? 'text-white' : 'text-gray-600'} transition-colors duration-500`}>
              <p className="text-sm font-medium">{formatDate(date)}</p>
            </div>
          )}
        </div>
      </div>

      {gif && (
        <DraggableGif
          src={gif}
          position={gifPosition}
          onPositionChange={onGifPositionChange}
          containerRef={containerRef}
        />
      )}

      {!category && !title && !description && !image && !gif && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <p className="text-xl">Commencez à remplir le formulaire pour voir la prévisualisation</p>
        </div>
      )}
    </div>
  );
}

export default PreviewSection;
