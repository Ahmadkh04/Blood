import { useState } from 'react';
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Droplet,
  Heart,
  MapPin,
  Phone,
  Shield,
  Users,
} from 'lucide-react';
import heroImage from '../assets/hero.jpg';
import donorsImage from '../assets/donors.jpg';

const benefitCards = [
  {
    icon: Heart,
    title: 'Save Lives',
    description: 'A single donation can support transfusions for up to three patients.',
  },
  {
    icon: Activity,
    title: 'Health Benefits',
    description: 'Regular donors enjoy free mini checkups and balanced iron levels.',
  },
  {
    icon: Users,
    title: 'Community Impact',
    description: 'Ensure hospitals are ready for everyday needs and emergencies.',
  },
];

const eligibilityChecklist = [
  '17 years or older (16 with consent in some regions)',
  'Weigh at least 110 pounds (50 kg)',
  'Feeling healthy on the day of donation',
  'Wait 56 days between whole blood donations',
];

const donationSteps = [
  { title: 'Schedule', description: 'Pick a time that fits your day in just seconds.' },
  { title: 'Screening', description: 'Enjoy a quick wellness check with our nurses.' },
  { title: 'Donation', description: 'The actual draw lasts about 8-10 minutes.' },
  { title: 'Refresh', description: 'Celebrate with snacks and know you’ve helped others.' },
];

const bloodTypes = [
  { type: 'O-', role: 'Universal donor' },
  { type: 'O+', role: 'Most transfused type' },
  { type: 'A+', role: 'Needed for trauma response' },
  { type: 'A-', role: 'Critical for platelets' },
  { type: 'B+', role: 'Supports positive recipients' },
  { type: 'B-', role: 'Rare but vital' },
  { type: 'AB+', role: 'Universal recipient' },
  { type: 'AB-', role: 'Plasma hero' },
];

const stats = [
  { label: 'Lives touched each year', value: '10K+' },
  { label: 'Active donors', value: '4.2K' },
  { label: 'Partner hospitals', value: '120+' },
];

const API_URL = 'http://localhost:5000/api';

const Home = () => {
  const [formState, setFormState] = useState('idle');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScheduleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      date: formData.get('date'),
      bloodType: formData.get('bloodType'),
    };

    // Get token from localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please login first to schedule a donation');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/donations/schedule`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails but status is 201, donation likely succeeded
        if (response.status === 201) {
          setError('');
          setFormState('success');
          event.currentTarget.reset();
          return;
        }
        setError('Server returned an invalid response');
        return;
      }

      if (result.success) {
        // Clear any previous errors immediately
        setError('');
        setFormState('success');
        event.currentTarget.reset();
      } else {
        setError(result.message || 'Failed to schedule donation. Please try again.');
      }
    } catch (err) {
      console.error('Schedule donation error:', err);
      // Check if this is a network error
      if (err.message && err.message.includes('Failed to fetch')) {
        console.warn('Network error, but donation may have succeeded. Check database.');
      } else {
        setError('Unable to connect to server. Please make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section
        className="bg-gradient-to-br from-lifedrop to-lifedropDark text-white"
        id="hero"
      >
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-12 px-6 py-20 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm">
              <Shield className="h-4 w-4" />
              Trusted community program
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Your donation keeps hope flowing
            </h1>
            <p className="mt-6 text-lg text-white/90">
              Every two seconds someone needs blood. Join thousands of LifeDrop donors who
              make sure no patient waits.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#donate"
                className="rounded-md bg-white px-6 py-3 font-semibold text-lifedrop shadow-lg shadow-red-200 transition hover:-translate-y-0.5"
              >
                Donate Now
              </a>
              <a
                href="#about"
                className="rounded-md border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Learn More
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 rounded-2xl bg-white/10 p-6 text-center text-white">
              {stats.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-bold">{value}</p>
                  <p className="text-sm text-white/80">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img
              src={heroImage}
              alt="Blood donation"
              className="w-full rounded-3xl shadow-2xl ring-8 ring-white/20"
            />
          </div>
        </div>
      </section>

      <section id="about" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-14 text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-lifedrop">
              Why LifeDrop
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
              A kinder, smarter way to donate
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We match donors and hospitals in real-time so every drop reaches the patients
              who need it the most.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {benefitCards.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-full bg-red-50 p-3 text-lifedrop">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                <p className="mt-3 text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-lifedrop">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold text-gray-900">Donation journey</h2>
              <p className="mt-4 text-gray-600">
                We built LifeDrop to be stress-free from the moment you tap “schedule” until
                you return to your day.
              </p>
              <div className="mt-8 space-y-6">
                {donationSteps.map(({ title, description }, index) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-lg font-bold text-lifedrop">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                      <p className="text-gray-600">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <img
                src={donorsImage}
                alt="Donors"
                className="rounded-3xl shadow-xl ring-8 ring-red-50"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="eligibility" className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl bg-white p-10 shadow-lg ring-1 ring-gray-100">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-lifedrop" />
                  <p className="text-sm font-semibold uppercase tracking-wider text-lifedrop">
                    Eligibility
                  </p>
                </div>
                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  Can I donate today?
                </h2>
                <p className="mt-4 text-gray-600">
                  Most healthy adults qualify. Review the checklist below and message us if
                  you have questions.
                </p>
                <ul className="mt-6 space-y-3">
                  {eligibilityChecklist.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className="mt-1 h-5 w-5 text-green-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-gray-50 p-8">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-6 w-6 text-lifedrop" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Reserve a donation slot
                  </h3>
                </div>
                {error && formState !== 'success' && (
                  <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-center">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}
                {formState === 'success' ? (
                  <div className="mt-6 rounded-xl bg-white p-6 text-center shadow-inner">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
                    <p className="mt-3 text-lg font-semibold text-gray-900">All set!</p>
                    <p className="text-gray-600">
                      A coordinator will confirm your appointment shortly.
                    </p>
                  </div>
                ) : (
                  <form className="mt-6 space-y-4" onSubmit={handleScheduleSubmit}>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Full name"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Email address"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Phone number"
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
                      />
                      <input
                        type="date"
                        name="date"
                        required
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
                      />
                    </div>
                    <select
                      name="bloodType"
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-lifedrop focus:ring-lifedrop"
                    >
                      <option value="">Select your blood type</option>
                      {bloodTypes.map(({ type }) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl bg-lifedrop px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-red-200 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {loading ? 'Scheduling...' : 'Schedule donation'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-4">
            {bloodTypes.map(({ type, role }) => (
              <div
                key={type}
                className="rounded-2xl border border-gray-100 p-6 text-center shadow-sm shadow-red-50 transition hover:-translate-y-1 hover:border-lifedrop/40"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl font-bold text-lifedrop">
                  {type}
                </div>
                <p className="mt-4 font-semibold text-gray-900">{role}</p>
                <p className="mt-2 text-sm text-gray-500">High priority need</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="donate" className="bg-lifedrop text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <Droplet className="mx-auto h-12 w-12 text-white/80" />
          <h2 className="mt-4 text-3xl font-bold">Ready to make a difference?</h2>
          <p className="mt-4 text-lg text-white/80">
            Tap register to create your donor profile or sign back in to confirm your next
            visit. Every drop matters.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/register"
              className="rounded-md bg-white px-6 py-3 font-semibold text-lifedrop shadow-lg shadow-red-200 transition hover:-translate-y-0.5"
            >
              Register to Donate
            </a>
            <a
              href="/login"
              className="rounded-md border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Already a donor? Login
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-lifedrop">
            Need help?
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900">Talk to a coordinator</h2>
          <p className="mt-4 text-gray-600">
            We are happy to answer eligibility questions, help with travel planning, or set
            up group drives at your workplace or campus.
          </p>
          <div className="mt-8 flex flex-col gap-4 text-left md:flex-row md:justify-center">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-5 shadow-sm">
              <Phone className="h-6 w-6 text-lifedrop" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Call</p>
                <p className="font-semibold text-gray-900">Lebanon Red Cross • 140</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 p-5 shadow-sm">
              <MapPin className="h-6 w-6 text-lifedrop" />
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">Visit</p>
                <p className="font-semibold text-gray-900">Beirut, Lebanon</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

