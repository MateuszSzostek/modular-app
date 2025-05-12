import { Form, Space, Col, Row } from 'antd'
import { Text, Button, Link, FormItem, TextInput } from '../../../../atoms'
import { ForgotPasswordFieldType, FORGOT_PASSWORD_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import useForgotPasswordForm from './useForgotPasswordForm'
import { useTranslation } from 'react-i18next'
import { FormItemStyleType } from '../../../../atoms/FormItem/FormItem.types'
import { ROUTES } from '../../../routing-context/domain/router-context'
import Header from '../../../../atoms/Header/Header'
import Modal from '../../../../atoms/Modal/Modal'
import ValidationLabel from '../../../../molecues/ValidationLabel/ValidationLabel'

export default function ForgotPasswordForm() {
  const { onFinish, onFinishFailed, handleNavigateToLoginPage, result, formErrors, isOpenResetPasswordLinkSentModal } = useForgotPasswordForm()
  const [t] = useTranslation()

  return (
    <>
      <Col className="bring-in-anim" xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
        <Form name="forgot-password-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <Col span={24}>
              <Row justify={'center'}>
                <Header style={{ textAlign: 'center' }} className="gradient-text">
                  {t('forgot-password-form.title')}
                </Header>
              </Row>
              <Row justify={'center'}>
                <Text style={{ textAlign: 'center' }}>{t('forgot-password-form.text')}</Text>
              </Row>
            </Col>
          </Space>
          <FormItem<ForgotPasswordFieldType>
            styleType={FormItemStyleType.PRIMARY}
            label={t('forgot-password-form.email-label')}
            name={FORGOT_PASSWORD_INPUT_FIELDS.email}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[FORGOT_PASSWORD_INPUT_FIELDS.email]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
          >
            <TextInput />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" block loading={result.isLoading}>
              {t('forgot-password-form.send-button')}
            </Button>
          </FormItem>
          <Text>
            {t('forgot-password-form.have-no-account-label')} <Link to={ROUTES.register}>{t('forgot-password-form.register-link')}</Link>
          </Text>
        </Form>
      </Col>
      <Modal
        title={t('forgot-password-form.reset-password-link-sent-modal.title')}
        open={isOpenResetPasswordLinkSentModal}
        onOk={handleNavigateToLoginPage}
        okText={t('forgot-password-form.reset-password-link-sent-modal.ok-btn')}
        centered
        closable={false}
        cancelText={null}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Text> {t('forgot-password-form.reset-password-link-sent-modal.content')}</Text>
      </Modal>
    </>
  )
}
