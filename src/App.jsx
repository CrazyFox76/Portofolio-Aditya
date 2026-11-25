import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Hero from "./sections/Hero";
import FolderRow from "./sections/FolderRow";
import BrandStory from "./sections/BrandStory";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Dock from "./components/Dock";
import Footer from "./components/Footer";
import { LanguageProvider } from "./i18n/LanguageContext";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import NotFoundPage from "./Pages/404";
import { supabase } from "./supabase";

const LandingPage = () => (
  <>
    <Dock />
    <Hero />
    <FolderRow />
    <BrandStory />
    {/* Legacy sections, replaced phase by phase. They need Supabase until moved to static data. */}
    {supabase && (
      <>
        <AnimatedBackground />
        <About />
        <Portofolio />
        <ContactPage />
      </>
    )}
    <Footer />
  </>
);

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
         <Route path="*" element={<NotFoundPage />} /> {/* Ini route 404 */}
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;