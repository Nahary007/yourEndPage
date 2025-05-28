import { useRef } from 'react';
import CategoryBackground from './CategoryBackground';
import { formatDate } from "../Pages/utils";


function SaveModal({ isOpen, onClose, pageData, onSave, onExportPDF, onShare }) {
  const { category, title, description, image, gif, date, gifPosition } = pageData;
  const modalRef = useRef(null);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Prévisualisation</h2>
        </div>

        <div className="flex-1 overflow-auto p-0">
          <div className="relative h-[60vh] overflow-hidden">
            <CategoryBackground category={category} />

            <div className="absolute inset-0 overflow-auto p-6">
              <div className="relative z-10">
                {title && (
                  <h1 className={`text-4xl font-bold mb-6 ${category ? 'text-white' : 'text-gray-900'}`}>
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
                    <div className={`md:w-1/2 ${category ? 'text-white' : 'text-gray-800'}`}>
                      <p className="text-lg whitespace-pre-wrap">{description}</p>
                    </div>
                  )}
                </div>

                {date && (
                  <div className={`mt-6 ${category ? 'text-white' : 'text-gray-600'}`}>
                    <p className="text-sm font-medium">{formatDate(date)}</p>
                  </div>
                )}
              </div>
            </div>

            {gif && (
              <div
                className="absolute z-10"
                style={{
                  left: `${gifPosition.x}px`,
                  top: `${gifPosition.y}px`,
                }}
              >
                <img
                  src={gif}
                  alt="GIF"
                  className="max-w-[150px] max-h-[150px] rounded-md shadow-md"
                />
              </div>
            )}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex flex-wrap gap-4 justify-end">
          <button
            onClick={onShare}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Partager
          </button>
          <button
            onClick={onExportPDF}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Exporter PDF
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Enregistrer
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaveModal;
