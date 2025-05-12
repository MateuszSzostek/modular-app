import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export type Errors = {
  errors: {
    id: string
    message: string[]
  }[]
  message: string
  status: string
}

export type ResponseMessage = {
  field: string
  messageCode: string
}

export type Response<T> = { data: T } | { error: FetchBaseQueryError | SerializedError | ValidationErrorsResponse }

export type ValidationErrorsResponse = ResponseCatchErrorData | FetchBaseQueryError

export type ResponseCatchErrorData = {
  data: {
    error: string
    message: string[]
    statusCode: number
  }
  status: number
}

export type ParsedValidationErrors = {
  [key: string]: string
}
export type SelectOptions = {
  value: string
  label: string
}[]

export type PaginatedItems<T> = {
  totalPages: number
  currentPage: number
  hasNext: boolean
  hasPrevious: boolean
  items: T[]
}
