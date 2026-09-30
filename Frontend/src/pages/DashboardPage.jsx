import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, authApiRequest } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await authApiRequest('/auth/me');
        setProfile(data.userData);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [authApiRequest]);

  return (
    <div className="py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Protected area</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Dashboard</h1>

        {loading ? (
          <p className="mt-6 text-slate-500">Loading your profile...</p>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Name</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{profile?.name || user?.name || 'N/A'}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{profile?.email || user?.email || 'N/A'}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Authentication</p>
              <p className="mt-2 text-xl font-semibold text-emerald-600">JWT active</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Status</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">User is authenticated</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
