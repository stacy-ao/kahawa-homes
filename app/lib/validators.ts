import { z } from 'zod';

export const bookingFormSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  checkIn: z.string().min(1, 'Please select a check-in date'),
  checkOut: z.string().min(1, 'Please select a check-out date'),
  guests: z.number().int().min(1, 'At least 1 guest is required'),
  needsTransport: z.boolean().optional(),
  interestedTours: z.boolean().optional(),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  phone: z.string().optional(),
});

export const reviewFormSchema = z.object({
  rating: z.number().min(1, 'Please choose a star rating').max(5),
  attributes: z.array(z.string()).default([]),
  comment: z.string().optional(),
  userName: z.string().optional(),
});

export const propertyFormSchema = z.object({
  name: z.string().min(3, 'Property title must be at least 3 characters'),
  type: z.string().min(1, 'Please select a property type'),
  location: z.string().min(2, 'Please provide a location'),
  pricePerNight: z.number().min(500, 'Price must be at least KSh 500'),
  guests: z.number().min(1),
  bedrooms: z.number().min(0),
  beds: z.number().min(1),
  baths: z.number().min(1),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  amenities: z.array(z.string()).default([]),
  rules: z.array(z.string()).default([]),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
export type ReviewFormData = z.infer<typeof reviewFormSchema>;
export type PropertyFormData = z.infer<typeof propertyFormSchema>;
