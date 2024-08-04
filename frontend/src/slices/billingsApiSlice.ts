import { apiSlice } from "./apiSlice";

export const billingsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBillings: builder.query<any, void>({
      query: () => ({
        url: "/billings",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Billings"],
    }),
    getBillingDetails: builder.query<any, string>({
      query: (billingId) => ({
        url: `/billings/${billingId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    addBilling: builder.mutation({
      query: (data) => ({
        url: "/billings/addbilling",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Billings"],
    }),
    updateBilling: builder.mutation({
      query: (data) => ({
        url: `/billings/updatebilling/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Billings"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetBillingsQuery,
  useGetBillingDetailsQuery,
  useAddBillingMutation,
  useUpdateBillingMutation,
} = billingsApiSlice;
