import { type FormProps } from 'antd'
import { NewPasswordFieldType, ResetPasswordResponse } from '../../domain/identify-and-access-context'
import { useState } from 'react'
import { useResetPasswordMutation } from '../../services/authSlice'
import { useNavigate } from 'react-router-dom'
import { ResponseCatchErrorData } from '../../../../types'
import { ErrorMap, getErrors } from '../../../../utils'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { useParams } from 'react-router-dom'
import { IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES } from '../../domain/identify-and-access-context.response-codes'
import { Response } from '../../../../shared/all'

export default function useResetPasswordForm() {
  const [newPassword, result] = useResetPasswordMutation()
  const [formErrors, setFormErrors] = useState<ErrorMap>({})
  const navigate = useNavigate()
  const [isOpenPasswordChangedModal, setIsOpenIsOpenPasswordChangedModal] = useState<boolean>(false)
  const params = useParams()

  const onFinish: FormProps<NewPasswordFieldType>['onFinish'] = async (values): Promise<void> => {
    console.warn(values)

    setFormErrors({})
    try {
      const r = await newPassword({
        newPassword: values['new-password'],
        newPasswordConfirmation: values['new-password-confirmation'],
        userAuthDataId: params?.userAuthDataId as string,
        resetPasswordToken: params?.resetPasswordToken as string,
      }).unwrap()

      const result = r as unknown as Response<ResetPasswordResponse>

      if (result?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.PASSWORD_UPDATED)) {
        setIsOpenIsOpenPasswordChangedModal(true)
      }
    } catch (e) {
      console.warn(e)
      const error = e as ResponseCatchErrorData
      console.warn(error)
      const formErrors = getErrors(error)
      console.warn(formErrors)
      setFormErrors(formErrors)
    }
  }

  const onFinishFailed: FormProps<NewPasswordFieldType>['onFinishFailed'] = (errorInfo): void => {
    console.log('Failed:', errorInfo)
  }

  const handlaNavigateToLoginPage = () => {
    navigate(`/${ROUTES.auth}/${ROUTES.login}`)
  }

  return { onFinish, onFinishFailed, handlaNavigateToLoginPage, isOpenPasswordChangedModal, formErrors, result }
}
