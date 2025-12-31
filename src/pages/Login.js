import { useState } from 'react';
import { Droplet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

const Login = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Server error occurred' }));
        setError(errorData.message || `Server error: ${response.status}`);
        setSubmitting(false);
        return;
      }

      const result = await response.json();

      if (result.success) {
        // Store token and user in localStorage
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        
        // Redirect to home page
        navigate('/');
      } else {
        setError(result.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please make sure the backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-white p-10 shadow-xl ring-1 ring-gray-100">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-lifedrop">
            <Droplet className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to schedule donations and view your history.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 p-4 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              />
            </div>
            <div>
              <label className="sr-only" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input
                type="checkbox"
                name="remember"
                className="rounded border-gray-300 text-lifedrop focus:ring-lifedrop"
              />
              Remember me
            </label>
            <button type="button" className="font-medium text-lifedrop hover:text-lifedropDark">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-2xl bg-lifedrop px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link className="font-semibold text-lifedrop hover:text-lifedropDark" to="/register">
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

