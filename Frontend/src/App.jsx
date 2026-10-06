import { Link, Navigate, NavLink, Route, Routes, useNavigate } from 'react-router';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer';
import HeroBackground from './components/HeroBackground';

const navLinkClass = ({ isActive }) =>
  [
    'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600',
    isActive
      ? 'bg-brand-600 text-white shadow-sm'
      : 'text-muted hover:text-white',
  ].join(' ');

const secondaryBtn =
  'inline-flex items-center justify-center rounded-full border border-line bg-transparent px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:border-brand-600 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

const primaryBtn =
  'inline-flex items-center justify-center rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2';

function AppLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="app-shell">
      <HeroBackground />
      <header className="site-header app-header sticky top-0 z-50 border-b border-line/60">
        <div className="app-nav-inner mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="app-brand text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
          >
            <span className="app-brand-mark" aria-hidden="true">C</span>
            <span className="app-brand-copy">
              <span className="app-brand-title">CartBurster</span>
              <span className="app-brand-tagline">THE EVERYDAY, EDITED</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 p-1 md:flex" aria-label="Main navigation">
            <NavLink to="/" className={(state) => `${navLinkClass(state)} app-nav-link`}>Discover</NavLink>
            <NavLink to="/cart" className={(state) => `${navLinkClass(state)} app-nav-link`}>The bag</NavLink>
            <NavLink to="/dashboard" className={(state) => `${navLinkClass(state)} app-nav-link`}>Account</NavLink>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <>
                <div className="hidden items-center gap-2 sm:flex">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-xs font-bold uppercase text-white">
                    {(user?.name || 'U').charAt(0)}
                  </span>
                  <span className="text-sm font-medium text-white">Hi, {user?.name || 'there'}</span>
                </div>
                <button type="button" onClick={handleLogout} className={`${secondaryBtn} app-header-action`}>
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`${secondaryBtn} app-header-action`}>Sign in</Link>
                <Link to="/register" className={`${primaryBtn} app-header-action`}>Join us <span aria-hidden="true">↗</span></Link>
              </>
            )}
          </div>
        </div>

        <nav
          className="flex gap-1 overflow-x-auto border-t border-slate-200/60 px-4 py-2 md:hidden"
          aria-label="Main mobile"
        >
          <NavLink to="/" className={(state) => `${navLinkClass(state)} app-nav-link`}>Discover</NavLink>
          <NavLink to="/cart" className={(state) => `${navLinkClass(state)} app-nav-link`}>The bag</NavLink>
          <NavLink to="/dashboard" className={(state) => `${navLinkClass(state)} app-nav-link`}>Account</NavLink>
        </nav>
      </header>

      <main className="page-enter mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}