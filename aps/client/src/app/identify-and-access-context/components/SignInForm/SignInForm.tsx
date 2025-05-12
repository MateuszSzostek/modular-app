import { Form, Space, Col, Row } from 'antd'
import { Text, Button, Link, FormItem, TextInput, PasswordInput } from '../../../../atoms'
import { SignInFieldType, SIGN_IN_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import useLoginForm from './useSignInForm'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../../routing-context/domain/router-context'
import Header from '../../../../atoms/Header/Header'
import Modal from '../../../../atoms/Modal/Modal'
import ValidationLabel from '../../../../molecues/ValidationLabel/ValidationLabel'

export default function SignInForm() {
  const { onFinish, onFinishFailed, handleNavigateToRegisterPage, handleCloseAccountNotExistsModal, isOpenAccountNotExistsModal, result, formErrors, isWrongPassword } = useLoginForm()
  const [t] = useTranslation()

  return (
    <>
      <Col className="bring-in-anim" xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
        <Form name="login-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <Col span={24}>
              <Row justify={'center'}>
                <Header className="gradient-text">{t('login-form.title')}</Header>
              </Row>
              <Row justify={'center'}>
                <Text style={{ textAlign: 'center' }}>{t('login-form.text')}</Text>
              </Row>
            </Col>
          </Space>
          <FormItem<SignInFieldType>
            label={t('login-form.email-label')}
            name={SIGN_IN_INPUT_FIELDS.email}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[SIGN_IN_INPUT_FIELDS.email]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
          >
            <TextInput />
          </FormItem>
          <FormItem<SignInFieldType>
            label={t('login-form.password-label')}
            name={SIGN_IN_INPUT_FIELDS.password}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={
              <>
                {formErrors[SIGN_IN_INPUT_FIELDS.password]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
                {isWrongPassword && <ValidationLabel errorCode={t('error-code.password.password-does-not-match-to-account')} />}
              </>
            }
          >
            <PasswordInput />
          </FormItem>

          <Text>
            <Link to={`/${ROUTES.auth}/${ROUTES.resetPassword}/`}>{t('login-form.forgot-password-link')}</Link>
          </Text>
          <FormItem>
            <Button type="primary" htmlType="submit" block loading={result.isLoading}>
              {t('login-form.login-button')}
            </Button>
          </FormItem>
          <Row>
            <Text>
              {t('login-form.no-account-label')} <Link to={`/${ROUTES.auth}/${ROUTES.register}/`}>{t('login-form.register-link')}</Link>
            </Text>
          </Row>
          <Row>
            <Text>
              {t('login-form.forgot-password-label')} <Link to={`/${ROUTES.auth}/${ROUTES.forgotPassword}/`}>{t('login-form.forgot-password-link')}</Link>
            </Text>
          </Row>
        </Form>
      </Col>
      <Modal
        title={t('login-form.account-does-not-exists-modal.title')}
        open={isOpenAccountNotExistsModal}
        onOk={handleNavigateToRegisterPage}
        okText={t('login-form.account-does-not-exists-modal.ok-btn')}
        onCancel={handleCloseAccountNotExistsModal}
        cancelText={t('login-form.account-does-not-exists-modal.cancel-btn')}
        centered
        closable={false}
      >
        <Text> {t('login-form.account-does-not-exists-modal.content')}</Text>
      </Modal>
    </>
  )
}
