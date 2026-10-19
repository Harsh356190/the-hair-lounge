export interface ServiceItem {
  id: string;
  name: string;
  category: 'treatments' | 'spa' | 'bridal' | 'haircuts' | 'skin';
  price: string;
  duration: string;
  description: string;
  popular?: boolean;
  specialist?: string;
  benefits: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role?: string;
  date: string;
  rating: number;
  treatment: string;
  text: string;
  verified: boolean;
  avatarColor: string;
  highlightedStylist?: string;
}

export interface StylistItem {
  name: string;
  title: string;
  experience: string;
  specialties: string[];
  bio: string;
  reviewQuote: string;
}

export interface BookingState {
  serviceId: string;
  stylist: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientPhone: string;
  notes: string;
}
