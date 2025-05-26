import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
    setUser({ ...user, image: e.target.files[0] });
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
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil.");
    }
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Modifier mon profil</h1>
      {successMessage && (
        <div className="mb-4 text-green-600 font-semibold">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* Nom */}
        <div>
          <label className="block mb-1 font-medium">Firstname</label>
          <input
            type="text"
            name="firstname"
            value={user.firstname || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Lastname</label>
          <input
            type="text"
            name="lastname"
            value={user.lastname || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>


        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Photo de profil</label>
          {user.image && typeof user.image === "string" && (
            <img
              src={`http://localhost:4000/uploads/${user.image}`}
              alt="Avatar actuel"
              className="mb-2 w-24 h-24 object-cover rounded-full border"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full"
          />
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
        >
          Enregistrer les modifications
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
