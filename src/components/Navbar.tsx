import React, { useState } from 'react';
import { Phone, Calendar, Menu, X, MapPin, Sparkles, Star } from 'lucide-react';
import { SALON_INFO } from '../data/salonData.ts';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Lounge' },
    { id: 'services', label: 'Services' },
    { id: 'nanoplastia', label: 'Nanoplastia' },
    { id: 'bridal', label: 'Bridal Art' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Visit Us' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* Left: Brand Logo & Wordmark */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          aria-label="The Hair Lounge Home"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            fill="#ffffff"
            className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <div className="flex flex-col">
            <span className="text-white text-2xl font-playfair italic leading-none tracking-tight">
              The Hair Lounge
            </span>
            <span className="text-[10px] uppercase tracking-wider text-white/60 font-medium hidden sm:block mt-0.5">
              Unisex Salon · Pune Station
            </span>
          </div>
        </button>

        {/* Center Pill Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-2 py-2 items-center gap-1 shadow-lg shadow-black/20">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/30 text-white shadow-xs'
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`tel:${SALON_INFO.phoneRaw}`}
            className="flex items-center gap-2 text-white/80 hover:text-white text-xs font-medium px-3 py-2 rounded-full border border-white/20 hover:border-white/40 transition-colors bg-black/20 backdrop-blur-xs"
            title="Call Salon"
          >
            <Phone className="w-3.5 h-3.5 text-[#e8702a]" />
            <span>086689 68858</span>
          </a>
          <button
            onClick={() => onOpenBooking()}
            className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-98 shadow-sm cursor-pointer whitespace-nowrap shrink-0"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenBooking()}
            className="bg-[#e8702a] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-sm"
          >
            Book
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/90 hover:text-white bg-white/10 rounded-full border border-white/20 backdrop-blur-md"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-8 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-medium mb-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.9 Google Rated (38 Reviews) · Women Owned</span>
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`text-left text-xl py-2.5 font-playfair transition-colors border-b border-white/10 ${
                  activeSection === item.id ? 'text-[#e8702a] italic' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-[#e8702a] text-white py-3.5 rounded-full font-medium text-center flex items-center justify-center gap-2 shadow-lg shadow-[#e8702a]/30"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </button>
            <a
              href={`tel:${SALON_INFO.phoneRaw}`}
              className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-full font-medium text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#e8702a]" />
              <span>Direct Call: 086689 68858</span>
            </a>
            <p className="text-white/50 text-[11px] text-center mt-2">
              Bldg 4 Ground floor, Bank of Baroda branch, Agarkar Nagar, Pune Station
            </p>
          </div>
        </div>
      )}
    </>
  );
};
