import { Form } from "antd"
import { IFormItem, FormItemStyleType } from "./FormItem.types"
import "./FormItem.style.scss"

export default function FormItem<T>({ children = "Content", styleType = FormItemStyleType.PRIMARY, ...props }: IFormItem) {
  return (
    <Form.Item<T> className={`form-item form-item--${styleType}`} {...props} data-cy>
      {children}
    </Form.Item>
  )
}

