import React from 'react';
import type { RouteObject } from 'react-router-dom';

import HomeRoute from './routes/_index';
import SearchRoute from './routes/search';
import ListingDetailRoute from './routes/listings.$listingId';
import ListingBookRoute from './routes/listings.$listingId.book';
import CheckoutRoute from './routes/checkout.$bookingId';
import BookingConfirmedRoute from './routes/booking-confirmed.$bookingId';

// Auth Routes
import LoginRoute from './routes/auth/login';
import RegisterRoute from './routes/auth/register';
import ForgotPasswordRoute from './routes/auth/forgot-password';
import LogoutRoute from './routes/auth/logout';

// Dashboard Routes
import DashboardLayout from './routes/dashboard/_layout';
import DashboardBookingsRoute from './routes/dashboard/bookings';
import DashboardFavoritesRoute from './routes/dashboard/favorites';
import DashboardMessagesRoute from './routes/dashboard/messages';
import DashboardProfileRoute from './routes/dashboard/profile';

// Host Routes
import HostLayout from './routes/host/_layout';
import HostListingsRoute from './routes/host/listings';
import HostListingsNewRoute from './routes/host/listings.new';
import HostListingsEditRoute from './routes/host/listings.$id.edit';
import HostCalendarRoute from './routes/host/calendar';
import HostReservationsRoute from './routes/host/reservations';
import HostEarningsRoute from './routes/host/earnings';

const h = React.createElement;

export const routes: RouteObject[] = [
  {
    path: '/',
    element: h(HomeRoute),
  },
  {
    path: '/search',
    element: h(SearchRoute),
  },
  {
    path: '/listings/:listingId',
    element: h(ListingDetailRoute),
  },
  {
    path: '/listings/:listingId/book',
    element: h(ListingBookRoute),
  },
  {
    path: '/checkout/:bookingId',
    element: h(CheckoutRoute),
  },
  {
    path: '/booking-confirmed/:bookingId',
    element: h(BookingConfirmedRoute),
  },
  {
    path: '/auth/login',
    element: h(LoginRoute),
  },
  {
    path: '/auth/register',
    element: h(RegisterRoute),
  },
  {
    path: '/auth/forgot-password',
    element: h(ForgotPasswordRoute),
  },
  {
    path: '/auth/logout',
    element: h(LogoutRoute),
  },
  {
    path: '/dashboard',
    element: h(DashboardLayout),
    children: [
      { index: true, element: h(DashboardBookingsRoute) },
      { path: 'bookings', element: h(DashboardBookingsRoute) },
      { path: 'favorites', element: h(DashboardFavoritesRoute) },
      { path: 'messages', element: h(DashboardMessagesRoute) },
      { path: 'profile', element: h(DashboardProfileRoute) },
    ],
  },
  {
    path: '/host',
    element: h(HostLayout),
    children: [
      { index: true, element: h(HostListingsRoute) },
      { path: 'listings', element: h(HostListingsRoute) },
      { path: 'listings/new', element: h(HostListingsNewRoute) },
      { path: 'listings/:id/edit', element: h(HostListingsEditRoute) },
      { path: 'calendar', element: h(HostCalendarRoute) },
      { path: 'reservations', element: h(HostReservationsRoute) },
      { path: 'earnings', element: h(HostEarningsRoute) },
    ],
  },
  {
    path: '*',
    element: h(HomeRoute),
  },
];
