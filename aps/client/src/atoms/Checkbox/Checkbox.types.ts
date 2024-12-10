import { CheckboxProps } from 'antd/lib/checkbox'

export interface ICheckbox extends CheckboxProps {
  styleType?: CheckboxStyleType
}
export enum CheckboxStyleType {
  PRIMARY = 'primary',
}
