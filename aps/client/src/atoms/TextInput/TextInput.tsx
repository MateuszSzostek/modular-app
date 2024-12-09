import { Input as AntInput } from "antd"
import { ITextInput, TextInputStyleType } from "./TextInput.types"
import "./TextInput.styles.scss"

export default function TextInput({ styleType = TextInputStyleType.PRIMARY, ...props }: ITextInput) {
  return <AntInput className={`input input--${styleType}`} {...props} data-cy />
}
