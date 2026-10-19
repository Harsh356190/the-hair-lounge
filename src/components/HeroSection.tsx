import React, { useEffect, useRef, useState } from 'react';
import { RevealLayer, SPOTLIGHT_R } from './RevealLayer.tsx';
import { Sparkles, Scissors, Eye, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData.ts';

// Exact Asset URLs from prompt
const BG_IMAGE_1_LITHOS = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85';
const BG_IMAGE_2_LITHOS = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85';

// High-fidelity Salon transformation images generated for The Hair Lounge
const SALON_INTERIOR = '/src/assets/images/salon_interior_lounge_1792420865074.jpg';
const SALON_HAIR_TRANSFORM = '/src/assets/images/salon_hair_transformation_hero_1792420865122.jpg';
const SALON_BRIDAL = '/src/assets/images/salon_bridal_makeover_1792420864317.jpg';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExploreServices }) => {
  // Cursor smoothing refs and state
  const mouse = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const smooth = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: -999, y: -999 });

  // Theme reveal modes: 'lithos' (exact prompt images) vs 'salon' (hair transformation) vs 'bridal'
  const [visualMode, setVisualMode] = useState<'salon' | 'lithos' | 'bridal'>('salon');

  // Active images based on mode
  const currentBaseImage =
    visualMode === 'lithos'
      ? BG_IMAGE_1_LITHOS
      : visualMode === 'bridal'
      ? SALON_INTERIOR
      : SALON_INTERIOR;

  const currentRevealImage =
    visualMode === 'lithos'
      ? BG_IMAGE_2_LITHOS
      : visualMode === 'bridal'
      ? SALON_BRIDAL
      : SALON_HAIR_TRANSFORM;

  // Animation loop with lerping: smooth.x += (mouse.x - smooth.x) * 0.1
  useEffect(() => {
    // Initial center position preview on load before mouse moves
    const initialCenterX = window.innerWidth / 2;
    const initialCenterY = window.innerHeight * 0.45;
    mouse.current = { x: initialCenterX, y: initialCenterY };
    smooth.current = { x: initialCenterX, y: initialCenterY };
    setCursorPos({ x: initialCenterX, y: initialCenterY });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current.x = e.touches[0].clientX;
        mouse.current.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });

    const loop = () => {
      // Lerp smoothing formula
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      setCursorPos({
        x: Math.round(smooth.current.x * 10) / 10,
        y: Math.round(smooth.current.y * 10) / 10,
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden h-screen bg-black select-none"
      style={{ height: '100dvh' }}
    >
      {/* 1. Base Image Layer (z-10) with hero-zoom Ken Burns animation */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom transition-[background-image] duration-700 ease-in-out"
        style={{
          backgroundImage: `url(${currentBaseImage})`,
          filter: visualMode === 'lithos' ? 'none' : 'brightness(0.72) contrast(1.08)',
        }}
      />

      {/* Subtle atmospheric vignette overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-black/60" />

      {/* 2. Reveal Layer (z-30) using soft circular spotlight mask */}
      <RevealLayer
        image={currentRevealImage}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      {/* Interactive Spotlight Mode Switcher Pill */}
      <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1 bg-black/50 backdrop-blur-md rounded-full border border-white/20 shadow-xl">
        <button
          onClick={() => setVisualMode('salon')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            visualMode === 'salon'
              ? 'bg-[#e8702a] text-white shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Scissors className="w-3 h-3" />
          <span>Hair Transformation</span>
        </button>
        <button
          onClick={() => setVisualMode('bridal')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            visualMode === 'bridal'
              ? 'bg-[#e8702a] text-white shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>Bridal Glam</span>
        </button>
        <button
          onClick={() => setVisualMode('lithos')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            visualMode === 'lithos'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-white/70 hover:text-white'
          }`}
        >
          <Eye className="w-3 h-3" />
          <span>Lithos Earth Mode</span>
        </button>
      </div>

      {/* 3. Heading Layer (z-50) */}
      <div className="absolute top-[14%] sm:top-[16%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
        <h1 className="text-white leading-[0.95]">
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{
              letterSpacing: '-0.05em',
              animationDelay: '0.25s',
            }}
          >
            {visualMode === 'lithos' ? 'Layers hold' : 'Layers hold'}
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal tracking-tight"
            style={{
              letterSpacing: '-0.08em',
              animationDelay: '0.42s',
            }}
          >
            {visualMode === 'lithos' ? 'tales of time' : 'tales of time'}
          </span>
        </h1>

        {/* Quiet Salon Subtitle Lockup */}
        <div
          className="mt-3 flex items-center gap-2 text-white/90 text-xs sm:text-sm font-medium hero-anim hero-fade px-3 py-1 rounded-full bg-black/30 backdrop-blur-xs border border-white/10"
          style={{ animationDelay: '0.58s' }}
        >
          <span className="text-[#e8702a]">★ 4.9 Rating</span>
          <span>·</span>
          <span>The Hair Lounge Unisex Salon</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Agarkar Nagar, Pune</span>
        </div>
      </div>

      {/* 4. Bottom-Left Paragraph (z-50) */}
      <div
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[280px] z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.7s' }}
      >
        <p className="text-sm text-white/80 leading-relaxed font-normal">
          {visualMode === 'lithos'
            ? 'Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.'
            : 'Every layer of craft records a chapter of personal radiance—from restorative Nanoplastia and gentle hair spas to bespoke wedding styling in Pune.'}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-white/60">
          <span>By Shilpa & Santosh</span>
          <span>·</span>
          <span className="text-amber-400">38+ Reviews</span>
        </div>
      </div>

      {/* 5. Bottom-Right Block (z-50) */}
      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
          {visualMode === 'lithos'
            ? 'Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.'
            : 'Move your cursor across the screen to reveal the luminous transformation beneath. Step into personalized hair artistry at Station Road, Pune.'}
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30 cursor-pointer flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <span>{visualMode === 'lithos' ? 'Start Digging' : 'Book Appointment'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Cursor Hint indicator on first glance */}
      <div className="hidden lg:flex absolute bottom-5 left-1/2 -translate-x-1/2 z-40 items-center gap-2 text-white/40 text-[11px] uppercase tracking-widest pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#e8702a] animate-ping" />
        <span>Hover cursor or drag to reveal spotlight</span>
      </div>
    </section>
  );
};
