import { Link } from 'react-router';

export default function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <Link to="/" className="brand footer-brand"><span className="brand-mark" aria-hidden="true">C</span><span className="brand-wordmark">ClassyWear<span> / GOODS FOR LIVING</span></span></Link>
    <p>© 2025 ClassyWear. Built with intention — by Prathmesh Kolam.</p>
    <nav className="footer-links" aria-label="Footer navigation"><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#shipping">Shipping</a></nav>
  </div></footer>;
}