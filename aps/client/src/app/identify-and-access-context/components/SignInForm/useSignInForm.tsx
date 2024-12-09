import { useState } from "react"
import { type FormProps } from "antd"
import { SignInFieldType, SignInResponse } from "../../domain/identify-and-access-context"
import { useLoginMutation, useLazyGetCurrentUserQuery } from "../../services/authSlice"
import { useNavigate } from "react-router-dom"
import { ParsedValidationErrors, Response, ValidationErrors } from "../../../../common/types"
import { getErrors } from "../../../../common/utils"
import { useGoogleOneTapLogin } from "@react-oauth/google"
import { ROUTES } from "../../../routing-context/domain/router-context"

export default function useLoginForm() {
  const [login, result] = useLoginMutation()
  const [triggerGetCurrentUser] = useLazyGetCurrentUserQuery({})
  const [formErrors, setFormErrors] = useState<ParsedValidationErrors>({})
  const navigate = useNavigate()

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse)
    },
    onError: () => {
      console.log("Login Failed")
    },
  })

  const onFinish: FormProps<SignInFieldType>["onFinish"] = async (values) => {
    setFormErrors({})
    const loginResponse = await login({
      email: values?.email,
      password: values?.password,
    })
    if ("error" in loginResponse) {
      onValidationErrors(loginResponse.error as ValidationErrors)
    } else {
      await triggerGetCurrentUser({})
      navigate(`/${ROUTES.app}/${ROUTES.dashboard}`)
    }
  }

  const onFinishFailed: FormProps<SignInFieldType>["onFinishFailed"] = (errorInfo): void => {
    console.log("Failed:", errorInfo)
  }

  const onValidationErrors = (errors: ValidationErrors): void => {
    const formErrors = getErrors(errors)
    setFormErrors(formErrors)
  }

  return { onFinish, onFinishFailed, result, formErrors }
}
