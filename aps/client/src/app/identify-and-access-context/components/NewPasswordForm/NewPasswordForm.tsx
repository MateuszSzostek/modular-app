import { Form, Space, Col, Row } from 'antd'
import { Text, Button, Link, FormItem, PasswordInput } from '../../../../atoms/'
import { NewPasswordFieldType, NEW_PASSWORD_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import useNewPasswordForm from './useNewPasswordForm'
import { useTranslation } from 'react-i18next'
import { TextStyleType } from '../../../../atoms/Text/Text.types'
import { PasswordInputStyleType } from '../../../../atoms/PasswordInput/PasswordInput.types'
import { FormItemStyleType } from '../../../../atoms/FormItem/FormItem.types'
import { LinkStyleType } from '../../../../atoms/Link/Link.types'
import { ROUTES } from '../../../routing-context/domain/router-context'

export default function NewPasswordForm() {
  const { onFinish, onFinishFailed, formErrors, result } = useNewPasswordForm()
  const [t] = useTranslation()

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
          <Form style={{ width: '100%' }} name="reset-password-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
            <Space
              direction="horizontal"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginBottom: '32px',
              }}
            >
              <Text styleType={TextStyleType.PRIMARY}>{t('new-password-form.title')}</Text>
            </Space>
            <FormItem<NewPasswordFieldType>
              styleType={FormItemStyleType.PRIMARY}
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
              <PasswordInput styleType={PasswordInputStyleType.PRIMARY} />
            </FormItem>
            <FormItem<NewPasswordFieldType>
              styleType={FormItemStyleType.PRIMARY}
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
              <PasswordInput styleType={PasswordInputStyleType.PRIMARY} />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" block loading={result.isLoading}>
                {t('new-password-form.change-password-button')}
              </Button>
            </FormItem>
            <Text styleType={TextStyleType.PRIMARY}>
              {t('new-password-form.have-no-account-label')}
              <Link styleType={LinkStyleType.PRIMARY} to={ROUTES.register}>
                {t('new-password-form.register-link')}
              </Link>
            </Text>
          </Form>
        </Col>
      </Row>
    </>
  )
}
