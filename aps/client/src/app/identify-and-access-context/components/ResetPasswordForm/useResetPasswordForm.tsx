import { useState } from 'react'
import { type FormProps } from 'antd'
import { ResetPasswordFieldType, ResetPasswordResponse } from '../../domain/identify-and-access-context'
import { useResetPasswordMutation } from '../../services/authSlice'
import { useNavigate } from 'react-router-dom'
import { getErrors } from '../../../../utils'
import { Errors, ParsedValidationErrors, Response } from '../../../../types'
import { ROUTES } from '../../../routing-context/domain/router-context'

export default function useResetPasswordForm() {
  const [hasResetPasswordRequested, setHasResetPasswordRequested] = useState<boolean>()
  const [resetPassword, result] = useResetPasswordMutation()
  const [formErrors, setFormErrors] = useState<ParsedValidationErrors>({})
  const navigate = useNavigate()

  const onFinish: FormProps<ResetPasswordFieldType>['onFinish'] = (values): void => {
    setFormErrors({})
    resetPassword({ email: values?.email }).then((response: Response<ResetPasswordResponse>) => {
      if ('error' in response) {
        onValidationErrors(response.error as Errors)
      } else if (response.data.status === '200 OK') {
        setHasResetPasswordRequested(true)
        setTimeout(() => {
          setHasResetPasswordRequested(false)
        }, 4500)
      }
    })
  }

  const onFinishFailed: FormProps<ResetPasswordFieldType>['onFinishFailed'] = (errorInfo): void => {
    console.log('Failed:', errorInfo)
  }

  const onResetPasswordRequestSentConfirmationModalDispose = (): void => {
    navigate(ROUTES.login)
  }

  const onValidationErrors = (errors: Errors): void => {
    const formErrors = getErrors(errors)
    setFormErrors(formErrors)
  }

  return { onFinish, onFinishFailed, onResetPasswordRequestSentConfirmationModalDispose, hasResetPasswordRequested, result, formErrors }
}
