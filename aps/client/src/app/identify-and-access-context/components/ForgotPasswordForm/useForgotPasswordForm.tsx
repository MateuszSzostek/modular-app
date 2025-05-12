import { useState } from 'react'
import { type FormProps } from 'antd'
import { ForgotPasswordFieldType, ForgotPasswordResponse } from '../../domain/identify-and-access-context'
import { useForgotPasswordMutation } from '../../services/authSlice'
import { useNavigate } from 'react-router-dom'
import { ErrorMap, getErrors } from '../../../../utils'
import { ResponseCatchErrorData } from '../../../../types'
import { IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES } from '../../domain/identify-and-access-context.response-codes'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { Response } from '../../../../shared/all'

export default function useResetPasswordForm() {
  const [forgotPassword, result] = useForgotPasswordMutation()
  const [formErrors, setFormErrors] = useState<ErrorMap>({})
  const [isOpenResetPasswordLinkSentModal, setIsOpenResetPasswordLinkSentModal] = useState<boolean>(false)
  const navigate = useNavigate()

  const onFinish: FormProps<ForgotPasswordFieldType>['onFinish'] = async (values): Promise<void> => {
    setFormErrors({})

    try {
      const r = await forgotPassword({ email: values?.email }).unwrap()

      const result = r as unknown as Response<ForgotPasswordResponse>

      if (result?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.RESET_PASSWORD_LINK_SENT)) {
        setIsOpenResetPasswordLinkSentModal(true)
      }
    } catch (e) {
      console.warn(e)

      const errors = e as ResponseCatchErrorData
      const formErrors = getErrors(errors)

      console.warn(formErrors)

      setFormErrors(formErrors)
    }
  }

  const handleNavigateToLoginPage = () => {
    navigate(`/${ROUTES.auth}/${ROUTES.login}`)
  }

  const onFinishFailed: FormProps<ForgotPasswordFieldType>['onFinishFailed'] = (errorInfo): void => {
    console.log('Failed:', errorInfo)
  }

  return { onFinish, onFinishFailed, handleNavigateToLoginPage, result, formErrors, isOpenResetPasswordLinkSentModal }
}
