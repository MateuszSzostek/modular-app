import { PropsWithChildren } from 'react'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons'
import { Layout, Menu, theme, MenuProps, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import './AdminAppLayout.style.scss'
import React from 'react'
import Header from '../../../../atoms/Header/Header'
import Select from '../../../../atoms/Select/Select'
import { Button } from '../../../../atoms'
import useAppLayout from './useAdminAppLayout'

const { Header: AntHeader, Content, Footer, Sider } = Layout

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1)

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1
      return {
        key: subKey,
        label: `option${subKey}`,
      }
    }),
  }
})

export default function AdminAppLayout({ children }: PropsWithChildren<{}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const { t } = useTranslation()

  const { handleLogout } = useAppLayout()

  return (
    <Row className="app-layout">
      <Col span={24}>
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
                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }} items={items2} />
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: '70vh' }}>
                Content
                {children}
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Modular app ©{new Date().getFullYear()} Created by Code Artist</Footer>
        </Layout>
      </Col>
    </Row>
  )
}
