import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  SaveInvoiceResponse,
  SaveInvoiceRequest,
  IssueInvoiceResponse,
  IssueInvoiceRequest,
  GetInvoiceResponse,
  GetInvoiceRequest,
  GetInvoicesResponse,
  GetInvoicesRequest,
  DownloadInvoicesResponse,
  DownloadInvoicesRequest,
} from '../domain/invoice-context'
import { BASE_INVOICE_URL } from '../domain/invoice-context'
import { ValidationErrorsResponse } from '../../../types'
import { Response } from '../../../shared/all'

export const invoicesApi = createApi({
  reducerPath: 'invoiceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_INVOICE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    saveInvoice: builder.mutation<Response<SaveInvoiceResponse>, SaveInvoiceRequest>({
      query: (payload) => ({
        url: `save`,
        method: 'POST',
        body: { payload },
      }),
      transformResponse: (response: Response<SaveInvoiceResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),
    issueInvoice: builder.mutation<Response<IssueInvoiceResponse>, IssueInvoiceRequest>({
      query: (payload) => ({
        url: `issue`,
        method: 'POST',
        body: { payload },
      }),
      transformResponse: (response: Response<IssueInvoiceResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response,
    }),
    getInvoice: builder.query<Response<GetInvoiceResponse>, GetInvoiceRequest>({
      query: (payload) => ({
        url: ``,
        method: 'GET',
        body: payload,
      }),
      transformResponse: (response: Response<GetInvoiceResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    getInvoices: builder.query<Response<GetInvoicesResponse>, GetInvoicesRequest>({
      query: (payload) => ({
        url: ``,
        method: 'GET',
        body: payload,
      }),

      transformResponse: (response: Response<GetInvoicesResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),

    downloadInvoices: builder.query<Response<DownloadInvoicesResponse>, DownloadInvoicesRequest>({
      query: (payload) => ({
        url: ``,
        method: 'GET',
        body: payload,
      }),

      transformResponse: (response: Response<DownloadInvoicesResponse>) => response,
      transformErrorResponse: (response: ValidationErrorsResponse) => response.data,
    }),
  }),
})

export const { useDownloadInvoicesQuery, useGetInvoiceQuery, useGetInvoicesQuery, useIssueInvoiceMutation, useLazyDownloadInvoicesQuery, useLazyGetInvoiceQuery, useLazyGetInvoicesQuery } = profileApi
