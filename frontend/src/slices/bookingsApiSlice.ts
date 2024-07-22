import {apiSlice} from "./apiSlice";

export const bookingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookings: builder.query<any,void>({
            query: () => ({
                url: "/bookings"
            }),
            keepUnusedDataFor:5,
            providesTags:["Bookings"]
        }),
        getBookingDetails: builder.query<any,string>({
            query: (bookingId) => ({
                url: `/bookings/${bookingId}`
            }),
            keepUnusedDataFor:5,
        })
    }),
    overrideExisting:false,
})

export const { useGetBookingsQuery, useGetBookingDetailsQuery } = bookingsApiSlice;