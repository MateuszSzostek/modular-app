import { BASE_API_URL } from "../../../common/consts/index"

/*
 *** Requests Types
 */
export type SignUpRequest = {
  email: string
  password: string
  privacyPolicy: boolean
}
export type SignUpResponse = {
  status: "success" | "error"
  code: number
  message: string
  data: {}
}

export type SignUpConfirmationRequest = {
  userId: string
  token: string
}
export type SignUpConfirmationResponse = {
  status: string
}

export type SignInRequest = {
  email: string
  password: string
}
export type SignInResponse = {
  sessionToken: string
  status: string
  message: string
}

export type ResetPasswordRequest = {
  email: string
}
export type ResetPasswordResponse = {
  status: string
}

export type NewPasswordRequest = {
  jwtToken: string
  newPassword: string
  newPasswordConfirmation: string
}
export type NewPasswordResponse = {
  status: string
}

export type GetCurrentUserRequest = {}
export type GetCurrentUserResponse = {}

/*
 *** Fields Types
 */
export type SignUpFieldType = {
  email: string
  password: string
  privacyPolicy: boolean
}

export type SignInFieldType = {
  email: string
  password: string
}

export type ResetPasswordFieldType = {
  email: string
}

export type NewPasswordFieldType = {
  newPassword: string
  newPasswordConfirmation: string
}

/*
 *** Components Props Types
 */
export type RegisterLinkConfirmationModalProps = {
  isOpen: boolean
}

export type PasswordChangedConfirmationModalProps = {
  isOpen: boolean
}

export type ResetPasswordRequestSentConfirmationModalProps = {
  isOpen: boolean
}

/*
 *** Other Types & Interfaces
 */
export type MockUserType = {
  userId: string
  email: string
  password: string
  companyId: string
}

export interface IUserState {
  userId: string
  name: string
  surname: string
  sessionToken: string
}

/*
 *** Field Types Keys
 */
export enum SIGN_UP_INPUT_FIELDS {
  email = "email",
  password = "password",
  privacyPolicy = "privacyPolicy",
}

export enum SIGN_IN_INPUT_FIELDS {
  email = "email",
  password = "password",
}

export enum RESET_PASSWORD_INPUT_FIELDS {
  email = "email",
}

export enum NEW_PASSWORD_INPUT_FIELDS {
  newPassword = "newPassword",
  newPasswordConfirmation = "newPasswordConfirmation",
}

export interface IUserActionByKey {
  key: "name" | "surname" | "userId" | "sessionToken"
  value: string
}

export const BASE_AUTH_URL = `${BASE_API_URL}api/users/`
