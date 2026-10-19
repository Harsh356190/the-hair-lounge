import React from 'react';
import { STYLISTS } from '../data/salonData.ts';
import { Award, Check, Sparkles, Calendar, HeartHandshake } from 'lucide-react';

interface SpecialistsSectionProps {
  onBookWithStylist: (stylistName: string) => void;
}

export const SpecialistsSection: React.FC<SpecialistsSectionProps> = ({ onBookWithStylist }) => {
  return (
    <section id="bridal" className="relative py-24 px-4 sm:px-8 bg-[#0d0d0d] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#e8702a] uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4" />
            <span>Master Craftsmen</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair italic text-white mb-4">
            Meet Your Stylists
          </h2>
          <p className="text-white/60 text-sm sm:text-base">
            Behind every shining Nanoplastia transformation and breathtaking bridal look are dedicated specialists who prioritize your hair's long-term health and personal style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {STYLISTS.map((stylist, idx) => (
            <div
              key={stylist.name}
              className="bg-[#141414] border border-white/10 hover:border-[#e8702a]/40 rounded-3xl p-8 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-playfair italic text-white">
                      {stylist.name}
                    </h3>
                    <p className="text-xs text-[#e8702a] font-medium mt-0.5">
                      {stylist.title}
                    </p>
                  </div>
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-white/70 font-mono">
                    {stylist.experience}
                  </div>
                </div>

                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {stylist.bio}
                </p>

                {/* Specialties list */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-white/90 uppercase tracking-wider mb-2.5">
                    Signature Expertise
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stylist.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-xs text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Direct quote from reviews */}
                <div className="p-4 bg-white/[0.03] border-l-2 border-[#e8702a] rounded-r-xl mb-6">
                  <p className="text-xs text-white/80 italic leading-relaxed">
                    "{stylist.reviewQuote}"
                  </p>
                  <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">
                    — Verified Client Review
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/50">Consultation available Tue–Sun</span>
                <button
                  onClick={() => onBookWithStylist(stylist.name)}
                  className="bg-white/10 hover:bg-[#e8702a] text-white text-xs font-semibold px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request {stylist.name}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
