import React from 'react';
import { Star, ShieldCheck, Heart, Clock, MapPin, Award } from 'lucide-react';
import { SALON_INFO } from '../data/salonData.ts';

export const TrustBar: React.FC = () => {
  return (
    <div className="relative z-40 bg-[#121212] border-y border-white/10 py-6 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        {/* Metric 1: Google Rating */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold text-lg tabular-nums">4.9 / 5.0</span>
              <span className="text-xs text-amber-400 font-medium">★★★★★</span>
            </div>
            <p className="text-xs text-white/60">38+ Verified Google Reviews</p>
          </div>
        </div>

        {/* Metric 2: Identity & Inclusion */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Women-Owned</p>
            <p className="text-xs text-white/60">LGBTQ+ Friendly & Welcoming</p>
          </div>
        </div>

        {/* Metric 3: Master Stylists */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#e8702a]/10 border border-[#e8702a]/30 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-[#e8702a]" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Shilpa & Santosh</p>
            <p className="text-xs text-white/60">Nanoplastia & Bridal Specialists</p>
          </div>
        </div>

        {/* Metric 4: Prime Location */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <MapPin className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Agarkar Nagar, Pune</p>
            <p className="text-xs text-white/60">Near Bank of Baroda, Station Rd</p>
          </div>
        </div>
      </div>
    </div>
  );
};
