import React, { useState } from 'react';
import { SERVICES } from '../data/salonData.ts';
import { Clock, Check, Sparkles, ArrowRight, Star } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'treatments', label: 'Nanoplastia & Repair' },
    { id: 'spa', label: 'Hair Spa' },
    { id: 'bridal', label: 'Bridal & Makeup' },
    { id: 'haircuts', label: 'Haircuts & Styling' },
    { id: 'skin', label: 'Facial & Skin' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="relative py-24 px-4 sm:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e8702a] uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Artisan Salon Care</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair italic text-white">
              Signature Treatments & Services
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mt-3">
              Every appointment begins with an in-depth texture diagnosis. Experience the restorative power of Nanoplastia, relaxing hair spas, and bespoke bridal hair artistry.
            </p>
          </div>

          {/* Category Tabs (Functional segmented controls) */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-white/5 border border-white/10 rounded-2xl md:rounded-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-full transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#e8702a] text-white shadow-md shadow-[#e8702a]/20'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-[#141414] hover:bg-[#1a1a1a] border border-white/10 hover:border-[#e8702a]/50 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              {service.popular && (
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#e8702a]/20 border border-[#e8702a]/40 text-[#e8702a] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-[#e8702a]" />
                  <span>Client Favorite</span>
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between gap-2 mb-2 pr-20">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#e8702a] transition-colors">
                    {service.name}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-white/40" />
                    <span>{service.duration}</span>
                  </span>
                  <span>·</span>
                  <span className="text-[#e8702a] font-semibold text-sm tabular-nums">
                    {service.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Benefits Bullet List */}
                <div className="space-y-1.5 mb-6">
                  {service.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/60">
                      <Check className="w-3.5 h-3.5 text-[#e8702a] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer with specialist & action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/50">
                  Specialist: <strong className="text-white/80">{service.specialist}</strong>
                </span>
                <button
                  onClick={() => onSelectService(service.id)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-[#e8702a] transition-colors cursor-pointer"
                >
                  <span>Book Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
