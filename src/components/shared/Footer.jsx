// src/components/shared/Footer.jsx

import { Link } from "react-router-dom";
import {
  FiMail,
  FiMapPin,
  FiInstagram,
} from "react-icons/fi";
import {
  FaXTwitter,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";
import { ImWhatsapp } from "react-icons/im";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = {
    facebook: "https://facebook.com/bornobyte",
    twitter: "https://twitter.com/bornobyte",
    linkedin: "https://linkedin.com/company/bornobyte",
    instagram: "https://instagram.com/bornobyte",
    youtube: "https://youtube.com/@bornobyte",
  };

  const contact = {
    email: "hello@bornobyte.com",
    phone: "+8801700000000",
    address: "Dhaka, Bangladesh",
  };

  return (
    <footer className="bg-base-100 text-base-content pt-16 pb-12 mt-24 border-t border-base-200">
      {/* Max-width container + proper horizontal padding */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Main Grid — perfect spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 xl:gap-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight">
              BornoByte<span className="text-primary">.</span>
            </h2>
            <p className="text-base-content/70 text-sm leading-relaxed max-w-xs">
              Building innovative digital solutions for tomorrow’s challenges.
            </p>

            {/* Social Icons — tighter spacing */}
            <div className="flex items-center gap-3">
              {[
                { href: socialLinks.facebook, icon: <FaFacebook size={19} /> },
                { href: socialLinks.twitter, icon: <FaXTwitter size={19} /> },
                { href: socialLinks.linkedin, icon: <FaLinkedin size={19} /> },
                { href: socialLinks.instagram, icon: <FiInstagram size={20} /> },
                { href: socialLinks.youtube, icon: <FaYoutube size={21} /> },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-base-200 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  aria-label="Social link"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {["Services", "Projects", "About", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-base-content/70 hover:text-primary transition-colors duration-300 text-sm block"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 text-base-content/80 hover:text-primary transition-colors"
                >
                  <FiMail className="text-primary" size={19} />
                  <span>{contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${contact.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base-content/80 hover:text-primary transition-colors"
                >
                  <ImWhatsapp className="text-primary" size={19} />
                  <span>{contact.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Dhaka,Bangladesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-base-content/80 hover:text-primary transition-colors"
                >
                  <FiMapPin className="text-primary" size={19} />
                  <span>{contact.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="font-bold text-lg">Newsletter</h3>
            <p className="text-base-content/70 text-sm">
              Stay updated with our latest news and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-base-200 border border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
              <button className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-focus text-button dark:text-button font-semibold shadow-lg hover:shadow-primary/40 transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

{/* Divider – clean, 80% opacity, works everywhere */}
<div className="my-12 border-t border-current opacity-80"></div>

        {/* Bottom Bar — perfectly centered */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-base-content/60">
          <p>© {currentYear} BornoByte Agency. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;