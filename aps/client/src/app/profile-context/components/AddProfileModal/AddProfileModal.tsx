import { Form, Space, Col } from 'antd'
import { Button, FormItem, TextInput } from '../../../../atoms'
import { AddProfileFieldType, ADD_PROFILE_INPUT_FIELDS } from '../../domain/profile-context'
import useAddProfileModal from './useAddProfileModal'
import { useTranslation } from 'react-i18next'
import Header from '../../../../atoms/Header/Header'

export default function AddProfileModal() {
  const { onFinish, onFinishFailed, result, formErrors } = useAddProfileModal()
  const [t] = useTranslation()

  return (
    <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
      <Form name="add-profile-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
          <Header>{t('add-profile.title')}</Header>
        </Space>
        <FormItem<AddProfileFieldType>
          label={t('add-profile.name-label')}
          name={ADD_PROFILE_INPUT_FIELDS.name}
          rules={[{ required: true, message: t(`error-code.required`) }]}
          help={formErrors[ADD_PROFILE_INPUT_FIELDS.name]}
        >
          <TextInput />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block loading={result.isLoading}>
            {t('add-profile.add-button')}
          </Button>
        </FormItem>
      </Form>
    </Col>
  )
}
