import React, { useState } from 'react';
import { Sparkles, Scissors, CheckCircle, ShieldCheck } from 'lucide-react';

export const TransformationSpotlight: React.FC<{ onBookNow: () => void }> = ({ onBookNow }) => {
  const [activeTab, setActiveTab] = useState<'nanoplastia' | 'bridal' | 'spa'>('nanoplastia');
  const [sliderPosition, setSliderPosition] = useState<number>(55);

  const transformations = {
    nanoplastia: {
      title: 'Nanoplastia Gloss Reconstruction',
      stylists: 'Shilpa & Santosh',
      description: 'Formaldehyde-free organic straightening that realigns hydrogen bonds within the cortex. Delivers unyielding mirror gloss without stripping natural bounce.',
      beforeText: 'Severe frizz, split ends, and humidity swelling',
      afterText: 'Glass-smooth, fluid movement, 100% frizz control for 6 months',
      beforeImg: '/src/assets/images/salon_interior_lounge_1792420865074.jpg',
      afterImg: '/src/assets/images/salon_hair_transformation_hero_1792420865122.jpg',
      duration: '180 Minutes',
      guarantee: 'Zero Formaldehyde · Organic Bio-peptides',
    },
    bridal: {
      title: 'Christian Wedding & Bridal HD Glow',
      stylists: 'Shilpa Di',
      description: 'Handcrafted floral hair styling, structured bridal veil drape, and long-wear HD foundation that stays flawless in Pune weather throughout the reception.',
      beforeText: 'Pre-styling baseline',
      afterText: 'Angelic dewy complexion, custom floral crown updo',
      beforeImg: '/src/assets/images/salon_hair_transformation_hero_1792420865122.jpg',
      afterImg: '/src/assets/images/salon_bridal_makeover_1792420864317.jpg',
      duration: '180 Minutes',
      guarantee: 'Sweat-resistant · Camera Ready',
    },
    spa: {
      title: 'Deep Nourishing Hair Spa with Shilpa Di',
      stylists: 'Shilpa Di',
      description: 'Intense micro-mist steam bath paired with botanical essential oil acupressure scalp massage. Restores lipid balance and relieves deep mental stress.',
      beforeText: 'Dry, brittle, scalp tension',
      afterText: 'Weightless softness, nourished roots, and calm mind',
      beforeImg: '/src/assets/images/salon_interior_lounge_1792420865074.jpg',
      afterImg: '/src/assets/images/salon_hair_transformation_hero_1792420865122.jpg',
      duration: '60 Minutes',
      guarantee: 'Aromatherapy Steam · Stress Relief',
    },
  };

  const current = transformations[activeTab];

  return (
    <section id="nanoplastia" className="relative py-24 px-4 sm:px-8 bg-[#0d0d0d] border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#e8702a] uppercase tracking-wider mb-2">
              <Scissors className="w-4 h-4" />
              <span>Real Client Artistry</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair italic text-white">
              The Art of Transformation
            </h2>
            <p className="text-white/60 text-sm sm:text-base max-w-xl mt-3">
              Witness the tangible difference of our specialized chemical-free treatments and delicate bridal artistry.
            </p>
          </div>

          {/* Treatment Switcher */}
          <div className="flex flex-wrap gap-2 p-1.5 bg-white/5 border border-white/10 rounded-full">
            <button
              onClick={() => setActiveTab('nanoplastia')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'nanoplastia'
                  ? 'bg-[#e8702a] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Nanoplastia Treatment
            </button>
            <button
              onClick={() => setActiveTab('bridal')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'bridal'
                  ? 'bg-[#e8702a] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Bridal Artistry
            </button>
            <button
              onClick={() => setActiveTab('spa')}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'spa'
                  ? 'bg-[#e8702a] text-white shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Luxury Hair Spa
            </button>
          </div>
        </div>

        {/* Interactive Split Slider Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8">
          {/* Interactive Split View (7 cols) */}
          <div className="lg:col-span-7 relative w-full h-[360px] sm:h-[460px] rounded-2xl overflow-hidden select-none border border-white/10 shadow-2xl">
            {/* Background (After image) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${current.afterImg})` }}
            >
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#e8702a] border border-white/10">
                After: Radiance & Smoothness
              </div>
            </div>

            {/* Clipped Overlay (Before image) */}
            <div
              className="absolute inset-0 bg-cover bg-center border-r-2 border-[#e8702a]"
              style={{
                backgroundImage: `url(${current.beforeImg})`,
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
                filter: 'grayscale(0.3) contrast(0.95)',
              }}
            >
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-white/80 border border-white/10">
                Salon Consultation Baseline
              </div>
            </div>

            {/* Slider Handle Line */}
            <div
              className="absolute top-0 bottom-0 pointer-events-none flex items-center justify-center -ml-[1px]"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#e8702a] text-white flex items-center justify-center shadow-lg border-2 border-white pointer-events-auto cursor-ew-resize">
                <span className="text-[10px] font-bold">⇄</span>
              </div>
            </div>

            {/* Invisible Range Input for Dragging */}
            <input
              type="range"
              min="5"
              max="95"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              aria-label="Drag before and after slider"
            />
          </div>

          {/* Details Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="inline-block text-xs font-semibold text-[#e8702a] mb-2 uppercase tracking-wide">
                Specialist: {current.stylists}
              </div>
              <h3 className="text-2xl sm:text-3xl font-playfair italic text-white mb-3">
                {current.title}
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10 mb-6">
                <div className="flex items-start gap-2.5 text-xs text-white/80">
                  <CheckCircle className="w-4 h-4 text-[#e8702a] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Outcome: </strong>
                    <span>{current.afterText}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-white/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Standard: </strong>
                    <span>{current.guarantee}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <button
                onClick={onBookNow}
                className="w-full sm:w-auto bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-all hover:scale-[1.02] cursor-pointer shadow-lg shadow-[#e8702a]/20"
              >
                Book This Transformation
              </button>
              <span className="text-xs text-white/50">
                Avg duration: <strong className="text-white">{current.duration}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
