import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query"

import { BASE_URL } from "../constant"

const baseQuery = fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice = createApi({
    baseQuery,
    tagTypes:["Users","Rooms","Bookings","Billings"],
    endpoints:(builder)=>({})
})