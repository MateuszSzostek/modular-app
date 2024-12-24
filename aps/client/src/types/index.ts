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

export type ValidationError = {
  field: string
  messageCode: string
}

export type Response<T> = { data: T } | { error: FetchBaseQueryError | SerializedError | ValidationErrorsResponse }

export type ValidationErrorsResponse = ValidationErrors | FetchBaseQueryError

export type ValidationErrors = {
  data: {
    errors: ValidationError[]
  }
  status: string | number
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
