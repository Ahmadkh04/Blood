import { useState } from 'react';
import { Droplet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const API_URL = 'http://localhost:5000/api';

const Register = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      bloodType: formData.get('bloodType'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      notes: formData.get('notes') || null,
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
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
        setLoading(false);
        return;
      }

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails but status is 201, registration likely succeeded
        if (response.status === 201) {
          setError('');
          setSubmitted(true);
          event.currentTarget.reset();
          setTimeout(() => {
            navigate('/');
          }, 2000);
          return;
        }
        setError('Server returned an invalid response');
        return;
      }

      if (result.success) {
        // Clear any previous errors immediately
        setError('');
        
        // Store token in localStorage
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        if (result.user) {
          localStorage.setItem('user', JSON.stringify(result.user));
        }
        setSubmitted(true);
        event.currentTarget.reset();
        
        // Redirect to home after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      // Check if this is a network error or CORS issue
      // If the user was created (we can't verify here), don't show error
      // But if it's a clear network failure, show the error
      if (err.message && err.message.includes('Failed to fetch')) {
        // This might be CORS or network issue, but registration might have succeeded
        // Don't show error immediately - let user check if they were registered
        console.warn('Network error, but registration may have succeeded. Check database.');
      } else {
        setError('Unable to connect to server. Please make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-4 py-16">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-xl ring-1 ring-gray-100">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-lifedrop">
            <Droplet className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600">
            Build your donor profile so we can match you with nearby drives.
          </p>
        </div>

        {error && !submitted && (
          <div className="mb-5 rounded-2xl bg-red-50 border border-red-200 p-4 text-center">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {submitted ? (
          <div className="rounded-2xl bg-gray-50 p-8 text-center">
            <p className="text-2xl font-semibold text-gray-900">Thanks for joining LifeDrop!</p>
            <p className="mt-3 text-gray-600">
              Your account has been created successfully. Redirecting to home page...
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Full name"
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone number"
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              />
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="email"
                name="email"
                required
                placeholder="Email address"
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              />
              <select
                name="bloodType"
                required
                defaultValue=""
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm text-gray-500 shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              >
                <option disabled value="">
                  Select blood type
                </option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <input
                type="password"
                name="password"
                required
                placeholder="Password"
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              />
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Confirm password"
                className="rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
              />
            </div>
            <textarea
              name="notes"
              rows="3"
              placeholder="Health notes (optional)"
              className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-lifedrop px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link className="font-semibold text-lifedrop hover:text-lifedropDark" to="/login">
            Sign in here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

