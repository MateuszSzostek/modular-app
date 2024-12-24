import { ParsedValidationErrors, ValidationErrors, ValidationError } from '../types'
import i18n from 'i18next'

/*
export function transformErrors(errors: ValidationErrors): ValidationErrors {
  const validationErrors: ValidationErrors[] = errors?.data.errors.reduce((acc, error) => {
    return {
      ...acc,
      [error.field]: error.messageCode,
    }
  }, {})
  return validationErrors
}

export function parseErrors(transformedErrors: ValidationErrors): ParsedValidationErrors {
  const parsedErrors: ParsedValidationErrors = Object.keys(transformedErrors).reduce((acc, key: string) => {
    const error: string[] = transformedErrors[key] as string[]
    const parsedError: string[] = error.map((error: string) => {
      return i18n.t(`error-code.${key}.${error}`)
    })

    return {
      ...acc,
      [key]: parsedError.join(',\n '),
    }
  }, {})
  return parsedErrors
}*/

type Error = {
  messageCode: string
  field: string
}

export type ErrorMap = Record<string, string[]>

export function getErrors(errors: ValidationErrors): ErrorMap {
  console.log(errors)
  /*
  const validationErrors: {} = errors?.data.errors.reduce((acc, error) => {
    return {
      ...acc,
      [error.field]: i18n.t(`error-code.${error.field}.${error.messageCode}`),
    }
  }, {})
  */

  return errors?.data.errors.reduce((acc: ErrorMap, { field, messageCode }) => {
    if (!acc[field]) {
      acc[field] = []
    }
    acc[field].push(`error-code.${field}.${messageCode}`)
    return acc
  }, {})

  // console.log(validationErrors)
  // return validationErrors
}
