// bookingsData.ts

import { Booking } from "../pages/admin/AdminBookings";// Adjust the import path as per your project structure

export const bookingsData: Booking[] = [
  {
    id: 1,
    guestName: 'John Doe',
    roomNumber: '101',
    checkIn: '2024-06-25',
    checkOut: '2024-06-27',
    status: 'Confirmed',
  },
  {
    id: 2,
    guestName: 'Jane Smith',
    roomNumber: '102',
    checkIn: '2024-06-26',
    checkOut: '2024-06-28',
    status: 'Pending',
  },
  {
    id: 3,
    guestName: 'Michael Johnson',
    roomNumber: '103',
    checkIn: '2024-06-27',
    checkOut: '2024-06-29',
    status: 'Confirmed',
  },
  {
    id: 4,
    guestName: 'Emily Davis',
    roomNumber: '104',
    checkIn: '2024-06-28',
    checkOut: '2024-06-30',
    status: 'Cancelled',
  },
];
