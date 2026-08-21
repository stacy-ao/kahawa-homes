import { clsx, type ClassValue } from 'clsx';
import type { Property } from '@/types/property';

export const WA_NUMBER = '254795526788';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const dateKey = (date: Date): string => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const formatPrice = (price: number): string => {
  return `KSh ${price.toLocaleString()}`;
};

export const calculateNights = (checkIn: string, checkOut: string): number => {
  if (!checkIn || !checkOut) return 0;
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  return Math.max(0, Math.round((end - start) / 86400000));
};

export function normalizeProperty(property: Partial<Property> & Record<string, any>, index: number = 0): Property {
  const numericPrice = typeof property.pricePerNight === 'number'
    ? property.pricePerNight
    : Number(String(property.pricePerNight ?? property.price ?? '').replace(/[^0-9.]/g, '')) || 0;

  return {
    id: property.id ?? index + 1,
    name: property.name ?? 'Luxury Stay',
    type: property.type ?? 'Home',
    location: property.location ?? 'Kenya',
    guests: property.guests ?? 2,
    bedrooms: property.bedrooms ?? 1,
    beds: property.beds ?? 1,
    baths: property.baths ?? 1,
    pricePerNight: numericPrice,
    rating: property.rating ?? 4.9,
    reviews: property.reviews ?? 10,
    badge: property.badge ?? 'Guest Favourite',
    host: property.host ?? { name: 'Nelly', months: 18 },
    images: Array.isArray(property.images) && property.images.length > 0
      ? property.images
      : ['/images/imageshouse1_main.jpg.jpeg'],
    bookedDates: Array.isArray(property.bookedDates) ? property.bookedDates : [],
    amenities: Array.isArray(property.amenities) && property.amenities.length > 0
      ? property.amenities
      : ['High-Speed WiFi', 'Air Conditioning', 'Full Kitchen', 'Secure Parking', '24/7 Security'],
    rules: Array.isArray(property.rules) && property.rules.length > 0
      ? property.rules
      : ['No smoking indoors', 'Quiet hours 22:00 – 08:00', 'Check-in: 13:00', 'Checkout: 11:00'],
    description: property.description ?? 'Welcome to Kahawa Homes — a premium curated stay providing comfort, luxury, and tranquility.',
    lat: property.lat ?? -4.0435,
    lng: property.lng ?? 39.6682,
  };
}

export const fallbackProperties: Property[] = [
  {
    id: 1,
    name: 'Beachfront Luxury Villa',
    type: 'Entire villa',
    location: 'Mombasa',
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    pricePerNight: 2000,
    rating: 4.92,
    reviews: 42,
    badge: 'Guest Favourite',
    host: { name: 'Nelly', months: 18 },
    images: [
      '/images/imageshouse1_main.jpg.jpeg',
      '/images/WhatsApp Image 2026-08-20 at 15.18.25.jpeg',
      '/images/WhatsApp Image 2026-08-20 at 15.18.26.jpeg',
      '/images/WhatsApp Image 2026-08-20 at 15.18.53.jpeg',
    ],
    description: 'Spacious beachfront house with direct access to the sea. Step into a world of curated comfort with sweeping coastal views, modern Swahili architectural accents, and full amenities for family or group vacations.',
    amenities: ['Beachfront Access', 'High-Speed WiFi', 'Air Conditioning', 'Full Kitchen', 'Secure Parking', '24/7 Security', 'USB Charging Ports'],
    rules: ['No smoking indoors', 'Quiet hours 22:00 – 08:00', 'Check-in: 13:00', 'Checkout: 11:00'],
    bookedDates: ['2026-08-25', '2026-08-26'],
  },
  {
    id: 2,
    name: 'Executive Garden House',
    type: 'Entire house',
    location: 'Nairobi - Kahawa',
    guests: 4,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    pricePerNight: 2500,
    rating: 4.88,
    reviews: 28,
    badge: 'Guest Favourite',
    host: { name: 'Nelly', months: 18 },
    images: [
      '/images/imageshouse2_main.jpg.jpeg',
      '/images/imageshouse2.jpg.jpeg',
      '/images/WhatsApp Image 2026-08-20 at 15.18.25.jpeg',
    ],
    description: 'Quiet retreat with beautiful outdoor greenery. Enjoy a peaceful stay close to key amenities with lush private gardens, high-speed WiFi, dedicated workspace, and executive comfort.',
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Full Kitchen', 'Secure Parking', 'Daily Housekeeping', '24/7 Security'],
    rules: ['No parties or events', 'Check-in: 12:00', 'Checkout: 11:00'],
    bookedDates: ['2026-08-30'],
  },
  {
    id: 3,
    name: 'Green Haven Residence',
    type: 'Entire apartment',
    location: 'Nairobi - Kahawa',
    guests: 3,
    bedrooms: 2,
    beds: 2,
    baths: 1,
    pricePerNight: 2500,
    rating: 4.85,
    reviews: 19,
    badge: 'Featured home',
    host: { name: 'Nelly', months: 18 },
    images: [
      '/images/imageshouse3_main.jpg.jpeg',
      '/images/imageshouse3_bedroom.jpg.jpeg',
      '/images/imageshouse3.jpg.jpeg',
    ],
    description: 'Quiet retreat with beautiful outdoor greenery and bright spaces. Designed for restful weekends or remote work with fast internet, comfortable beds, and full kitchen amenities.',
    amenities: ['High-Speed WiFi', 'Air Conditioning', 'Full Kitchen', 'Secure Parking', 'DSTV & Netflix'],
    rules: ['No smoking', 'Check-in: 14:00', 'Checkout: 11:00'],
    bookedDates: [],
  },
  {
    id: 4,
    name: 'Sunrise City Apartment',
    type: 'Entire apartment',
    location: 'Nairobi',
    guests: 2,
    bedrooms: 1,
    beds: 1,
    baths: 1,
    pricePerNight: 3500,
    rating: 4.95,
    reviews: 31,
    badge: 'Guest Favourite',
    host: { name: 'Nelly', months: 18 },
    images: [
      'https://picsum.photos/800/600?random=41',
      'https://picsum.photos/800/600?random=42',
      'https://picsum.photos/800/600?random=43',
    ],
    description: 'A bright apartment with calm city views and room to unwind. Complete with floor-to-ceiling windows, modern fittings, and seamless access to central Nairobi.',
    amenities: ['High-Speed WiFi', 'Full Kitchen', 'Secure Parking', 'DSTV & Netflix', 'USB Charging Ports'],
    rules: ['No smoking', 'Noise curfew 23:00', 'Check-in: 14:00', 'Checkout: 10:00'],
    bookedDates: [],
  },
  {
    id: 5,
    name: 'Coastal Breeze Cottage',
    type: 'Entire cottage',
    location: 'Diani, Mombasa',
    guests: 6,
    bedrooms: 3,
    beds: 4,
    baths: 3,
    pricePerNight: 4200,
    rating: 5.0,
    reviews: 24,
    badge: 'Guest Favourite',
    host: { name: 'Nelly', months: 18 },
    images: [
      'https://picsum.photos/800/600?random=44',
      'https://picsum.photos/800/600?random=45',
      'https://picsum.photos/800/600?random=46',
    ],
    description: 'A relaxed coastal cottage made for slow mornings and easy evenings. Wake up to sea breezes and tropical bird calls just steps away from pristine beaches.',
    amenities: ['Swimming Pool Access', 'Air Conditioning', '24/7 Security', 'Full Kitchen', 'Private Garden'],
    rules: ['No shoes indoors', 'Check-in: 14:00', 'Checkout: 10:00'],
    bookedDates: [],
  },
  {
    id: 6,
    name: 'The Olive Retreat',
    type: 'Entire villa',
    location: 'Naivasha',
    guests: 5,
    bedrooms: 2,
    beds: 3,
    baths: 2,
    pricePerNight: 5000,
    rating: 4.9,
    reviews: 18,
    badge: 'Featured home',
    host: { name: 'Nelly', months: 18 },
    images: [
      'https://picsum.photos/800/600?random=47',
      'https://picsum.photos/800/600?random=48',
      'https://picsum.photos/800/600?random=49',
    ],
    description: 'A peaceful hideaway surrounded by open skies and natural beauty. Perfect for serene weekend escapes with lake views, outdoor BBQ facilities, and cozy fire pit.',
    amenities: ['Full Kitchen', 'Secure Parking', 'USB Charging Ports', 'Outdoor BBQ Area', 'High-Speed WiFi'],
    rules: ['Quiet hours 22:00', 'Check-in: 13:00', 'Checkout: 11:00'],
    bookedDates: [],
  },
  {
    id: 7,
    name: 'Harbour View Residence',
    type: 'Entire villa',
    location: 'Nyali, Mombasa',
    guests: 8,
    bedrooms: 4,
    beds: 5,
    baths: 4,
    pricePerNight: 6500,
    rating: 4.98,
    reviews: 39,
    badge: 'Guest Favourite',
    host: { name: 'Nelly', months: 18 },
    images: [
      'https://picsum.photos/800/600?random=50',
      'https://picsum.photos/800/600?random=51',
      'https://picsum.photos/800/600?random=52',
    ],
    description: 'A comfortable residence with generous spaces for a memorable stay. Featuring a private swimming pool, private terrace, chef on request, and luxury coastal ambiance.',
    amenities: ['High-Speed WiFi', 'Private Pool', 'Secure Parking', 'Air Conditioning', 'Daily Room Service', '24/7 Security'],
    rules: ['No smoking indoors', 'Check-in: 14:00', 'Checkout: 11:00'],
    bookedDates: [],
  },
];
