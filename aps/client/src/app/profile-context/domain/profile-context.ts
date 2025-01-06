import { BASE_API_URL } from '../../../const/index'

/*
 *** Requests Types
 */
export type AddProfileRequest = {
  name: string
}
export type AddProfileResponse = {}

export type GetProfileByIdRequest = {
  id: string
}
export type GetProfileByIdResponse = {}

export type GetOwnProfilesRequest = {}
export type GetOwnProfilesResponse = {}

/*
 *** Fields Types
 */
export type AddProfileFieldType = {
  name: string
}

/*
 *** Components Props Types
 */
export type AddProfileModalProps = {
  isOpen: boolean
}

/*
 *** Field Types Keys
 */
export enum ADD_PROFILE_INPUT_FIELDS {
  name = 'name',
}

export const BASE_PROFILE_URL = `${BASE_API_URL}api/profile/`
