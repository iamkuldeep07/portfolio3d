import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import NavBar from "./components/NavBar.jsx";
import Projects from "./sections/Projects.jsx";
import ExperienceSection from "./sections/ExperienceSection.jsx";
import TechStack from "./sections/TechStack.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

const App = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Projects />
      {/* <ExperienceSection /> */}
      <TechStack />
      <Contact />
      <Footer />
    </>
  );
};

export default App;
