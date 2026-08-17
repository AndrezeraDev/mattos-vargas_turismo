import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap-wide footer-inner">
        <img
          className="footer-logo"
          src="/assets/logo-wordmark-transparente.png"
          alt="Mattos &amp; Vargas Turismo"
        />
        <nav className="footer-nav">
          <Link to="/#experiencias">Experiências</Link>
          <Link to="/#sobre">Nosso jeito</Link>
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
