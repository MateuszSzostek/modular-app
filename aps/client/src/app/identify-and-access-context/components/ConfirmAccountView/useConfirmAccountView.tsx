import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ConfirmationAccountResponse } from '../../domain/identify-and-access-context'
import { ResponseCatchErrorData } from '../../../../types'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES } from '../../domain/identify-and-access-context.response-codes'
import { useConfirmAccountMutation } from '../../services/authSlice'
import { Response } from '../../../../shared/all'

export default function useConfirmAccountView() {
  const [confirmAccount] = useConfirmAccountMutation()
  const [confoirmationStatus, setConfirmationStatus] = useState<'SUCCESS' | 'FAILURE' | 'LOADING'>('LOADING')

  const params = useParams()

  useEffect(() => {
    if (params?.userId && params?.emailConfirmationToken) {
      handleConfirmAccount()
    } else {
      setConfirmationStatus('FAILURE')
    }
  }, [])

  const handleConfirmAccount = async () => {
    try {
      const r = await confirmAccount({ authDataUserId: params?.userId as string, accountConfirmationToken: params?.emailConfirmationToken as string }).unwrap()

      const result = r as unknown as Response<ConfirmationAccountResponse>

      if (result?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.EMAIL_CONFIRMED_SUCCESSFULLY)) {
        setConfirmationStatus('SUCCESS')

        setTimeout(() => {
          handleNavigateToLoginPage()
        }, 10000)
      }
    } catch (e) {
      const error = e as ResponseCatchErrorData

      if (error?.data?.message?.includes(IDENTIFY_AND_ACCESS_CONTEXT_RESPONSE_CODES.EMAIL_CONFIRMED_FAILURE)) {
        setConfirmationStatus('FAILURE')

        setTimeout(() => {
          handleNavigateToLoginPage()
        }, 10000)
      }
    }
  }

  const navigate = useNavigate()

  const handleNavigateToLoginPage = () => {
    navigate(`/${ROUTES.auth}/${ROUTES.login}`)
  }

  return {
    handleNavigateToLoginPage,
    confoirmationStatus,
  }
}
