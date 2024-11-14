import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IOrders, IOrderDetails } from '../../types';

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  tagTypes: ['Orders'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dd7ff2bb4d205f5f.mokky.dev/' }),
  endpoints: (build) => ({
    getOrders: build.query<IOrders[], void>({
      query: () => `orders`,
      providesTags: (result) => result
        ? [
          ...result.map(({ id }) => ({ type: 'Orders' as const, id })),
          { type: 'Orders', id: 'LIST' },
        ]
        : [{ type: 'Orders', id: 'LIST' }],
        transformResponse: (response: IOrders[]) => response.sort((a, b) => b.id! - a.id!),
    }),
    setStatus: build.mutation({
      query: ({ id, status }: { id?: number, status: string }) => ({
        url: `orders/${id}`,
        method: 'PATCH',
        body: { orderStatus: status }
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),
    editOrder: build.mutation({
      query: ({ id, editData, newTotalPrice }: { id: number, editData: IOrderDetails[], newTotalPrice: number }) => ({
        url: `orders/${id}`,
        method: 'PATCH',
        body: { orderDetails: editData, totalPrice: newTotalPrice }
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),
    removeOrder: build.mutation({
      query: ({ id }: { id: number }) => ({
        url: `orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),
    addNewOrder: build.mutation({
      query: (newOrder: IOrders) => ({
        url: `orders`,
        method: "POST",
        body: newOrder
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    })
  })
})

export const { useGetOrdersQuery, useSetStatusMutation, useRemoveOrderMutation, useEditOrderMutation, useAddNewOrderMutation } = ordersApi;