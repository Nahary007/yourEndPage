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
  formData.append('gifPositionX', pageData.gifPosition?.x);
  formData.append('gifPositionY', pageData.gifPosition?.y);
  formData.append('date', pageData.date);

  // IMPORTANT
if (pageData.image) {
    if (pageData.image instanceof File) {
      console.log("Fichier image enregistré");
      formData.append('image', pageData.image);
    } else if (typeof pageData.image === 'string') {
      // C'est une URL (soit dataURL soit URL normale)
      console.log("URL/DataURL image seulement");
      if (pageData.image.startsWith('data:')) {
        // C'est un dataURL, on peut soit l'envoyer tel quel soit le convertir
        formData.append('imageDataUrl', pageData.image);
      } else {
        // C'est une URL normale
        formData.append('imageUrl', pageData.image);
      }
    }
  }

  // Gestion des GIFs - adaptation à votre logique actuelle
  if (pageData.gif) {
    if (pageData.gif instanceof File) {
      console.log("Fichier GIF enregistré");
      formData.append('gif', pageData.gif);
    } else if (typeof pageData.gif === 'string') {
      // C'est une URL (soit dataURL soit URL normale depuis createObjectURL)
      console.log("URL GIF seulement");
      if (pageData.gif.startsWith('blob:')) {
        // C'est un blob URL, il faut récupérer le fichier original
        // Dans ce cas, vous devriez stocker le fichier directement
        console.warn("Blob URL détecté - considérez stocker le fichier directement");
        formData.append('gifUrl', pageData.gif);
      } else if (pageData.gif.startsWith('data:')) {
        formData.append('gifDataUrl', pageData.gif);
      } else {
        formData.append('gifUrl', pageData.gif);
      }
    }
  }


  for (let pair of formData.entries()) {
  console.log(pair[0], pair[1]);
  }


  // try {
  //   const response = await axios.post('http://localhost:4000/api/page/save', formData, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'multipart/form-data',
  //     },
  //     withCredentials: true,
  //   });

  //   return response.data;
  // } catch (error) {
  //   console.error('Erreur sauvegarde page :', error);
  //   throw error;
  // }
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
