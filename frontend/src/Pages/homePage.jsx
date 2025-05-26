import Header2 from "../Components/header2";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Showcase from "../Components/ShowCase";
import HowItWorks from "../Components/HowItWorks";
import Footer from "../Components/Footer";

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