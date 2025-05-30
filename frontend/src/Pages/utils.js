import axios from 'axios';
// utils.js

/**
 * Format a date string to a localized date format
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

/**
 * Convert a File object to a data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Mock function to save data (would connect to a backend in a real app)
 */
export const savePageData = async (pageData) => {
  const token = localStorage.getItem('token');
  const formData = new FormData();

  formData.append('category', pageData.category);
  formData.append('title', pageData.title);
  formData.append('description', pageData.description);
  formData.append('date', pageData.date);
  formData.append('gifPositionX', pageData.gifPosition?.x);
  formData.append('gifPositionY', pageData.gifPosition?.y);

  if (pageData.image instanceof File) {
    formData.append('image', pageData.image);
  }

  if (pageData.gif instanceof File) {
    formData.append('gif', pageData.gif);
  }
  for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
  }


  try {
    const response = await axios.post('http://localhost:4000/api/page/save', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Erreur sauvegarde page :', error);
    throw error;
  }
};

/**
 * Mock function to export PDF
 */
export const exportToPDF = async () => {
  // This would use a PDF generation library in a real app
  console.log('Exporting to PDF');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  alert('PDF export feature would be implemented here');
  return true;
};

/**
 * Mock function to share content
 */
export const shareContent = async () => {
  // This would use the Web Share API or a custom sharing solution
  console.log('Sharing content');
  
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Ma page créative',
        text: "Regardez cette page que j'ai créée!",
        url: window.location.href,
      });
      return true;
    } catch (err) {
      console.error('Error sharing:', err);
    }
  } else {
    alert('Sharing feature would be implemented here');
  }
  
  return false;
};
