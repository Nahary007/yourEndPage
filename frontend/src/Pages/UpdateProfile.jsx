import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import Header2 from '../Components/header2';

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Non autorisé. Veuillez vous connecter.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        setError("Erreur lors du chargement du profil.");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, image: file, preview: URL.createObjectURL(file) });
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("firstname", user.firstname);
    formData.append("lastname", user.lastname);
    formData.append("email", user.email);
    if (user.image instanceof File) {
      formData.append("image", user.image);
    }

    try {
      await axios.post("http://localhost:4000/api/auth/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Profil mis à jour avec succès !");
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil.");
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <>
    <Header2 />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-xl mx-auto px-4 py-10 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Modifier mon profil</h1>

        {successMessage && (
          <div className="mb-6 p-3 text-green-600 font-semibold bg-green-50 rounded-md text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
          {/* Photo de profil */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-md">
                <img
                  src={
                    user.preview
                      ? user.preview
                      : typeof user.image === 'string'
                      ? `http://localhost:4000/uploads/${user.image}`
                      : 'https://via.placeholder.com/150'
                  }
                  alt="Profil"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bouton édition */}
              <button
                type="button"
                onClick={triggerFileInput}
                className="absolute bottom-4 right-0 bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200"
                aria-label="Modifier la photo"
              >
                <Pencil size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profile-image"
              />
            </div>
            <label htmlFor="profile-image" className="text-sm text-gray-500 mt-2">
              Cliquez sur l'icône crayon pour changer votre photo
            </label>
          </div>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Firstname</label>
              <input
                type="text"
                name="firstname"
                value={user.firstname || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Lastname</label>
              <input
                type="text"
                name="lastname"
                value={user.lastname || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Bouton */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 shadow-md"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default UpdateProfile;
