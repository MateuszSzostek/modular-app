import { Layout } from 'antd'
import './LandingLayout.style.scss'
import { Outlet } from 'react-router-dom'

const { Header, Content } = Layout

export default function LandingLayout() {
  return (
    <div className="landing-layout-wrapper">
      <Layout className="landing-layout">
        <Header className="landing-layout__header"></Header>
        <Content className="landing-layout__content">
          <Outlet />
        </Content>
      </Layout>
    </div>
  )
}
