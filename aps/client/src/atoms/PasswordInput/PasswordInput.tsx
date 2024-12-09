import { Input as AntInput } from "antd"
import { IPasswordInput, PasswordInputStyleType } from "./PasswordInput.types"
import "../input.styles.scss"

export default function PasswordInput({ styleType = PasswordInputStyleType.PRIMARY, ...props }: IPasswordInput) {
  return <AntInput.Password className={`input input--${styleType} `} {...props} data-cy />
}
