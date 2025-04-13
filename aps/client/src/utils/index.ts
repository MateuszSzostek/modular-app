import { ValidationErrors } from '../types'

export type ErrorMap = Record<string, string[]>

export function getErrors(errors: ValidationErrors): ErrorMap {
  console.log(errors)
  return errors?.data?.errors.reduce((acc: ErrorMap, { field, messageCode }) => {
    if (!acc[field]) {
      acc[field] = []
    }
    acc[field].push(`error-code.${field}.${messageCode}`)
    return acc
  }, {})
}
