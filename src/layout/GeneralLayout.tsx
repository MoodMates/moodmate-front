import { Layout, theme } from 'antd'
import { Outlet } from 'react-router-dom'
import MainHeader from './components/MainHeader'
import { FooterLayout } from './components/FooterLayout'

const { Content } = Layout

const GeneralLayout = () => {
  const { token } = theme.useToken()

  const contentStyle: React.CSSProperties = {
    color: token.colorTextTertiary,
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MainHeader />
      <Layout>
        <Layout style={{ padding: '0 24px 24px', background: '#f8f8f2' }}>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
          <FooterLayout />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default GeneralLayout
