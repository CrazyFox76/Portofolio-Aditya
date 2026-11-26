import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Dock from "./components/Dock";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import FolderRow from "./sections/FolderRow";
import BrandStory from "./sections/BrandStory";
import WhyWait from "./sections/WhyWait";
import NotFoundPage from "./Pages/404";
import { LanguageProvider } from "./i18n/LanguageContext";

const LandingPage = () => (
  <>
    <Dock />
    <Hero />
    <FolderRow />
    <BrandStory />
    <WhyWait />
    <Footer />
  </>
);

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
