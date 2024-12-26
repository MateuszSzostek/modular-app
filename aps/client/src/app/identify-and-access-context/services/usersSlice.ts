import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GetCurrentUserResponse, GetCurrentUserRequest } from '../domain/identify-and-access-context'
import { BASE_AUTH_URL } from '../domain/identify-and-access-context'
import { ValidationErrorsResponse } from '../../../types'
import { Response } from '../../../shared/all'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_AUTH_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query<Response<GetCurrentUserResponse>, GetCurrentUserRequest>({
      query: () => ({
        url: `current-user`,
        method: 'GET',
      }),

      transformResponse: (response: Response<GetCurrentUserResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),
  }),
})

export const { useLazyGetCurrentUserQuery, useGetCurrentUserQuery } = usersApi
