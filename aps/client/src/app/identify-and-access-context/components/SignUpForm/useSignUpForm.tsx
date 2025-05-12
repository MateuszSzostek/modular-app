import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type FormProps } from 'antd'
import { SignUpFieldType, SignUpResponse } from '../../domain/identify-and-access-context'
import { useSignUpMutation } from '../../services/authSlice'
import { ResponseCatchErrorData } from '../../../../types'
import { ErrorMap, getErrors } from '../../../../utils'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES } from '../../domain/identify-and-access-context.response-codes'
import { Response } from '../../../../shared/all'

export default function useSignUpForm() {
  const navigate = useNavigate()

  const [formErrors, setFormErrors] = useState<ErrorMap>({})
  const [isOpenAccountConfirmationLinkSent, setIsOpenAccountConfirmationLinkSent] = useState<boolean>(false)
  const [isOpenAccountAcreadyExists, setIsOpenAccountAcreadyExists] = useState<boolean>(false)
  const [signUp, result] = useSignUpMutation()

  const onFinish: FormProps<SignUpFieldType>['onFinish'] = async (values): Promise<void> => {
    setFormErrors({})

    try {
      const r = await signUp({
        email: values?.email,
        firstName: values?.firstName,
        lastName: values?.lastName,
        password: values?.password,
        privacyPolicy: values?.privacyPolicy ?? false,
      }).unwrap()

      const result = r as unknown as Response<SignUpResponse>

      console.warn(result)

      if (result?.data?.message?.includes('registered-successfully')) {
        setIsOpenAccountConfirmationLinkSent(true)
      }
    } catch (e) {
      const error = e as ResponseCatchErrorData
      console.warn(error)
      if (error?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.USER_AUTH_DATA_ALREADY_EXISTS)) {
        setIsOpenAccountAcreadyExists(true)
      }

      const formErrors = getErrors(error)
      setFormErrors(formErrors)
    }
  }

  const handleNavigateToLoginPage = () => {
    navigate(`/${ROUTES.auth}/${ROUTES.login}`)
  }

  const handleNavigateToForgotPassword = () => {
    navigate(`/${ROUTES.auth}/${ROUTES.resetPassword}`)
  }

  const handleCloseAccountAlreadyExistsModal = () => {
    setIsOpenAccountAcreadyExists(false)
  }

  const onFinishFailed: FormProps<SignUpFieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return {
    onFinish,
    onFinishFailed,
    handleNavigateToLoginPage,
    handleCloseAccountAlreadyExistsModal,
    handleNavigateToForgotPassword,
    result,
    formErrors,
    isOpenAccountConfirmationLinkSent,
    isOpenAccountAcreadyExists,
  }
}
