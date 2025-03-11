import { PropsWithChildren } from 'react'
import { Layout, Menu, theme, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import './AdminAppLayout.style.scss'
import Header from '../../../../atoms/Header/Header'
import Select from '../../../../atoms/Select/Select'
import { Button } from '../../../../atoms'
import useAppLayout from './useAdminAppLayout'

const { Header: AntHeader, Content, Footer, Sider } = Layout

export default function AdminAppLayout({ children }: PropsWithChildren<{}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const { t } = useTranslation()

  const { sideBarItems, handleLogout } = useAppLayout()

  return (
    <Row className="app-layout">
      <Layout style={{ width: '100%' }}>
        <AntHeader style={{ padding: '0px 24px' }}>
          <Row style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
            <Col>
              <Header>Modular App</Header>
            </Col>
            <Col>
              <Select />
              <Button color="primary" onClick={handleLogout} htmlType="button">
                {t('basic-layout.logout-button')}
              </Button>
            </Col>
          </Row>
        </AntHeader>
        <Content style={{ padding: '24px 24px' }}>
          <Layout style={{ padding: '24px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
            <Sider style={{ background: colorBgContainer }} width={200}>
              <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }} items={sideBarItems} />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: '70vh' }}>
              Content
              {children}
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Modular app ©{new Date().getFullYear()} Created by Code Artist</Footer>
      </Layout>
    </Row>
  )
}
