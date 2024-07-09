import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefalutMiddleware) => getDefalutMiddleware().concat(apiSlice.middleware),
    devTools:true
})

export default store;