import { Button, Card, Row, Col } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Bike } from '../models/Bike'

interface CardBikeProps {
  bike: Bike
  onEdit: () => void
  onDelete: () => void
  onViewDetails: () => void
}

const CardBike = ({ bike, onEdit, onDelete, onViewDetails }: CardBikeProps) => {
  // Return a card displaying the bike's details
  return (
    <Card title={bike.model} key={bike.id} style={{ width: '100%' }}>
      <Row gutter={[12, 12]}>
        <Col span={20}>
          <p>Type: {bike.type}</p>
          <p>Couleur: {bike.color}</p>
          <p>Taille de la roue: {bike.wheelSize}</p>
          <p>Prix: {bike.price} €</p>
          <p>Description: {bike.description}</p>
        </Col>
        <Col
          span={4}
          style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <Button icon={<EditOutlined />} onClick={onEdit}>
            Editer
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={onDelete}>
            Supprimer
          </Button>
          <Link to={`/bike/${bike.id}`}>
            <Button
              icon={<EyeOutlined />}
              type="primary"
              onClick={onViewDetails}
              style={{ width: '100%' }}
            >
              Voir les détails
            </Button>
          </Link>
        </Col>
      </Row>
    </Card>
  )
}

export default CardBike
