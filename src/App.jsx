import ScrollProgress from "./components/ScrollProgress.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Bento from "./components/Bento.jsx";
import Work from "./components/Work.jsx";
import Skills from "./components/Skills.jsx";
import Journey from "./components/Journey.jsx";
import Beyond from "./components/Beyond.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="site">
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Bento />
        <Work />
        <Skills />
        <Journey />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
