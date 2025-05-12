import { Form, Space, Col, Row } from 'antd'
import { Text, Button, Link, FormItem, TextInput, PasswordInput, Checkbox } from '../../../../atoms'
import { SignUpFieldType } from '../../domain/identify-and-access-context'
import useRegisterForm from './useSignUpForm'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../../routing-context/domain/router-context'
import { SIGN_UP_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import Header from '../../../../atoms/Header/Header'
import ValidationLabel from '../../../../molecues/ValidationLabel/ValidationLabel'
import Modal from '../../../../atoms/Modal/Modal'

export default function SignUpForm() {
  const {
    onFinish,
    onFinishFailed,
    handleNavigateToLoginPage,
    handleNavigateToForgotPassword,
    result,
    formErrors,
    isOpenAccountConfirmationLinkSent,
    isOpenAccountAcreadyExists,
    handleCloseAccountAlreadyExistsModal,
  } = useRegisterForm()
  const [t] = useTranslation()

  return (
    <>
      <Col className="bring-in-anim" xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
        <Form name="register-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical" requiredMark={false}>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center', alignContent: 'center', marginBottom: '24px' }}>
            <Col span={24}>
              <Row justify={'center'}>
                <Header className="gradient-text">{t('register-form.title')}</Header>
              </Row>
              <Row justify={'center'}>
                <Text style={{ textAlign: 'center' }}>{t('register-form.welcome-text')}</Text>
              </Row>
            </Col>
          </Space>
          <FormItem<SignUpFieldType>
            label={t('register-form.email-label')}
            name={SIGN_UP_INPUT_FIELDS.email}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[SIGN_UP_INPUT_FIELDS.email]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
          >
            <TextInput />
          </FormItem>
          <FormItem<SignUpFieldType>
            label={t('register-form.first-name-label')}
            name={SIGN_UP_INPUT_FIELDS.firstName}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[SIGN_UP_INPUT_FIELDS.firstName]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
          >
            <TextInput />
          </FormItem>
          <FormItem<SignUpFieldType>
            label={t('register-form.last-name-label')}
            name={SIGN_UP_INPUT_FIELDS.lastName}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[SIGN_UP_INPUT_FIELDS.lastName]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
          >
            <TextInput />
          </FormItem>
          <FormItem<SignUpFieldType>
            label={t('register-form.password-label')}
            name={SIGN_UP_INPUT_FIELDS.password}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[SIGN_UP_INPUT_FIELDS.password]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
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
            <Button type="primary" htmlType="submit" block loading={result?.isLoading}>
              {t('register-form.register-button')}
            </Button>
          </FormItem>
          <Text>
            {t('register-form.have-a-account-label')}
            <Link to={`/${ROUTES.auth}/${ROUTES.login}`}>{t('register-form.login-link')}</Link>
          </Text>
        </Form>
      </Col>
      <Modal
        title={t('register-form.account-confirmation-link-modal.title')}
        open={isOpenAccountConfirmationLinkSent}
        onOk={handleNavigateToLoginPage}
        centered
        closable={false}
        cancelText={null}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Text> {t('register-form.account-confirmation-link-modal.content')}</Text>
      </Modal>
      <Modal
        title={t('register-form.account-already-exists-modal.title')}
        open={isOpenAccountAcreadyExists}
        onOk={handleNavigateToForgotPassword}
        okText={t('register-form.account-already-exists-modal.ok-btn')}
        onCancel={handleCloseAccountAlreadyExistsModal}
        cancelText={t('register-form.account-already-exists-modal.cancel-btn')}
        centered
        closable={false}
      >
        <Text> {t('register-form.account-already-exists-modal.content')}</Text>
      </Modal>
    </>
  )
}
