export interface IValidationLabel {
  errorCode: string
  styleType?: ValidationLabelStyleType
}
export enum ValidationLabelStyleType {
  PRIMARY = 'primary',
}
