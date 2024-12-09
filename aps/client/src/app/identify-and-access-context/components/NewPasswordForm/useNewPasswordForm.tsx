import { type FormProps } from "antd"
import { NewPasswordFieldType, NewPasswordResponse } from "../../domain/identify-and-access-context"
import { useState } from "react"
import { useNewPasswordMutation } from "../../services/authSlice"
import { useNavigate } from "react-router-dom"
import { Errors, ParsedValidationErrors, Response } from "../../../../common/types"
import { getErrors } from "../../../../common/utils"
import { ROUTES } from "../../../routing-context/domain/router-context"
import { useParams } from "react-router-dom"

export default function useNewPasswordForm() {
  const [newPassword, result] = useNewPasswordMutation()
  const [formErrors, setFormErrors] = useState<ParsedValidationErrors>({})
  const navigate = useNavigate()
  const [hasPasswordChanged, setHasPasswordChanged] = useState<boolean>()
  const params = useParams()

  const onFinish: FormProps<NewPasswordFieldType>["onFinish"] = (values) => {
    setFormErrors({})
    newPassword({
      jwtToken: params?.token || "",
      newPassword: values?.newPassword,
      newPasswordConfirmation: values?.newPasswordConfirmation,
    }).then((response: Response<NewPasswordResponse>) => {
      if ("error" in response) {
        onValidationErrors(response.error as Errors)
      } else if (response.data.status === "200 OK") {
        setHasPasswordChanged(true)
        setTimeout(() => {
          setHasPasswordChanged(false)
        }, 4500)
      }
    })
  }
  const onFinishFailed: FormProps<NewPasswordFieldType>["onFinishFailed"] = (errorInfo): void => {
    console.log("Failed:", errorInfo)
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
