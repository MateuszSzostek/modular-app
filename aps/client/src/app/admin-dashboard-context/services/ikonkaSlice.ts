import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { FetchAllIkonkaProductsRequest, FetchAllIkonkaProductsResponse } from "../domain/dashboard-context"
import { BASE_IKONKA_URL } from "../domain/dashboard-context"
import { ValidationErrorsResponse } from "../../../common/types"

export const ikonkaApi = createApi({
  reducerPath: "ikonkaApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_IKONKA_URL, credentials: "include" }),
  endpoints: (builder) => ({
    fetchAllIkonkaProducts: builder.query<FetchAllIkonkaProductsResponse, FetchAllIkonkaProductsRequest>({
      query: () => ({
        url: `fetch-all-ikonka-products`,
        method: "GET",
      }),
      transformResponse: (response: FetchAllIkonkaProductsResponse) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),
  }),
})

export const { useLazyFetchAllIkonkaProductsQuery } = ikonkaApi
