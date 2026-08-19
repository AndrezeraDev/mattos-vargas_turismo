import { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Showcase from './components/Showcase';
import Folders from './components/Folders';
import Stats from './components/Stats';
import Hosts from './components/Hosts';
import GalleryRail from './components/GalleryRail';
import InstaPreview from './components/InstaPreview';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsappFloat from './components/WhatsappFloat';
import TourPage from './components/TourPage';
import LinksPage from './components/Links';
import CategoryPage from './components/CategoryPage';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import BlogAdmin from './components/BlogAdmin';
import BackFloat from './components/BackFloat';
import './App.css';

function HomePage() {
  return (
    <main>
      <Hero />
      <Welcome />
      <Showcase />
      <Folders />
      <Stats />
      <Hosts />
      <GalleryRail />
      <Reviews />
      <InstaPreview />
      <Contact />
    </main>
  );
}

function ScrollHandler() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
  return null;
}

function Chrome({ children }) {
  const { pathname } = useLocation();
  const bare = pathname === '/links';
  return (
    <>
      {!bare && <Navbar />}
      <BackFloat />
      {children}
      {!bare && <Footer />}
      {!bare && <WhatsappFloat />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollHandler />
      <Chrome>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/passeio/:slug" element={<TourPage />} />
          <Route path="/roteiros/:slug" element={<CategoryPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/admin" element={<BlogAdmin />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/links" element={<LinksPage />} />
        </Routes>
      </Chrome>
    </BrowserRouter>
  );
}
