import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col, Tabs, Button } from 'antd'
import InputButon from '../components/InputButon'
import { Bike } from '../models/Bike'
import BikeList from '../components/BikeList'
import CardBike from '../components/CardBike'
import DeleteModal from '../components/DeleteModal'
import Container from '../components/Container'
import RentCalendar from '../components/RentCalendar'
import { useAppSelector, useAppDispatch } from '../hook'
import { addBike, updateBike, deleteBike } from '../store/bikeReducer'
const { TabPane } = Tabs

const Home = () => {
  const [editingBike, setEditingBike] = useState<Bike | null>(null)
  const [bikeToDelete, setBikeToDelete] = useState<Bike | null>(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const bikes = useAppSelector((state) => state.bike.bike)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // Function to add a bike to the list
  const addBikeOnList = (
    id: number | undefined,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ): boolean => {
    if (
      model === '' ||
      type === '' ||
      color === '' ||
      wheelSize === 0 ||
      price === 0 ||
      description === ''
    ) {
      return false
    }

    // Create a new bike
    const newBike: Bike = {
      id: bikes.length + 1,
      model,
      type,
      color,
      wheelSize,
      price,
      description,
      rents: [],
    }

    dispatch(addBike(newBike))
    return true
  }

  // Function to update a bike on the list
  const updateBikeOnList = (
    id: number,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ): boolean => {
    const updatedBike: Bike = {
      id,
      model,
      type,
      color,
      wheelSize,
      price,
      description,
      rents: [],
    }

    dispatch(updateBike(updatedBike))
    setEditingBike(null)
    return true
  }

  // Function to confirm the deletion of a bike
  const confirmDeleteBike = () => {
    if (bikeToDelete) {
      dispatch(deleteBike(bikeToDelete.id))
      setBikeToDelete(null)
    }
  }

  const viewBikeDetails = (bikeId: number) => {
    navigate(`/bike/${bikeId}`)
  }

  // Display the list of bikes and a calendar of rents
  return (
    <Container>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Liste des vélos" key="1" style={{ marginTop: 16 }}>
              <InputButon
                onButtonClick={editingBike ? updateBikeOnList : addBikeOnList}
                initialValues={editingBike}
                drawerVisible={drawerVisible}
                setDrawerVisible={setDrawerVisible}
              />
              <BikeList
                bikes={bikes}
                renderItem={(bike) => (
                  <CardBike
                    bike={bike}
                    key={bike.id}
                    onEdit={() => {
                      setEditingBike(bike)
                      setDrawerVisible(true)
                    }}
                    onDelete={() => setBikeToDelete(bike)}
                    onViewDetails={() => viewBikeDetails(bike.id)}
                  />
                )}
              />
            </TabPane>
            <TabPane tab="Calendrier des locations" key="2">
              <RentCalendar />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      {bikeToDelete && (
        <DeleteModal
          visible={true}
          onConfirm={confirmDeleteBike}
          onCancel={() => setBikeToDelete(null)}
        />
      )}
    </Container>
  )
}

export default Home
