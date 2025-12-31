import { NavLink, Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

const navLinks = [
  { label: 'About', to: '/#about' },
  { label: 'Eligibility', to: '/#eligibility' },
  { label: 'Donate', to: '/#donate' },
];

const linkBase =
  'px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200';

const Navbar = () => (
  <header className="sticky top-0 z-50 backdrop-blur bg-white/90 border-b border-gray-100">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <Link to="/" className="flex items-center gap-2 text-lifedrop font-bold text-xl">
        <Droplet className="h-7 w-7" />
        <span>LifeDrop</span>
      </Link>

      <nav className="hidden items-center gap-6 text-sm font-medium text-gray-600 md:flex">
        {navLinks.map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `hover:text-lifedrop ${isActive ? 'text-lifedrop' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link to="/login" className={`${linkBase} bg-white text-lifedrop border border-lifedrop`}>
          Login
        </Link>
        <Link to="/register" className={`${linkBase} bg-lifedrop text-white shadow-md shadow-red-200`}>
          Register
        </Link>
      </div>
    </div>
  </header>
);

export default Navbar;

