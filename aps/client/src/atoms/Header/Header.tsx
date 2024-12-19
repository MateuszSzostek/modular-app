import { PropsWithChildren } from 'react'
import { IHeader, HeaderStyleType } from './Header.types'
import './Header.style.scss'
import { Typography } from 'antd'

export default function Header({ children = 'header', styleType = HeaderStyleType.PRIMARY, ...props }: PropsWithChildren<IHeader>) {
  return (
    <Typography.Title className={`header header--${styleType}`} {...props}>
      {children}
    </Typography.Title>
  )
}
