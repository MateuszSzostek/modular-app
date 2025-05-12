import { useState } from 'react'
import { type FormProps } from 'antd'
import { SignInFieldType, SignInResponse } from '../../domain/identify-and-access-context'
import { useSignInMutation } from '../../services/authSlice'
import { useNavigate } from 'react-router-dom'
import { ResponseCatchErrorData } from '../../../../types'
import { ErrorMap, getErrors } from '../../../../utils'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES } from '../../domain/identify-and-access-context.response-codes'
import { Response } from '../../../../shared/all'

export default function useLoginForm() {
  const [signIn, result] = useSignInMutation()
  const [formErrors, setFormErrors] = useState<ErrorMap>({})
  const [isOpenAccountNotExistsModal, setIsOpenAccountNotExistsModal] = useState<boolean>(false)
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false)
  const navigate = useNavigate()

  const onFinish: FormProps<SignInFieldType>['onFinish'] = async (values): Promise<void> => {
    setFormErrors({})

    try {
      const r = await signIn({
        email: values?.email,
        password: values?.password,
      }).unwrap()

      const result = r as unknown as Response<SignInResponse>

      console.warn(result)

      if (result?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.SIGNED_IN_SUCCESSFULLY)) {
        handleNavigateToDashboard()
      }
    } catch (e) {
      const error = e as ResponseCatchErrorData
      console.warn(e)
      setIsWrongPassword(false)

      if (error?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.USER_AUTH_DATA_DOES_NOT_EXISTS)) {
        setIsOpenAccountNotExistsModal(true)
      }
      if (error?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.WRONG_SIGN_IN_DATA)) {
        setIsWrongPassword(true)
      }

      const formErrors = getErrors(error)

      formErrors && setFormErrors(formErrors)
    }
  }

  const handleNavigateToDashboard = () => {
    navigate(`/${ROUTES.app}/${ROUTES.dashboard}`)
  }

  const handleNavigateToRegisterPage = () => {
    navigate(`/${ROUTES.auth}/${ROUTES.register}`)
  }

  const handleCloseAccountNotExistsModal = () => {
    setIsOpenAccountNotExistsModal(false)
  }

  const onFinishFailed: FormProps<SignInFieldType>['onFinishFailed'] = (errorInfo): void => {
    console.log('Failed:', errorInfo)
  }

  return { onFinish, onFinishFailed, handleNavigateToRegisterPage, handleCloseAccountNotExistsModal, result, formErrors, isOpenAccountNotExistsModal, isWrongPassword }
}
