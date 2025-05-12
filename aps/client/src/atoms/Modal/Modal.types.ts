import { ModalProps } from 'antd'

export interface IModal extends ModalProps {
  styleType?: ModalStyleType
}
export enum ModalStyleType {
  PRIMARY = 'primary',
}
