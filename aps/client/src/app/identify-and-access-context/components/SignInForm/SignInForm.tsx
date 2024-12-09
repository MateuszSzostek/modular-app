import { Form, Space, Col, Row } from "antd"
import {
  Text,
  Button,
  Link,
  FormItem,
  TextInput,
  PasswordInput,
  LinkStyleType,
} from "../../../../atoms"
import { SignInFieldType, SIGN_IN_INPUT_FIELDS } from "../../domain/identify-and-access-context"
import useLoginForm from "./useSignInForm"
import { useTranslation } from "react-i18next"
import { ROUTES } from "../../../routing-context/domain/router-context"

export default function SignInForm() {
  const { onFinish, onFinishFailed, result, formErrors } = useLoginForm()
  const [t] = useTranslation()

  return (
    <Row style={{ width: "100%" }}>
      <Col xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
        <Form
          style={{ width: "100%" }}
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical">
          <Space direction="horizontal" style={{ width: "100%", justifyContent: "center", paddingBottom: "32px" }}>
            <Text>{t("login-form.title")}</Text>
          </Space>
          <FormItem<SignInFieldType>
            label={t("login-form.email-label")}
            name={SIGN_IN_INPUT_FIELDS.email}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[SIGN_IN_INPUT_FIELDS.email]}>
            <TextInput />
          </FormItem>
          <FormItem<SignInFieldType>
            label={t("login-form.password-label")}
            name={SIGN_IN_INPUT_FIELDS.password}
            rules={[{ required: true, message: t(`error-code.required`) }]}
            help={formErrors[SIGN_IN_INPUT_FIELDS.password]}>
            <PasswordInput />
          </FormItem>
          <Text>
            <Link to={ROUTES.resetPassword}>{t("login-form.forgot-password-link")}</Link>
          </Text>
          <FormItem>
            <Button type="primary" htmlType="submit" block loading={result.isLoading}>
              {t("login-form.login-button")}
            </Button>
          </FormItem>
          <Text>
            {t("login-form.have-no-account-label")}
            <Link styleType={LinkStyleType.PRIMARY} to={`/${ROUTES.auth}/${ROUTES.register}/`}>
              {t("login-form.register-link")}
            </Link>
          </Text>
        </Form>
      </Col>
    </Row>
  )
}
