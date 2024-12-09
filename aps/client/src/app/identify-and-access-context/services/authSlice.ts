import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
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
} from "../domain/identify-and-access-context"
import { BASE_AUTH_URL } from "../domain/identify-and-access-context"
import { setUserFieldByKey } from "./userSlice"
import { ValidationErrorsResponse } from "../../../common/types"
//import { baseJwtQuery } from "../../../common/services/auth"

export const authApi = createApi({
  reducerPath: "authApi",
  // baseQuery: baseJwtQuery(BASE_AUTH_URL),
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_AUTH_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<SignUpResponse, SignUpRequest>({
      query: ({ email, password, privacyPolicy }) => ({
        url: `sign-up`,
        method: "POST",
        body: { email, password, privacyPolicy },
      }),
      transformResponse: (response: SignUpResponse) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          console.log(arg)
          const { data } = await queryFulfilled
          if ("userId" in data && "sessionToken" in data) {
            dispatch(
              setUserFieldByKey({
                key: "userId",
                value: data.userId,
              }),
            )
            dispatch(
              setUserFieldByKey({
                key: "sessionToken",
                value: data.sessionToken,
              }),
            )
          }
        } catch (error) {
          console.error(error)
        }
      },
    }),
    signUpConfirmation: builder.mutation<SignUpConfirmationResponse, SignUpConfirmationRequest>({
      query: ({ userId, token }) => ({
        url: `sign-up-confirmation`,
        method: "POST",
        body: { userId },
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (response: SignUpConfirmationResponse) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    login: builder.mutation<SignInResponse, SignInRequest>({
      query: ({ email, password }) => ({
        url: `sign-in`,
        method: "POST",
        body: { email, password },
      }),

      transformResponse: (response: SignInResponse) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: ({ email }) => ({
        url: `reset-password`,
        method: "POST",
        body: { email },
      }),

      transformResponse: (response: ResetPasswordResponse) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    newPassword: builder.mutation<NewPasswordResponse, NewPasswordRequest>({
      query: ({ jwtToken, newPassword, newPasswordConfirmation }) => ({
        url: `new-password`,
        method: "POST",
        body: { jwtToken, newPassword, newPasswordConfirmation },
      }),

      transformResponse: (response: NewPasswordResponse) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    getCurrentUser: builder.query<GetCurrentUserResponse, GetCurrentUserRequest>({
      query: () => ({
        url: `currentuser`,
        method: "GET",
      }),

      transformResponse: (response: GetCurrentUserResponse) => response,
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
} = authApi
