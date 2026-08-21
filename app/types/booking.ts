export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id?: string;
  property: string;
  propertyId?: number | string;
  location: string;
  checkIn: string;
  checkOut: string;
  name: string;
  guests: number;
  preferences?: string[];
  totalPrice?: number;
  status?: BookingStatus;
  paymentRef?: string;
  paymentMethod?: 'whatsapp' | 'mpesa' | 'stripe' | 'direct';
  createdAt: number;
}

export interface Review {
  id?: string;
  propertyId?: number | string;
  rating: number;
  attributes: string[];
  comment: string;
  userName?: string;
  createdAt: number;
}
