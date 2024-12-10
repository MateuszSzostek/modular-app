import { Checkbox as AntCheckbox } from 'antd'
import { PropsWithChildren } from 'react'
import { ICheckbox, CheckboxStyleType } from './Checkbox.types'
import './Checkbox.style.scss'

export default function Checkbox({ children = 'Checkbox', styleType = CheckboxStyleType.PRIMARY, ...props }: PropsWithChildren<ICheckbox>) {
  return (
    <AntCheckbox className={`checkbox checkbox--${styleType}`} {...props} data-cy>
      {children}
    </AntCheckbox>
  )
}
