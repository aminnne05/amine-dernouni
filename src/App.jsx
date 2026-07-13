import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { LanguageProvider } from "./i18n/LanguageContext";
import Homepage from "./pages/Homepage";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Placeholder({ name }) {
  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center bg-ivoire pt-14">
      <p className="text-xl font-light text-encre">Page "{name}" — à venir</p>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <BrowserRouter>
      <LanguageProvider>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
        <ScrollToTop />
        <Header />
        {/* main au-dessus du footer fixé : effet reveal */}
        <main className="relative z-10 bg-ivoire shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/projets/:slug" element={<ProjectDetail />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/en" element={<Homepage />} />
            <Route path="/en/projets" element={<Projects />} />
            <Route path="/en/projets/:slug" element={<ProjectDetail />} />
            <Route path="/en/a-propos" element={<About />} />
            <Route path="/en/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
