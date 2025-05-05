import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../components/Container'
import BikeDescription from '../components/BikeDescription'
import RentList from '../components/RentList'
import RentDrawer from '../components/RentDrawer'
import { Button } from 'antd'
import { Rent } from '../models/Rent'
import { useAppSelector, useAppDispatch } from '../hook'
import { addRent } from '../store/rentReducer'
import { updateBike } from '../store/bikeReducer'

const BikeDetails = () => {
  const { id } = useParams<{ id: string }>()
  const bike = useAppSelector((state) =>
    state.bike.bike.find((bike) => bike.id === Number(id))
  )
  const dispatch = useAppDispatch()
  const [isModalVisible, setIsModalVisible] = useState(false)

  if (!bike) {
    return <p>Vélo non trouvé</p>
  }

  // Function to add a rent to a bike
  const addRentToBike = (newRent: Rent) => {
    const updatedBike = {
      ...bike,
      rents: [...bike.rents, newRent],
    }
    dispatch(updateBike(updatedBike))
    dispatch(addRent(newRent))
    setIsModalVisible(false)
  }

  // Filter locations that are upcoming (after the current date)
  const upcomingRents = bike.rents.filter(
    (rent) => new Date(rent.rentStart) > new Date()
  )

  // Filter locations that are past (before the current date)
  const pastRents = bike.rents.filter(
    (rent) => new Date(rent.rentStart) <= new Date()
  )

  return (
    // Display the bike's details, a button to create a rent, and lists of upcoming and past rents
    <Container>
      <BikeDescription bike={bike} />
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Créer une location
      </Button>
      <RentList title="Prochaines locations" rents={upcomingRents} />
      <RentList title="Locations passées" rents={pastRents} />
      <RentDrawer
        visible={isModalVisible}
        onCreate={addRentToBike}
        onCancel={() => setIsModalVisible(false)}
        bike={bike}
      />
    </Container>
  )
}

export default BikeDetails
