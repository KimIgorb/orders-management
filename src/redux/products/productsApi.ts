import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOrderDetails } from "../../types";


export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dd7ff2bb4d205f5f.mokky.dev/' }),
  endpoints: (build) => ({
    getProducts: build.query<IOrderDetails[], void>({
      query: () => `products`,
    })
  })
})

export const { useGetProductsQuery } = productsApi