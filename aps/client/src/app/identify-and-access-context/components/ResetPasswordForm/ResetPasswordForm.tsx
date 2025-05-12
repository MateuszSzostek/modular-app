import { Form, Space, Col, Row } from 'antd'
import { Text, Button, Link, FormItem, PasswordInput } from '../../../../atoms'
import { NewPasswordFieldType, NEW_PASSWORD_INPUT_FIELDS, RESET_PASSWORD_INPUT_FIELDS } from '../../domain/identify-and-access-context'
import useNewPasswordForm from './useResetPasswordForm'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../../../routing-context/domain/router-context'
import Header from '../../../../atoms/Header/Header'
import Modal from '../../../../atoms/Modal/Modal'
import ValidationLabel from '../../../../molecues/ValidationLabel/ValidationLabel'

export default function ResetPasswordForm() {
  const { onFinish, onFinishFailed, handlaNavigateToLoginPage, isOpenPasswordChangedModal, formErrors, result } = useNewPasswordForm()
  const [t] = useTranslation()

  return (
    <>
      <Col className="bring-in-anim" xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
        <Form style={{ width: '100%' }} name="reset-password-form" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout="vertical">
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <Col span={24}>
              <Row justify={'center'}>
                <Header style={{ textAlign: 'center' }} className="gradient-text">
                  {t('reset-password-form.title')}
                </Header>
              </Row>
              <Row justify={'center'}>
                <Text style={{ textAlign: 'center' }}>{t('reset-password-form.content')}</Text>
              </Row>
            </Col>
          </Space>
          <FormItem<NewPasswordFieldType>
            label={t('reset-password-form.new-password-label')}
            name={RESET_PASSWORD_INPUT_FIELDS.newPassword}
            rules={[
              {
                required: true,
                message: t(`error-code.required`),
              },
            ]}
            help={formErrors[RESET_PASSWORD_INPUT_FIELDS.newPassword]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
          >
            <PasswordInput placeholder={t('reset-password-form.new-password-placeholder')} />
          </FormItem>
          <FormItem<NewPasswordFieldType>
            label={t('reset-password-form.new-password-confirmation-label')}
            name={RESET_PASSWORD_INPUT_FIELDS.newPasswordConfirmation}
            rules={[
              {
                required: true,
                message: t(`error-code.required`),
              },
            ]}
            help={formErrors[RESET_PASSWORD_INPUT_FIELDS.newPasswordConfirmation]?.map((el) => <ValidationLabel key={el} errorCode={t(el)} />)}
          >
            <PasswordInput placeholder={t('reset-password-form.new-password-confirmation-placeholder')} />
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" block loading={result.isLoading}>
              {t('reset-password-form.change-password-button')}
            </Button>
          </FormItem>
          <Text>
            {t('reset-password-form.have-no-account-label')}
            <Link to={ROUTES.register}>{t('reset-password-form.register-link')}</Link>
          </Text>
        </Form>
      </Col>
      <Modal
        title={t('reset-password-form.password-changed-modal.title')}
        open={isOpenPasswordChangedModal}
        onOk={handlaNavigateToLoginPage}
        okText={t('reset-password-form.password-changed-modal.ok-btn')}
        centered
        closable={false}
        cancelText={null}
        cancelButtonProps={{
          style: {
            display: 'none',
          },
        }}
      >
        <Text> {t('reset-password-form.password-changed-modal.content')}</Text>
      </Modal>
    </>
  )
}
