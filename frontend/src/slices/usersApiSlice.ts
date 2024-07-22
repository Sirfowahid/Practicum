import {apiSlice} from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<any,void>({
            query:()=>({
                url:"/users",
            }),
            keepUnusedDataFor:5,
            providesTags:["Users"],
        }),
        getUserDetails: builder.query<any,string>({
            query:(userId) => ({
                url:`/users/${userId}`
            }),
            keepUnusedDataFor:5
        }),  
    }),
    overrideExisting: false,
})

export const { useGetUsersQuery, useGetUserDetailsQuery } = usersApiSlice;