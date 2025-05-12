import { Space, Col, Row } from 'antd'
import { Text } from '../../../../atoms'
import useConfirmAccountView from './useConfirmAccountView'
import { useTranslation } from 'react-i18next'
import Header from '../../../../atoms/Header/Header'
import Loader from '../../../../molecues/Loader/Loader'

export default function ConfirmAccountView() {
  const { confoirmationStatus } = useConfirmAccountView()
  const [t] = useTranslation()

  return (
    <>
      <Col className="bring-in-anim" xs={{ span: 24, offset: 0 }} md={{ span: 12, offset: 6 }} xl={{ span: 8, offset: 8 }}>
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center', alignContent: 'center', marginBottom: '24px' }}>
          {confoirmationStatus === 'LOADING' && (
            <Col className="bring-in-anim" span={24}>
              <Row justify={'center'}>
                <Header style={{ textAlign: 'center' }} className="gradient-text">
                  {t('account-confirmation-waiting.title')}
                </Header>
              </Row>
              <Row justify={'center'}>
                <Text style={{ textAlign: 'center' }}>{t('account-confirmation-waiting.text')}</Text>
              </Row>
              <Loader />
            </Col>
          )}

          {confoirmationStatus === 'SUCCESS' && (
            <Col className="bring-in-anim" span={24}>
              <Row justify={'center'}>
                <Header style={{ textAlign: 'center' }} className="gradient-text">
                  {t('account-confirmation-success.title')}
                </Header>
              </Row>
              <Row justify={'center'}>
                <Text style={{ textAlign: 'center' }}>{t('account-confirmation-success.text')}</Text>
              </Row>
            </Col>
          )}

          {confoirmationStatus === 'FAILURE' && (
            <Col className="bring-in-anim" span={24}>
              <Row justify={'center'}>
                <Header style={{ textAlign: 'center' }} className="gradient-text">
                  {t('account-confirmation-error.title')}
                </Header>
              </Row>
              <Row justify={'center'}>
                <Text style={{ textAlign: 'center' }}>{t('account-confirmation-error.text')}</Text>
              </Row>
            </Col>
          )}
        </Space>
      </Col>
    </>
  )
}
