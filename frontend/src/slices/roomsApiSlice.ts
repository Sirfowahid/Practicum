import { apiSlice } from "./apiSlice";

export const roomsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRooms: builder.query<any, void>({
      query: () => ({
        url: "/rooms",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Rooms"],
    }),
    getRoomDetails: builder.query<any, string>({
      query: (roomId) => ({
        url: `/rooms/${roomId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addRoom:builder.mutation({
      query:(data) => ({
        url:"/rooms/addroom",
        method:'POST',
        body:data
      })
    }),
    uploadRoomImage: builder.mutation({
      query: (data) => ({
        url: "/uploads",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRoomsQuery,
  useGetRoomDetailsQuery,
  useAddRoomMutation,
  useUploadRoomImageMutation,
} = roomsApiSlice;
