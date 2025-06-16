import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X } from 'lucide-react';
import Button from './Button';
import axios from 'axios';

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get("http://localhost:4000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Erreur utilisateur :", err.message);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/auth/delete/${user.id}`);
      setShowPopup(false);
      setIsMenuOpen(false);
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      alert('Erreur lors de la suppression : ' + err.message);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-sm py-3' : 'bg-transparent py-5'}`} onMouseLeave={() => setOpen(false)}>
      <div className="container mx-auto px-4 flex justify-between items-center">

        {/* Logo */}
        <div className="flex items-center">
          <HashLink smooth to="/home" className="text-white font-bold text-2xl hover:text-violet-500 transition-colors" onClick={() => setIsMenuOpen(false)}>
            TheEnd<span className="text-violet-500">.</span>page
          </HashLink>
        </div>

        {/* Nav Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <HashLink smooth to="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">All Posts</HashLink>
          <HashLink smooth to="/myposts" className="text-gray-300 hover:text-white transition-colors">My Posts</HashLink>
          <HashLink smooth to="/CreateEndPage" className="text-gray-300 hover:text-white py-2">Create Page</HashLink>

          {/* Avatar dropdown */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                onMouseEnter={() => setOpen(true)}
                className="w-12 h-12 rounded-full overflow-hidden bg-purple-500 transition hover:scale-110"
              >
                {user.image ? (
                  <img
                    src={`http://localhost:4000/uploads/${user.image}`}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg viewBox="0 0 24 24" fill="white" width="20" height="20">
                    <path d="M12 2c2.757 0 5 2.243 5 5.001 0 2.756-2.243 5-5 5s-5-2.244-5-5c0-2.758 2.243-5.001 5-5.001zm0-2c-3.866 0-7 3.134-7 7.001 0 3.865 3.134 7 7 7s7-3.135 7-7c0-3.867-3.134-7.001-7-7.001zm6.369 13.353c-.497.498-1.057.931-1.658 1.302 2.872 1.874 4.378 5.083 4.972 7.346h-19.387c.572-2.29 2.058-5.503 4.973-7.358-.603-.374-1.162-.811-1.658-1.312-4.258 3.072-5.611 8.506-5.611 10.669h24c0-2.142-1.44-7.557-5.631-10.647z" />
                  </svg>
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-50 p-2">
                  <legend className="text-xs uppercase text-gray-500 px-4 py-1">Quick Start</legend>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/profile/update" state={{ userId: user._id }} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                        ✏️ Update profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => setShowPopup(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                      >
                        🗑️ Delete profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                      >
                        🚪 Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Content */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} bg-black/95`}>
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <HashLink smooth to="/#how-it-works" className="text-gray-300 hover:text-white py-2">All Posts</HashLink>
          <HashLink smooth to="/#showcase" className="text-gray-300 hover:text-white py-2">My Posts</HashLink>
          <HashLink smooth to="/CreateEndPage" className="text-gray-300 hover:text-white py-2">Create Page</HashLink>
  {user && (
    <div>
      <Button
        variant="primary"
        fullWidth
        onClick={() => setOpen(!open)}
      >
        {user.firstname} {user.lastname}
      </Button>
      {open && (
        <div className="mt-2 bg-white rounded-md shadow-xl z-50 p-2">
          <legend className="text-xs uppercase text-gray-500 px-4 py-1">Quick Start</legend>
          <ul className="space-y-2">
            <li>
              <Link to="/profile/update" state={{ userId: user._id }} className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100">
                ✏️ Update profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                🗑️ Delete profile
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                🚪 Log out
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )}

        </div>
      </div>
      {showPopup && user && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 text-center">
            <img
              src={`http://localhost:4000/uploads/${user.image}`}
              alt="Profile"
              className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">
              Supprimer {user.firstname} ?
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Cette action est irréversible.
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md"
              >
                Supprimer
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header2;
