import { Col, Flex, Row } from 'antd'
import React from 'react'

interface ContianerPorps {
  children: React.ReactNode
}

const Contianer = ({ children }: ContianerPorps) => {
  // Return a container for all contents on pages with the children
  return (
    <Row style={{ maxWidth: '1200ox', marginInline: 'auto' }}>
      <Col span={24}>
        <Col span={20} offset={2} style={{ marginTop: '50px' }}>
          {children}
        </Col>
      </Col>
    </Row>
  )
}

export default Contianer
