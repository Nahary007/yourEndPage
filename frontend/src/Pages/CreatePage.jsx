import React, { useState } from 'react';
import FormSection from '../Components/FormSection';
import PreviewSection from '../Components/PreviewSection';
import SaveModal from '../Components/SaveModal';
import Header2 from '../Components/header2';
import backgroundImage from '../assets/background.png'; // Assure-toi que l'image existe
import { fileToDataUrl, savePageData, exportToPDF, shareContent } from './utils';

const CreatePage = () => {
  const [pageData, setPageData] = useState({
    category: '',
    title: '',
    description: '',
    image: null,
    gif: null,
    date: new Date().toISOString().split('T')[0],
    gifPosition: { x: 50, y: 50 }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (data) => {
    setPageData(prev => ({ ...prev, ...data }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await fileToDataUrl(file);
        handleChange({ image: dataUrl });
      } catch (error) {
        console.error('Error processing image:', error);
        alert('Failed to process image. Please try again.');
      }
    }
  };

  const handleGifUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const dataUrl = await fileToDataUrl(file);
        handleChange({ gif: dataUrl });
      } catch (error) {
        console.error('Error processing GIF:', error);
        alert('Failed to process GIF. Please try again.');
      }
    }
  };

  const handleGifPositionChange = (position) => {
    handleChange({ gifPosition: position });
  };

  const handleSave = () => {
    setIsModalOpen(true);
  };

  const handleFinalSave = async () => {
    try {
      await savePageData(pageData);
      alert('Page sauvegardée avec succès!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Failed to save page. Please try again.');
    }
  };

  const handleExportPDF = async () => {
    await exportToPDF();
  };

  const handleShare = async () => {
    await shareContent();
  };

  return (
    <>
      <Header2 />
      <div
        className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="relative z-10 w-full max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-150px)]">
            {/* Form Section */}
            <div className="w-full lg:w-1/2 h-full overflow-y-auto backdrop-blur-md bg-white/20 rounded-lg shadow-lg p-6 text-white">
              <FormSection
                pageData={pageData}
                onChange={handleChange}
                onImageUpload={handleImageUpload}
                onGifUpload={handleGifUpload}
                onSave={handleSave}
              />
            </div>

            {/* Preview Section */}
            <div className="w-full lg:w-1/2 h-full overflow-hidden backdrop-blur-md bg-white/20 rounded-lg shadow-lg p-6 text-white">
              <PreviewSection
                pageData={pageData}
                onGifPositionChange={handleGifPositionChange}
              />
            </div>
          </div>
        </div>

        {/* Modal toujours en dehors pour couvrir toute la page */}
        <SaveModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          pageData={pageData}
          onSave={handleFinalSave}
          onExportPDF={handleExportPDF}
          onShare={handleShare}
        />
      </div>
    </>
  );
};

export default CreatePage;
