import React, { useState } from 'react';
import { REVIEWS, SALON_INFO } from '../data/salonData.ts';
import { Star, CheckCircle2, MessageCircle, ExternalLink } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [filterTopic, setFilterTopic] = useState<string>('all');

  const topics = [
    { id: 'all', label: 'All Reviews (38)' },
    { id: 'polite', label: 'Polite Staff (4)' },
    { id: 'quality', label: 'Quality Work (3)' },
    { id: 'hygiene', label: 'Hygiene (2)' },
    { id: 'affordability', label: 'Affordability (2)' },
  ];

  const filtered =
    filterTopic === 'all'
      ? REVIEWS
      : REVIEWS.filter((r) => {
          if (filterTopic === 'polite') return r.text.toLowerCase().includes('polite') || r.text.toLowerCase().includes('friendly');
          if (filterTopic === 'quality') return r.text.toLowerCase().includes('amazing') || r.text.toLowerCase().includes('professional');
          if (filterTopic === 'hygiene') return r.text.toLowerCase().includes('clean') || r.text.toLowerCase().includes('gentle');
          if (filterTopic === 'affordability') return r.text.toLowerCase().includes('reasonable') || r.text.toLowerCase().includes('rates');
          return true;
        });

  return (
    <section id="reviews" className="relative py-24 px-4 sm:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e8702a] uppercase tracking-wider mb-2">
              <Star className="w-4 h-4 fill-[#e8702a]" />
              <span>Verified Google Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair italic text-white">
              Loved by Our Clients
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mt-3">
              Read real feedback from clients in Agarkar Nagar and Pune who trust Shilpa & Santosh for their most important moments.
            </p>
          </div>

          {/* Rating Summary Box */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
            <div className="text-3xl sm:text-4xl font-bold text-white font-playfair">
              4.9
            </div>
            <div>
              <div className="flex text-amber-400 text-sm">
                {'★★★★★'}
              </div>
              <p className="text-xs text-white/70">
                38 Google Reviews · Pune
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => setFilterTopic(t.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                filterTopic === t.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-white/5 text-white/70 hover:text-white border border-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="bg-[#141414] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header with Avatar & Name */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full ${review.avatarColor} text-white font-bold text-xs flex items-center justify-center shrink-0`}
                    >
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-white">
                          {review.author}
                        </span>
                        {review.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                        )}
                      </div>
                      <span className="text-[11px] text-white/50">
                        {review.role || 'Google Review'} · {review.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex text-amber-400 text-xs">
                    {'★'.repeat(review.rating)}
                  </div>
                </div>

                {/* Treatment Tag */}
                <div className="mb-3 text-[11px] font-medium text-[#e8702a]">
                  Service: {review.treatment}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              {/* Highlighted Stylist mention */}
              {review.highlightedStylist && (
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-white/50">
                  Stylist Praise: <span className="text-white/80 font-medium">{review.highlightedStylist}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Direct Action Link */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-white/80">
              Have you visited The Hair Lounge? Share your experience with Shilpa & Santosh on Google Maps!
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=The+Hair+lounge+Unisex+Salon+Agarkar+Nagar+Pune"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-semibold text-[#e8702a] hover:text-[#f38d52] transition-colors whitespace-nowrap"
          >
            <span>Write a Google Review</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
