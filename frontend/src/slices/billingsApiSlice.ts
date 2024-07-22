import { apiSlice } from "./apiSlice";

export const billingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBillings: builder.query<any,void>({
            query:()=>({
                url:"/billings",
            }),
            keepUnusedDataFor:5,
            providesTags:["Billings"]
        }),
        getBillingDetails:builder.query<any,string>({
            query:(billingId)=>({
                url:`/billings/${billingId}`
            }),
            keepUnusedDataFor:5,
        })
    }),
    overrideExisting:false
})

export const { useGetBillingsQuery, useGetBillingDetailsQuery } = billingsApiSlice;