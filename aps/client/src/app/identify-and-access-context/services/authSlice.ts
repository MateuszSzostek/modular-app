import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
  NewPasswordRequest,
  NewPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignUpConfirmationResponse,
  SignUpConfirmationRequest,
  GetCurrentUserResponse,
  GetCurrentUserRequest,
  SignOutResponse,
  SignOutRequest,
} from '../domain/identify-and-access-context'
import { BASE_AUTH_URL } from '../domain/identify-and-access-context'
import { setUserFieldByKey } from './usersStoreSlice'
import { ValidationErrorsResponse } from '../../../types'
import { Response } from '../../../shared/all'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_AUTH_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<Response<SignUpResponse>, SignUpRequest>({
      query: ({ email, password, privacyPolicy }) => ({
        url: `sign-up`,
        method: 'POST',
        body: { email, password, privacyPolicy },
      }),
      transformResponse: (response: Response<SignUpResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log(arg)
          const { data } = await queryFulfilled
          if ('userId' in data && 'sessionToken' in data) {
            dispatch(
              setUserFieldByKey({
                key: 'userId',
                //@ts-expect-error
                value: data.userId,
              })
            )
            dispatch(
              setUserFieldByKey({
                key: 'sessionToken',
                //@ts-expect-error
                value: data.sessionToken,
              })
            )
          }
        } catch (error) {
          console.error(error)
        }
      },
    }),
    signUpConfirmation: builder.mutation<Response<SignUpConfirmationResponse>, SignUpConfirmationRequest>({
      query: ({ userId, token }) => ({
        url: `sign-up-confirmation`,
        method: 'POST',
        body: { userId },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: Response<SignUpConfirmationResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    login: builder.mutation<Response<SignInResponse>, SignInRequest>({
      query: ({ email, password }) => ({
        url: `sign-in`,
        method: 'POST',
        body: { email, password },
      }),

      transformResponse: (response: Response<SignInResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    logout: builder.query<Response<SignOutResponse>, SignOutRequest>({
      query: ({}) => ({
        url: `sign-out`,
        method: 'GET',
      }),

      transformResponse: (response: Response<SignOutResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    resetPassword: builder.mutation<Response<ResetPasswordResponse>, ResetPasswordRequest>({
      query: ({ email }) => ({
        url: `reset-password`,
        method: 'POST',
        body: { email },
      }),

      transformResponse: (response: Response<ResetPasswordResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    newPassword: builder.mutation<Response<NewPasswordResponse>, NewPasswordRequest>({
      query: ({ jwtToken, newPassword, newPasswordConfirmation }) => ({
        url: `new-password`,
        method: 'POST',
        body: { jwtToken, newPassword, newPasswordConfirmation },
      }),

      transformResponse: (response: Response<NewPasswordResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    getCurrentUser: builder.query<Response<GetCurrentUserResponse>, GetCurrentUserRequest>({
      query: () => ({
        url: `currentuser`,
        method: 'GET',
      }),

      transformResponse: (response: Response<GetCurrentUserResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),
  }),
})

export const {
  useSignUpMutation,
  useSignUpConfirmationMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useNewPasswordMutation,
  useLazyGetCurrentUserQuery,
  useGetCurrentUserQuery,
  useLazyLogoutQuery,
  useLogoutQuery,
} = authApi
