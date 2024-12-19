import { Form, Space, Col } from 'antd'
import { Text, Button, Link, FormItem, PasswordInput } from '../../../../atoms/'
import { NewPasswordFieldType, NEW_PASSWORD_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import useNewPasswordForm from './useNewPasswordForm'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../../routing-context/domain/router-context'
import Header from '../../../../atoms/Header/Header'

export default function NewPasswordForm() {
  const { onFinish, onFinishFailed, formErrors, result } = useNewPasswordForm()
  const [t] = useTranslation()

  return (
    <>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
        <Form style={{ width: '100%' }} name="reset-password-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <Header>{t('new-password-form.title')}</Header>
          </Space>
          <FormItem<NewPasswordFieldType>
            label={t('new-password-form.password-label')}
            name={NEW_PASSWORD_INPUT_FIELDS.newPassword}
            rules={[
              {
                required: true,
                message: t(`error-code.required`),
              },
            ]}
            help={formErrors[NEW_PASSWORD_INPUT_FIELDS.newPassword]}
          >
            <PasswordInput />
          </FormItem>
          <FormItem<NewPasswordFieldType>
            label={t('new-password-form.confirm-password-label')}
            name={NEW_PASSWORD_INPUT_FIELDS.newPasswordConfirmation}
            rules={[
              {
                required: true,
                message: t(`error-code.required`),
              },
            ]}
            help={formErrors[NEW_PASSWORD_INPUT_FIELDS.newPasswordConfirmation]}
          >
            <PasswordInput />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" block loading={result.isLoading}>
              {t('new-password-form.change-password-button')}
            </Button>
          </FormItem>
          <Text>
            {t('new-password-form.have-no-account-label')}
            <Link to={ROUTES.register}>{t('new-password-form.register-link')}</Link>
          </Text>
        </Form>
      </Col>
    </>
  )
}
