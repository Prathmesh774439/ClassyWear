import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="site-footer"><div className="footer-inner">
    <Link to="/" className="brand footer-brand"><span className="brand-mark" aria-hidden="true">D<span>28</span></span><span className="brand-wordmark">day28<span> / GOODS FOR LIVING</span></span></Link>
    <p>Thoughtful finds. Everyday keepers.</p><span className="footer-note">Made for the days that make you.</span>
  </div></footer>;
}