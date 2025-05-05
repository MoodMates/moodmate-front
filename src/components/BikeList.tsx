import { ReactNode } from 'react'
import { Flex } from 'antd'
import { Bike } from '../models/Bike'

interface BikeListProps {
  renderItem: (bike: Bike) => ReactNode
  bikes: Bike[]
}

const BikeList = ({ renderItem, bikes }: BikeListProps) => {
  // Return a list of bikes
  return (
    <Flex vertical gap={8} style={{ width: '100%' }}>
      {bikes.map((bike) => renderItem(bike))}
    </Flex>
  )
}

export default BikeList
