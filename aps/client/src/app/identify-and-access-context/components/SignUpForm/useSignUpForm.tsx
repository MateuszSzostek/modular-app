import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { type FormProps } from "antd"
import { SignUpFieldType, SignUpResponse } from "../../domain/identify-and-access-context"
import { useSignUpMutation } from "../../services/authSlice"
import { Response, ValidationError, ParsedValidationErrors, ValidationErrors } from "../../../../common/types"
import { getErrors } from "../../../../common/utils"
import { ROUTES } from "../../../routing-context/domain/router-context"
import { useGoogleOneTapLogin } from "@react-oauth/google"

export default function useSignUpForm() {
  const navigate = useNavigate()

  const [hasRegisterConfirmationLinkSent, setHasRegisterConfirmationLinkSent] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<ParsedValidationErrors>({})
  const [resetPassword, result] = useSignUpMutation()

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse)
    },
    onError: () => {
      console.log("Login Failed")
    },
  })

  const onFinish: FormProps<SignUpFieldType>["onFinish"] = (values) => {
    console.warn(values)
    setFormErrors({})
    resetPassword({
      email: values?.email,
      password: values?.password,
      privacyPolicy: values?.privacyPolicy ? values?.privacyPolicy : false,
    }).then((response: Response<SignUpResponse>) => {
      console.log(response)
      if ("error" in response) {
        onValidationErrors(response.error as ValidationErrors)
      } else if (response.data.status === "success") {
        setHasRegisterConfirmationLinkSent(true)
        setTimeout(() => {
          setHasRegisterConfirmationLinkSent(false)
        }, 4500)
      }
    })
  }

  const onFinishFailed: FormProps<SignUpFieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  const onRegisterConfirmationModalDispose = () => {
    navigate(ROUTES.dashboard)
  }

  const onValidationErrors = (errors: ValidationErrors): void => {
    const formErrors = getErrors(errors)
    setFormErrors(formErrors)
  }

  return { onFinish, onFinishFailed, onRegisterConfirmationModalDispose, hasRegisterConfirmationLinkSent, result, formErrors }
}
