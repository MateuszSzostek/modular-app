import { Select as AntSelect } from "antd"
import { ISelect, SelectStyleType } from "./Select.types"
import "./Select.style.scss"

export default function Select({ styleType = SelectStyleType.PRIMARY, ...props }: ISelect) {
  return <AntSelect className={`select select--${styleType}`} {...props} />
}
