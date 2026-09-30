import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function ThemeButton({ mobile = false }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return (
    <button type="button" onClick={toggleTheme} aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`} aria-pressed={dark} className={`theme-toggle focus-ring ${mobile ? 'w-full justify-center' : ''}`}>
      <span className={`theme-toggle-icon ${dark ? 'is-dark' : ''}`} aria-hidden="true">
        {dark ? <svg viewBox="0 0 24 24" fill="none"><path d="M20.2 15.3A8.5 8.5 0 0 1 8.7 3.8 8.5 8.5 0 1 0 20.2 15.3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg> : <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>}
      </span>
      <span className="text-sm font-semibold">{dark ? 'Dark' : 'Light'} mode</span>
    </button>
  );
}

const navClass = ({ isActive }) => `nav-link${isActive ? ' nav-link-active' : ''}`;

export default function Navbar({ isAuthenticated, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-nav-wrap">
        <Link to="/" className="brand focus-ring" aria-label="Day28 home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true">D<span>28</span></span>
          <span className="brand-wordmark">day28<span> / GOODS FOR LIVING</span></span>
        </Link>
        <nav aria-label="Main navigation" className="desktop-nav">
          <NavLink to="/" end className={navClass}>Discover</NavLink>
          <NavLink to="/cart" className={navClass}>The bag</NavLink>
          {isAuthenticated && <NavLink to="/dashboard" className={navClass}>Account</NavLink>}
        </nav>
        <div className="desktop-actions">
          <ThemeButton />
          {isAuthenticated ? <><span className="nav-greeting">Hello, {user?.name || 'there'}</span><button type="button" onClick={onLogout} className="button-quiet">Sign out</button></> : <><Link to="/login" className="button-quiet">Sign in</Link><Link to="/register" className="button-primary nav-join">Join us <span aria-hidden="true">↗</span></Link></>}
        </div>
        <button type="button" className="mobile-menu-button focus-ring" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <span className={`hamburger ${menuOpen ? 'open' : ''}`} aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      {menuOpen && <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-nav">
        <NavLink to="/" end className={navClass} onClick={closeMenu}>Discover</NavLink>
        <NavLink to="/cart" className={navClass} onClick={closeMenu}>The bag <span className="bag-dot" aria-hidden="true" /></NavLink>
        {isAuthenticated && <NavLink to="/dashboard" className={navClass} onClick={closeMenu}>Account</NavLink>}
        <ThemeButton mobile />
        {isAuthenticated ? <button type="button" onClick={() => { closeMenu(); onLogout(); }} className="button-quiet mobile-auth-action">Sign out</button> : <div className="mobile-auth-actions"><Link to="/login" className="button-quiet" onClick={closeMenu}>Sign in</Link><Link to="/register" className="button-primary" onClick={closeMenu}>Join us <span aria-hidden="true">↗</span></Link></div>}
      </nav>}
    </header>
  );
}