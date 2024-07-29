import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login:builder.mutation({
      query:(data)=>({
        url:"/users/auth",
        method:'POST',
        body:data
      })
    }),
    getUsers: builder.query<any, void>({
      query: () => ({
        url: "/users",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Users"],
    }),
    getUserDetails: builder.query<any, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    uploadUserImage: builder.mutation({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useUploadUserImageMutation,
} = usersApiSlice;
