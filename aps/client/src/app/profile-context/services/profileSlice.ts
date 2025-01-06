import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AddProfileRequest, AddProfileResponse, GetProfileByIdRequest, GetProfileByIdResponse, GetOwnProfilesRequest, GetOwnProfilesResponse } from '../domain/profile-context'
import { BASE_PROFILE_URL } from '../domain/profile-context'
import { ValidationErrorsResponse } from '../../../types'
import { Response } from '../../../shared/all'

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_PROFILE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addProfile: builder.mutation<Response<AddProfileResponse>, AddProfileRequest>({
      query: ({ name }) => ({
        url: `add-profile`,
        method: 'POST',
        body: { name },
      }),
      transformResponse: (response: Response<AddProfileResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),
    getProfileById: builder.query<Response<GetProfileByIdResponse>, GetProfileByIdRequest>({
      query: ({ id }) => ({
        url: `get-profile-by-id/${id}`,
        method: 'GET',
        body: { name },
      }),
      transformResponse: (response: Response<GetProfileByIdResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    getOwnProofiles: builder.mutation<Response<GetOwnProfilesResponse>, GetOwnProfilesRequest>({
      query: () => ({
        url: `get-own-profiles`,
        method: 'GET',
      }),

      transformResponse: (response: Response<GetOwnProfilesResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),
  }),
})

export const { useAddProfileMutation, useGetOwnProofilesMutation, useGetProfileByIdQuery, useLazyGetProfileByIdQuery } = profileApi
