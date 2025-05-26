import { NavLink, useNavigate } from "react-router-dom";
export default function HomePage() {

    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
    return(
    <>
    <button
      onClick={handleLogout}
      className="p-4 rounded-xl bg-violet-500 text-black shadow-md border border-red-600 transition-all duration-300 hover:bg-red-600 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 active:scale-95"
    >
      Deconnecter
    </button></>
);
}