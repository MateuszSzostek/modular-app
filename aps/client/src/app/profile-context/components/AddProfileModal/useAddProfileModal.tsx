import { useState } from 'react'
import { type FormProps } from 'antd'
import { AddProfileFieldType } from '../../domain/profile-context'
import { useAddProfileMutation } from '../../services/profileSlice'
import { ValidationErrors } from '../../../../types'
import { ErrorMap, getErrors } from '../../../../utils'

export default function useAddProfileModal() {
  const [addProfile, result] = useAddProfileMutation()
  const [formErrors, setFormErrors] = useState<ErrorMap>({})

  const onFinish: FormProps<AddProfileFieldType>['onFinish'] = async (values) => {
    setFormErrors({})
    const addProfileResponse = await addProfile({
      name: values?.name,
    })
    if ('error' in addProfileResponse) {
      onValidationErrors(addProfileResponse.error as ValidationErrors)
    } else {
      // todo close modal
    }
  }

  const onFinishFailed: FormProps<AddProfileFieldType>['onFinishFailed'] = (errorInfo): void => {
    console.log('Failed:', errorInfo)
  }

  const onValidationErrors = (errors: ValidationErrors): void => {
    const formErrors = getErrors(errors)
    setFormErrors(formErrors)
  }

  return { onFinish, onFinishFailed, result, formErrors }
}
