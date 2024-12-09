import { ParsedValidationErrors, ValidationErrors, ValidationError } from '../types'
import i18n from 'i18next'

export function transformErrors(errors: ValidationErrors): ValidationErrors {
  const validationErrors: ValidationErrors[] = errors?.data.errors.reduce((acc, error) => {
    return {
      ...acc,
      [error.field]: error.message,
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
}

export function getErrors(errors: ValidationErrors): ParsedValidationErrors {
  const validationErrors: {} = errors?.data.errors.reduce((acc, error) => {
    return {
      ...acc,
      [error.field]: i18n.t(`error-code.${error.field}.${error.message}`),
    }
  }, {})

  console.log(validationErrors)
  return validationErrors
}
