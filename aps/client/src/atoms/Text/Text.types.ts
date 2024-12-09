import { TextProps } from "antd/es/typography/Text"

export interface IText extends TextProps {
  /**
   * Which version of typography is it?
   */
  styleType?: TextStyleType
}
export enum TextStyleType {
  PRIMARY = "primary"
}
