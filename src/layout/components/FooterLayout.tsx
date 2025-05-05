import React from 'react'
import { Layout, Space, Typography } from 'antd'

const { Footer } = Layout
const { Text } = Typography

export const FooterLayout: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <Footer style={{ textAlign: 'center', backgroundColor: '#f8f8f2' }}>
      <Space direction="vertical">
        <Space
          direction="horizontal"
          wrap
          style={{ justifyContent: 'center' }}
        ></Space>
        <Text style={{ fontWeight: 300 }}>© {year} Dimitri Zindovic</Text>
      </Space>
    </Footer>
  )
}
