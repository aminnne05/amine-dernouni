import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ReadyContext } from "./hooks/useReady";
import PageTransition from "./components/PageTransition";
import Homepage from "./pages/Homepage";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import HorsCadre from "./pages/HorsCadre";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
        <ReadyContext.Provider value={!loading}>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
        <ScrollToTop />
        <Header />
        {/* main au-dessus du footer fixé : effet reveal */}
        <main className="relative z-10 bg-ivoire shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
          <PageTransition>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/projets" element={<Projects />} />
            <Route path="/projets/:slug" element={<ProjectDetail />} />
            <Route path="/hors-cadre" element={<HorsCadre />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/en" element={<Homepage />} />
            <Route path="/en/projets" element={<Projects />} />
            <Route path="/en/projets/:slug" element={<ProjectDetail />} />
            <Route path="/en/hors-cadre" element={<HorsCadre />} />
            <Route path="/en/a-propos" element={<About />} />
            <Route path="/en/contact" element={<Contact />} />
          </Routes>
          </PageTransition>
        </main>
        <Footer />
        </ReadyContext.Provider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
