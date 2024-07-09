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
    }),
    overrideExisting: false,
});

export const { useGetRoomsQuery } = roomsApiSlice;
