import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  SignUpRequest,
  SignUpResponse,
  SignInRequest,
  SignInResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  SignOutResponse,
  SignOutRequest,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ConfirmationAccountResponse,
  ConfirmationAccountRequest,
  IsAuthenticatedResponse,
  IsAuthenticatedRequest,
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
      query: ({ firstName, lastName, email, password, privacyPolicy }) => ({
        url: `sign-up`,
        method: 'POST',
        body: { firstName, lastName, email, password, privacyPolicy },
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

    signIn: builder.mutation<Response<SignInResponse>, SignInRequest>({
      query: ({ email, password }) => ({
        url: `sign-in`,
        method: 'POST',
        body: { email, password },
      }),

      transformResponse: (response: Response<SignInResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),

    forgotPassword: builder.mutation<Response<ForgotPasswordResponse>, ForgotPasswordRequest>({
      query: ({ email }) => ({
        url: `forgot-password`,
        method: 'POST',
        body: { email },
      }),

      transformResponse: (response: Response<ForgotPasswordResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),

    resetPassword: builder.mutation<Response<ResetPasswordResponse>, ResetPasswordRequest>({
      query: (payload) => ({
        url: `reset-password`,
        method: 'POST',
        body: payload,
      }),

      transformResponse: (response: Response<ResetPasswordResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),

    confirmAccount: builder.mutation<Response<ConfirmationAccountResponse>, ConfirmationAccountRequest>({
      query: ({ authDataUserId, accountConfirmationToken }) => ({
        url: `confirm-account/${authDataUserId}/${accountConfirmationToken}`,
        method: 'POST',
      }),
      transformResponse: (response: Response<ConfirmationAccountResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),

    signOut: builder.query<Response<SignOutResponse>, SignOutRequest>({
      query: ({}) => ({
        url: `sign-out`,
        method: 'POST',
      }),

      transformResponse: (response: Response<SignOutResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),

    isAuthenticated: builder.mutation<Response<IsAuthenticatedResponse>, IsAuthenticatedRequest>({
      query: () => ({
        url: `is-authenticated`,
        method: 'POST',
      }),

      transformResponse: (response: Response<IsAuthenticatedResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),
  }),
})

export const {
  useSignUpMutation,
  useConfirmAccountMutation,
  useForgotPasswordMutation,
  useIsAuthenticatedMutation,
  useLazySignOutQuery,
  useSignInMutation,
  useSignOutQuery,
  useResetPasswordMutation,
} = authApi
