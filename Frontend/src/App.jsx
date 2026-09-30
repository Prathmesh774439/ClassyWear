import { Link, Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import CartPage from './pages/CartPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';

function AppLayout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
            Day28 Commerce
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'font-semibold text-brand-600' : 'text-slate-600 hover:text-slate-900')}>
              Shop
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => (isActive ? 'font-semibold text-brand-600' : 'text-slate-600 hover:text-slate-900')}>
              Cart
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'font-semibold text-brand-600' : 'text-slate-600 hover:text-slate-900')}>
              Dashboard
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="hidden text-sm font-medium text-slate-700 sm:block">Hi, {user?.name || 'there'}</span>
                <Link to="/cart" className="secondary-button">
                  Cart
                </Link>
                <button type="button" onClick={handleLogout} className="secondary-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/cart" className="secondary-button">
                  Cart
                </Link>
                <Link to="/login" className="secondary-button">
                  Login
                </Link>
                <Link to="/register" className="primary-button">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
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
