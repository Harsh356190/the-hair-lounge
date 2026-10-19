import React, { useState } from 'react';
import { SERVICES, SALON_INFO } from '../data/salonData.ts';
import { X, Calendar, Clock, User, Phone, CheckCircle, MessageSquare } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceId?: string;
  defaultStylist?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  defaultServiceId = 'nanoplastia',
  defaultStylist = 'Any Specialist',
}) => {
  const [serviceId, setServiceId] = useState(defaultServiceId);
  const [stylist, setStylist] = useState(defaultStylist);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const selectedService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
    '07:30 PM',
  ];

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Please provide your name and phone number so the salon can confirm your slot.');
      return;
    }

    const message = `Hello The Hair Lounge Unisex Salon! 🌟\n\nI would like to book an appointment:\n• Service: ${selectedService.name} (${selectedService.price})\n• Specialist: ${stylist}\n• Preferred Date: ${date}\n• Time: ${timeSlot}\n• Client Name: ${clientName}\n• Contact: ${clientPhone}\n${notes ? `• Notes: ${notes}\n` : ''}\nPlease confirm my appointment slot. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/91${SALON_INFO.phoneRaw}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#141414] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-playfair italic text-white">
              Appointment Request Sent!
            </h3>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm mx-auto leading-relaxed">
              We have forwarded your booking request for <strong>{selectedService.name}</strong> to Shilpa & Santosh via WhatsApp.
            </p>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-left text-xs space-y-1.5 text-white/80">
              <div><strong>Salon:</strong> The Hair Lounge Unisex Salon</div>
              <div><strong>Date & Time:</strong> {date} at {timeSlot}</div>
              <div><strong>Specialist:</strong> {stylist}</div>
              <div><strong>Address:</strong> Bank of Baroda branch, Agarkar Nagar, Pune</div>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="w-full py-3 bg-white/10 text-white rounded-full text-xs font-semibold hover:bg-white/20 transition-colors"
              >
                Call Salon Now: 086689 68858
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full py-3 bg-[#e8702a] text-white rounded-full text-xs font-semibold hover:bg-[#d2611f] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppBooking} className="space-y-5">
            <div>
              <span className="text-[11px] font-semibold text-[#e8702a] uppercase tracking-wider">
                Direct Salon Reservation
              </span>
              <h3 className="text-2xl font-playfair italic text-white mt-1">
                Book Your Transformation
              </h3>
              <p className="text-xs text-white/60 mt-1">
                The Hair Lounge Unisex Salon · Station Road, Agarkar Nagar, Pune
              </p>
            </div>

            {/* Service Selection */}
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5">
                Select Service
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2.5 text-white text-xs sm:text-sm focus:outline-none focus:border-[#e8702a]"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.price} · {s.duration})
                  </option>
                ))}
              </select>
            </div>

            {/* Stylist Selection */}
            <div className="grid grid-cols-3 gap-2">
              {['Any Specialist', 'Shilpa Di', 'Santosh'].map((name) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setStylist(name)}
                  className={`py-2 px-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-center ${
                    stylist === name
                      ? 'bg-[#e8702a] text-white shadow-sm'
                      : 'bg-[#1c1c1c] text-white/70 border border-white/10 hover:text-white'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Preferred Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#e8702a]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Preferred Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#e8702a]"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tanisha"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#e8702a]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-white/80 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#e8702a]"
                  required
                />
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <label className="block text-xs font-medium text-white/80 mb-1.5">
                Special Requests or Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Bridal consultation, sensitive scalp, daughter haircut"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#1c1c1c] border border-white/10 rounded-xl px-3.5 py-2 text-white text-xs sm:text-sm focus:outline-none focus:border-[#e8702a]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-black font-semibold text-xs sm:text-sm py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#25D366]/20"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>
              <a
                href={`tel:${SALON_INFO.phoneRaw}`}
                className="bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-4 h-4 text-[#e8702a]" />
                <span>Call 086689 68858</span>
              </a>
            </div>

            <p className="text-[11px] text-white/40 text-center">
              No prepayment required · Free cancellation · Tue–Sun 9:00 AM – 9:00 PM
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
