import { SelectProps } from 'antd'

export interface ISelect extends SelectProps {
  styleType?: SelectStyleType
}
export enum SelectStyleType {
  PRIMARY = 'primary',
}
