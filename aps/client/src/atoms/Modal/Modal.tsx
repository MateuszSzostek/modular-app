import { Modal as AntModal } from 'antd'
import { IModal, ModalStyleType } from './Modal.types'
import './Modal.style.scss'

export default function Modal({ styleType = ModalStyleType.PRIMARY, children, ...props }: IModal) {
  return (
    <AntModal
      className={`modal modal--${styleType} animated-border-modal`}
      {...props}
      styles={{
        mask: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(5px)', // Nowy sposób definiowania rozmycia
        },
      }}
    >
      {' '}
      {children}{' '}
    </AntModal>
  )
}
