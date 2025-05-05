import { List, Card } from 'antd'
import { Rent } from '../models/Rent'

interface RentListProps {
  title: string
  rents: Rent[]
}

const RentList = ({ title, rents }: RentListProps) => {
  // Return a list of rents
  return (
    <>
      <h2>{title}</h2>
      <List
        dataSource={rents}
        renderItem={(rent: Rent) => (
          <List.Item>
            <Card style={{ width: '100%' }} title={`Location ${rent.id}`}>
              <p>Début: {new Date(rent.rentStart).toLocaleDateString()}</p>
              <p>Fin: {new Date(rent.rentEnd).toLocaleDateString()}</p>
            </Card>
          </List.Item>
        )}
      />
    </>
  )
}

export default RentList
