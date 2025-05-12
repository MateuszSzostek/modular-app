import { BASE_API_URL } from '../../../const/index'
import { Response, ResponseBody } from '../../../shared/all'
/*
 *** Requests Types
 */

export type SignUpRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  privacyPolicy: boolean
}
export interface SignUpResponse extends ResponseBody {}

export interface ConfirmationAccountRequest {
  authDataUserId: string
  accountConfirmationToken: string
}
export interface ConfirmationAccountResponse extends ResponseBody {}

export interface SignInRequest {
  email: string
  password: string
}
export interface SignInResponse extends ResponseBody {}

export interface SignOutRequest {}
export interface SignOutResponse extends ResponseBody {}

export interface ForgotPasswordRequest {
  email: string
}
export interface ForgotPasswordResponse extends ResponseBody {}

export interface ResetPasswordRequest {
  userAuthDataId: string
  newPassword: string
  newPasswordConfirmation: string
  resetPasswordToken: string
}
export interface ResetPasswordResponse extends ResponseBody {}

export interface IsAuthenticatedRequest {}
export interface IsAuthenticatedResponse extends ResponseBody {}

/*
 *** Fields Types
 */
export type SignUpFieldType = {
  email: string
  firstName: string
  lastName: string
  password: string
  privacyPolicy: boolean
}

export type SignInFieldType = {
  email: string
  password: string
}

export type ForgotPasswordFieldType = {
  email: string
}

export type NewPasswordFieldType = {
  'new-password': string
  'new-password-confirmation': string
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
  email = 'email',
  firstName = 'firstName',
  lastName = 'lastName',
  password = 'password',
  privacyPolicy = 'privacyPolicy',
}

export enum SIGN_IN_INPUT_FIELDS {
  email = 'email',
  password = 'password',
}

export enum FORGOT_PASSWORD_INPUT_FIELDS {
  email = 'email',
}

export enum NEW_PASSWORD_INPUT_FIELDS {
  newPassword = 'new-password',
  newPasswordConfirmation = 'new-password-confirmation',
}

export enum RESET_PASSWORD_INPUT_FIELDS {
  newPassword = 'new-password',
  newPasswordConfirmation = 'new-password-confirmation',
}

export interface IUserActionByKey {
  key: 'name' | 'surname' | 'userId' | 'sessionToken'
  value: string
}

export const BASE_AUTH_URL = `${BASE_API_URL}api/auth/`
export const BASE_USERS_URL = `${BASE_API_URL}api/users/`
