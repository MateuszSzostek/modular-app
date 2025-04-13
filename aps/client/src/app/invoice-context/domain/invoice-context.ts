import { BASE_API_URL } from '../../../const/index'

/*
 *** Requests Types
 */
export type SaveInvoiceRequest = {}

export type SaveInvoiceResponse = {}

export type IssueInvoiceRequest = {}

export type IssueInvoiceResponse = {}

export type GetInvoiceRequest = {}

export type GetInvoiceResponse = {}

export type GetInvoicesRequest = {}

export type GetInvoicesResponse = {}

export type DeleteInvoicesRequest = {}

export type DeleteInvoicesResponse = {}

export type DownloadInvoicesRequest = {}

export type DownloadInvoicesResponse = {}

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

export const BASE_INVOICE_URL = `${BASE_API_URL}api/invoice/`
