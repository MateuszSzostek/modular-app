import { PropsWithChildren } from 'react'
import { IValidationLabel, ValidationLabelStyleType } from './ValidationLabel.types'
import './ValidationLabel.style.scss'
import { Text } from '../../atoms'
import { useTranslation } from 'react-i18next'

export default function ValidationLabel({ children = 'ValidationLabel', styleType = ValidationLabelStyleType.PRIMARY, ...props }: PropsWithChildren<IValidationLabel>) {
  const [t] = useTranslation()

  return (
    <Text className="validation-label">
      {t(props?.errorCode)} <br />
    </Text>
  )
}
