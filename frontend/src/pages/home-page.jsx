import Header2 from "../components/Header2";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Showcase from "../components/ShowCase";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

export default function HomePage() {

  //   const navigate = useNavigate();
  //   const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/');
  // };
    return(
    <>
        <Header2 />
        <Hero />
        <Features />
        <Showcase />
        <HowItWorks />
        <Footer />
    </>
);
}