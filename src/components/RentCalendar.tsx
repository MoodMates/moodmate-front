import { Calendar, Badge, List } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../hook'
import dayjs from 'dayjs'

const RentCalendar = () => {
  const navigate = useNavigate()
  const bikes = useAppSelector((state) => state.bike.bike)

  const getListData = (date: dayjs.Dayjs) => {
    const listData: { type: string; content: string; bikeId: number }[] = []

    bikes.forEach((bike) => {
      bike.rents.forEach((rent) => {
        const rentStart = dayjs(rent.rentStart)
        const rentEnd = dayjs(rent.rentEnd)

        // Check if the current date is the start date of a rent
        if (rentStart.isSame(date, 'day')) {
          listData.push({
            type: 'success',
            content: `Début location - ${bike.model}`,
            bikeId: bike.id,
          })
        }

        // Check if the current date is the end date of a rent
        if (rentEnd.isSame(date, 'day')) {
          listData.push({
            type: 'error',
            content: `Fin location - ${bike.model}`,
            bikeId: bike.id,
          })
        }
      })
    })

    return listData
  }

  const dateCellRender = (date: dayjs.Dayjs) => {
    // Get the list of data for the current date
    const listData = getListData(date)
    return (
      <List
        dataSource={listData}
        renderItem={(item) => (
          <List.Item onClick={() => navigate(`/bike/${item.bikeId}`)}>
            <Badge status={item.type as any} text={item.content} />
          </List.Item>
        )}
      />
    )
  }

  return <Calendar cellRender={dateCellRender} />
}

export default RentCalendar
