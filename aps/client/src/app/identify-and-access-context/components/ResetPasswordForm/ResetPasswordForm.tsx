import { Form, Space, Col, Row } from 'antd'
import { Text, Button, Link, FormItem, TextInput } from '../../../../atoms'
import { ResetPasswordFieldType, RESET_PASSWORD_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import useResetPasswordForm from './useResetPasswordForm'
import { useTranslation } from 'react-i18next'
import { TextStyleType } from '../../../../atoms/Text/Text.types'
import { FormItemStyleType } from '../../../../atoms/FormItem/FormItem.types'
import { ROUTES } from '../../../routing-context/domain/router-context'

export default function ResetPasswordForm() {
  const { onFinish, onFinishFailed, result, formErrors } = useResetPasswordForm()
  const [t] = useTranslation()

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col span={8} offset={8}>
          <Form style={{ width: '100%' }} name="reset-password-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
            <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center', marginBottom: '32px' }}>
              <Text styleType={TextStyleType.PRIMARY}>{t('reset-password-form.title')}</Text>
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
            <Text styleType={TextStyleType.PRIMARY}>
              {t('reset-password-form.have-no-account-label')}
              <Link to={ROUTES.register}>{t('reset-password-form.register-link')}</Link>
            </Text>
          </Form>
        </Col>
      </Row>
    </>
  )
}
