import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constant';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: ['Users', 'Rooms', 'Bookings', 'Billings'],
    endpoints: () => ({}),
});

export default apiSlice;
