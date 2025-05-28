import React, { useState } from 'react';
import FormSection from '../Components/FormSection';
import PreviewSection from '../Components/PreviewSection';
import SaveModal from '../Components/SaveModal';
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Créer une page</h1>

<div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-150px)]">
  {/* Section formulaire avec scroll */}
  <div className="w-full lg:w-1/2 h-full overflow-y-auto bg-white rounded-lg shadow p-4">
    <FormSection
      pageData={pageData}
      onChange={handleChange}
      onImageUpload={handleImageUpload}
      onGifUpload={handleGifUpload}
      onSave={handleSave}
    />
  </div>

  {/* Section preview fixe */}
  <div className="w-full lg:w-1/2 h-full overflow-hidden bg-gray-200 rounded-lg shadow p-4">
    <PreviewSection
      pageData={pageData}
      onGifPositionChange={handleGifPositionChange}
    />
  </div>
</div>

      </div>

      <SaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pageData={pageData}
        onSave={handleFinalSave}
        onExportPDF={handleExportPDF}
        onShare={handleShare}
      />
    </div>
  );
};

export default CreatePage;
