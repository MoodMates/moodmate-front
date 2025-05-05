import { Avatar, Dropdown, MenuProps, Space, Typography } from 'antd'

const { Text } = Typography

const RightHeader = () => {
  const items: MenuProps['items'] = [
    {
      key: 2,
      label: <Text>Déconnexion</Text>,
      onClick: () => {},
    },
  ]

  return (
    <Space>
      <Dropdown menu={{ items }} placement="bottomLeft" arrow>
        <Avatar
          style={{
            color: 'black',
            backgroundColor: 'white',
            cursor: 'pointer',
          }}
        >
          {'LA'}
        </Avatar>
      </Dropdown>
    </Space>
  )
}

export default RightHeader
