import { Droplet } from 'lucide-react';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#privacy' },
];

const Footer = () => (
  <footer className="bg-gray-900 text-gray-200">
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Droplet className="h-7 w-7 text-lifedrop" />
          <div>
            <p className="text-xl font-semibold">LifeDrop</p>
            <p className="text-sm text-gray-400">Saving lives together.</p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          {footerLinks.map(({ label, href }) => (
            <a key={label} href={href} className="hover:text-white transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LifeDrop. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;

