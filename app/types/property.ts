export interface Host {
  name: string;
  months?: number;
  avatar?: string;
  phone?: string;
  email?: string;
}

export interface Property {
  id: number | string;
  name: string;
  type: string;
  location: string;
  guests: number;
  bedrooms: number;
  beds: number;
  baths: number;
  pricePerNight: number;
  rating: number;
  reviews: number;
  badge: string;
  host: Host;
  images: string[];
  bookedDates: string[];
  amenities: string[];
  rules: string[];
  description: string;
  lat?: number;
  lng?: number;
}

export interface FilterOptions {
  location: string;
  type: string;
  priceMax: number;
  ratingMin: number;
  reviewsMin: number;
  search: string;
  favoriteOnly?: boolean;
}
