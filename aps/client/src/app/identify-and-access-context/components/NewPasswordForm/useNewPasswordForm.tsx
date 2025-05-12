import { type FormProps } from 'antd'
import { NewPasswordFieldType } from '../../domain/identify-and-access-context'
import { useState } from 'react'
import { useResetPasswordMutation } from '../../services/authSlice'
import { useNavigate } from 'react-router-dom'
import { Errors, ParsedValidationErrors } from '../../../../types'
import { getErrors } from '../../../../utils'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { useParams } from 'react-router-dom'

export default function useNewPasswordForm() {
  const [newPassword, result] = useResetPasswordMutation()
  const [formErrors, setFormErrors] = useState<ParsedValidationErrors>({})
  const navigate = useNavigate()
  const [hasPasswordChanged, setHasPasswordChanged] = useState<boolean>()
  const params = useParams()

  // Handle successful form submission
  const onFinish: FormProps<NewPasswordFieldType>['onFinish'] = async (values): Promise<void> => {
    setFormErrors({})
    try {
      const response = await newPassword({
        newPassword: values.newPassword,
        newPasswordConfirmation: values.newPasswordConfirmation,
        userAuthDataId: '',
        resetPasswordToken: '',
      }).unwrap()

      if (response?.data?.status === 200) {
        setHasPasswordChanged(true)
        setTimeout(() => setHasPasswordChanged(false), 4500)
      }
    } catch (error) {
      const validationErrors = error as Errors
      onValidationErrors(validationErrors)
    }
  }

  const onFinishFailed: FormProps<NewPasswordFieldType>['onFinishFailed'] = (errorInfo): void => {
    console.log('Failed:', errorInfo)
  }

  const onPasswordChangeConfirmationModalDispose = (): void => {
    navigate(ROUTES.login)
  }

  const onValidationErrors = (errors: Errors): void => {
    const formErrors = getErrors(errors)
    setFormErrors(formErrors)
  }

  return { onFinish, onFinishFailed, onPasswordChangeConfirmationModalDispose, hasPasswordChanged, formErrors, result }
}
