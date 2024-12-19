import { Form, Space, Col } from 'antd'
import { Text, Button, Link, FormItem, TextInput } from '../../../../atoms'
import { ResetPasswordFieldType, RESET_PASSWORD_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import useResetPasswordForm from './useResetPasswordForm'
import { useTranslation } from 'react-i18next'
import { FormItemStyleType } from '../../../../atoms/FormItem/FormItem.types'
import { ROUTES } from '../../../routing-context/domain/router-context'
import Header from '../../../../atoms/Header/Header'

export default function ResetPasswordForm() {
  const { onFinish, onFinishFailed, result, formErrors } = useResetPasswordForm()
  const [t] = useTranslation()

  return (
    <>
      <Col span={8} offset={8}>
        <Form name="reset-password-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <Header>{t('reset-password-form.title')}</Header>
          </Space>
          <FormItem<ResetPasswordFieldType>
            styleType={FormItemStyleType.PRIMARY}
            label={t('reset-password-form.email-label')}
            name={RESET_PASSWORD_INPUT_FIELDS.email}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[RESET_PASSWORD_INPUT_FIELDS.email]}
          >
            <TextInput />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" block loading={result.isLoading}>
              {t('reset-password-form.send-button')}
            </Button>
          </FormItem>
          <Text>
            {t('reset-password-form.have-no-account-label')}
            <Link to={ROUTES.register}>{t('reset-password-form.register-link')}</Link>
          </Text>
        </Form>
      </Col>
    </>
  )
}
