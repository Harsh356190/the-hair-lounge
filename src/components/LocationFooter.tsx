import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData.ts';
import { MapPin, Phone, Clock, Share2, Compass, Check, Heart, ShieldCheck } from 'lucide-react';

export const LocationFooter: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'The Hair lounge Unisex Salon Pune',
        text: 'Visit The Hair Lounge Unisex Salon in Agarkar Nagar, Pune. 4.9★ Google rated for Nanoplastia, Hair Spa & Bridal Makeover!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${SALON_INFO.name}\n${SALON_INFO.address}\nPhone: ${SALON_INFO.phone}\nPlus Code: ${SALON_INFO.plusCode}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <footer id="location" className="relative bg-black border-t border-white/10 pt-20 pb-12 px-4 sm:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Info & Mission (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="#ffffff" className="shrink-0">
                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
              </svg>
              <div>
                <span className="text-2xl font-playfair italic text-white block">
                  The Hair Lounge
                </span>
                <span className="text-xs text-white/50 block font-normal">
                  थे हेयर लाउंज यूनिसेक्स सैलून · Pune
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              A serene beauty haven nestled in Agarkar Nagar by Pune Station. Led by Shilpa & Santosh, dedicated to transformative Nanoplastia, soothing hair spas, and exquisite bridal makeovers.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                <Heart className="w-3 h-3 text-rose-400" />
                <span>Identifies as women-owned</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>LGBTQ+ friendly</span>
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Details Copied to Clipboard!' : 'Share Salon Contact Card'}</span>
              </button>
            </div>
          </div>

          {/* Location & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#e8702a]">
              Address & Contact
            </h4>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
              <MapPin className="w-4 h-4 text-[#e8702a] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {SALON_INFO.address}
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80">
              <Compass className="w-4 h-4 text-[#e8702a] shrink-0" />
              <span>Plus Code: <strong>{SALON_INFO.plusCode}</strong></span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm text-white/80">
              <Phone className="w-4 h-4 text-[#e8702a] shrink-0" />
              <a href={`tel:${SALON_INFO.phoneRaw}`} className="hover:text-white transition-colors underline underline-offset-4">
                {SALON_INFO.phone}
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=The+Hair+lounge+Unisex+Salon+Bldg+no+4+Ground+floor+Bank+of+Baroda+station+road+Agarkar+Nagar+Pune"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Operating Hours & Popular Times (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#e8702a]">
              Hours & Schedule
            </h4>

            <div className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
              <Clock className="w-4 h-4 text-[#e8702a] shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-medium">Tuesday – Sunday</p>
                <p className="text-white/60">09:00 AM – 09:00 PM</p>
                <p className="text-amber-400/90 text-xs mt-1.5">
                  Monday: Closed (Available for bridal events)
                </p>
              </div>
            </div>

            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-white/60">
              <span className="text-white font-medium block mb-1">Popular Times</span>
              Peak hours between 12:00 PM – 6:00 PM. We recommend booking in advance for weekend slots.
            </div>
          </div>
        </div>

        {/* Bottom subtle copyright and legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} The Hair Lounge Unisex Salon. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Agarkar Nagar · Station Road · Pune 411001</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
