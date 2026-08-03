import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap-wide footer-inner">
        <p className="footer-brand">
          Mattos <span>&amp;</span> Vargas
        </p>
        <nav className="footer-nav">
          <Link to="/#experiencias">Experiências</Link>
          <Link to="/#sobre">Quem somos</Link>
          <Link to="/#galeria">Galeria</Link>
          <Link to="/#contato">Contato</Link>
          <Link to="/links">Links</Link>
        </nav>
        <p className="footer-note">
          © {year} Mattos &amp; Vargas Turismo · Gramado, Canela e Serra Gaúcha
        </p>
      </div>
    </footer>
  );
}
