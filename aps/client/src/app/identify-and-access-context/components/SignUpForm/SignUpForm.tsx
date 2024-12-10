import { Form, Space, Col, Row } from 'antd'
import { Text, Button, Link, FormItem, TextInput, PasswordInput, Checkbox } from '../../../../atoms'
import { SignUpFieldType } from '../../domain/identify-and-access-context'
import useRegisterForm from './useSignUpForm'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { SIGN_UP_INPUT_FIELDS } from '../../domain/identify-and-access-context'

export default function SignUpForm() {
  const { onFinish, onFinishFailed, result, formErrors } = useRegisterForm()
  const [t] = useTranslation()

  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
          <Form name="register-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical" requiredMark={false}>
            <Space
              direction="horizontal"
              style={{
                width: '100%',
                justifyContent: 'center',
                marginBottom: '56px',
              }}
            >
              <Text>{t('register-form.title')}</Text>xfxfsd
            </Space>
            <FormItem<SignUpFieldType>
              label={t('register-form.email-label')}
              name={SIGN_UP_INPUT_FIELDS.email}
              rules={[{ required: true, message: t(`error-code.required`) }]}
              help={formErrors[SIGN_UP_INPUT_FIELDS.email]}
            >
              <TextInput />
            </FormItem>

            <FormItem<SignUpFieldType>
              label={t('register-form.password-label')}
              name={SIGN_UP_INPUT_FIELDS.password}
              rules={[{ required: true, message: t(`error-code.required`) }]}
              help={formErrors[SIGN_UP_INPUT_FIELDS.password]}
            >
              <PasswordInput />
            </FormItem>

            <FormItem<SignUpFieldType>
              name={SIGN_UP_INPUT_FIELDS.privacyPolicy}
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  transform: (value) => {
                    return value === true ? true : undefined
                  },
                  validator: async (rule, value) => {
                    console.log(rule)
                    if (value === undefined) {
                      return Promise.reject(new Error(t('error-code.required')))
                    } else {
                      return Promise.resolve()
                    }
                  },
                  message: t(`error-code.required`),
                },
              ]}
              help={formErrors[SIGN_UP_INPUT_FIELDS.privacyPolicy]}
            >
              <Checkbox>{t('register-form.privacy-policy-label')}</Checkbox>
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" block loading={result.isLoading}>
                {t('register-form.register-button')}
              </Button>
            </FormItem>
            <Text>
              {t('register-form.have-a-account-label')}
              <Link to={`/${ROUTES.auth}/${ROUTES.login}`}>{t('register-form.login-link')}</Link>
            </Text>
          </Form>
        </Col>
      </Row>
    </>
  )
}
