import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type FormProps } from 'antd'
import { SignUpFieldType, SignUpResponse } from '../../domain/identify-and-access-context'
import { useSignUpMutation } from '../../services/authSlice'
import { Response, ValidationErrors } from '../../../../types'
import { ErrorMap, getErrors } from '../../../../utils'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { STATUS_CODE } from '../../../../shared/all/constants/index'

export default function useSignUpForm() {
  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState<ErrorMap>({})
  const [resetPassword, result] = useSignUpMutation()

  const onFinish: FormProps<SignUpFieldType>['onFinish'] = (values) => {
    console.warn(values)
    setFormErrors({})
    resetPassword({
      email: values?.email,
      password: values?.password,
      privacyPolicy: values?.privacyPolicy ? values?.privacyPolicy : false,
    }).then((response: Response<SignUpResponse>) => {
      if ('error' in response) {
        onValidationErrors(response.error as ValidationErrors)
      } else if (response.data.status !== STATUS_CODE._200) {
        navigate(`${ROUTES.app}${ROUTES.dashboard}`)
      }
    })
  }

  const onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onRegisterConfirmationModalDispose = () => {
    navigate(ROUTES.dashboard)
  }

  const onValidationErrors = (errors: ValidationErrors): void => {
    const formErrors = getErrors(errors)
    setFormErrors(formErrors)
  }

  return { onFinish, onFinishFailed, onRegisterConfirmationModalDispose, result, formErrors }
}
