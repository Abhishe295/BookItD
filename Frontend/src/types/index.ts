// ─── TimeSlot ──────────────────────────────
export interface TimeSlot {
  _id: string;
  date: string;
  time: string;
  price: number;
  available: number;
}

// ─── Experience ────────────────────────────
export interface Experience {
  _id: string;
  title: string;
  shortDescription?: string;
  longDescription?: string;
  coverImage?: string;
  location?: string;
  timeSlots?: TimeSlot[];
  description?: string;      // used in search filter
  rating?: number;           // used in popular sort
  createdAt?: string;        // for badge
  category?: string;         // for badge
  featured?: boolean;        // for badge
  duration?: string;         // for info grid
  groupSize?: number;        // for info grid
  price?: number;            // for info grid
  availability?: boolean;    // for footer badge
}

// ─── Booking ───────────────────────────────
export interface Booking {
  _id: string;
  name: string;
  email: string;
  experience?: Experience;
  date: string;
  slot: string;
  promoCode?: string;
  totalPrice: number;
  status: string;
}
