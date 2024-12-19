import { TitleProps } from 'antd/es/typography/Title'

export interface IHeader extends TitleProps {
  /**
   * Which version of typography is it?
   */
  styleType?: HeaderStyleType
}
export enum HeaderStyleType {
  PRIMARY = 'primary',
}
