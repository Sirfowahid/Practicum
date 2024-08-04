import { apiSlice } from "./apiSlice";

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query<any, void>({
      query: () => ({
        url: "/bookings",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Bookings"],
    }),
    getBookingDetails: builder.query<any, string>({
      query: (bookingId) => ({
        url: `/bookings/${bookingId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings/addbooking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
    updateBooking: builder.mutation({
      query: (data) => ({
        url: `/bookings/updatebooking/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Bookings"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBookingsQuery,
  useGetBookingDetailsQuery,
  useAddBookingMutation,
  useUpdateBookingMutation,
} = bookingsApiSlice;
