import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { TrustBar } from './components/TrustBar.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { TransformationSpotlight } from './components/TransformationSpotlight.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { SpecialistsSection } from './components/SpecialistsSection.tsx';
import { LocationFooter } from './components/LocationFooter.tsx';
import { BookingModal } from './components/BookingModal.tsx';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>('nanoplastia');
  const [selectedStylist, setSelectedStylist] = useState<string>('Any Specialist');
  const [activeNav, setActiveNav] = useState<string>('hero');

  const handleOpenBooking = (serviceId?: string, stylistName?: string) => {
    if (serviceId) setSelectedServiceId(serviceId);
    if (stylistName) setSelectedStylist(stylistName);
    setIsBookingOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveNav(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#070707] text-white tracking-[-0.02em] selection:bg-[#e8702a] selection:text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* 1. Fixed Navigation over hero */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeNav}
        onNavigate={handleNavigate}
      />

      {/* 2. Signature Full-Screen Dark-Themed Hero with Cursor-Following Spotlight Reveal */}
      <HeroSection
        onOpenBooking={() => handleOpenBooking()}
        onExploreServices={() => handleNavigate('services')}
      />

      {/* 3. Verified Salon Trust Bar */}
      <TrustBar />

      {/* 4. Interactive Transformation Spotlight (Nanoplastia & Bridal Before/After) */}
      <TransformationSpotlight
        onBookNow={() => handleOpenBooking('nanoplastia')}
      />

      {/* 5. Complete Services & Treatment Menu */}
      <ServicesSection
        onSelectService={(serviceId) => handleOpenBooking(serviceId)}
      />

      {/* 6. Meet The Specialists (Shilpa Di & Santosh) */}
      <SpecialistsSection
        onBookWithStylist={(stylistName) => handleOpenBooking(undefined, stylistName)}
      />

      {/* 7. Verified Google Reviews (Tanisha Jha, Janhave Hindurao, Swati Alhat) */}
      <ReviewsSection />

      {/* 8. Location & Schedule Hub */}
      <LocationFooter />

      {/* 9. Interactive Booking Modal (WhatsApp & Direct Call) */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        defaultServiceId={selectedServiceId}
        defaultStylist={selectedStylist}
      />
    </div>
  );
}
