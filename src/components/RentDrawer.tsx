import { useState } from 'react'
import { Drawer, Form, DatePicker, Button, notification } from 'antd'
import { RangePickerProps } from 'antd/es/date-picker'
import { Rent } from '../models/Rent'
import { Bike } from '../models/Bike'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useAppDispatch } from '../hook'
import { addRent } from '../store/rentReducer'

dayjs.extend(isBetween)

interface RentDrawerProps {
  visible: boolean
  onCreate: (rent: Rent) => void
  onCancel: () => void
  bike: Bike
}

const RentDrawer = ({ visible, onCreate, onCancel, bike }: RentDrawerProps) => {
  const [form] = Form.useForm()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Check if the current date is between the start and end date of a rent
    return bike.rents.some((rent) => {
      const rentStart = dayjs(rent.rentStart)
      const rentEnd = dayjs(rent.rentEnd)
      return current.isBetween(rentStart, rentEnd, 'day', '[]')
    })
  }

  // Function to create a rent
  const onFinish = (values: { rentRange: [dayjs.Dayjs, dayjs.Dayjs] }) => {
    setIsLoading(true)
    const newRent: Rent = {
      id: bike.rents.length + 1,
      velo: bike,
      rentStart: values.rentRange[0].toDate(),
      rentEnd: values.rentRange[1].toDate(),
    }
    dispatch(addRent(newRent))
    onCreate(newRent)
    setIsLoading(false)
    form.resetFields()
    notification.success({
      message: 'Succès',
      description: 'La location a été créée avec succès',
    })
  }

  // Return a drawer to create a rent
  return (
    <Drawer
      title="Créer une location"
      visible={visible}
      onClose={onCancel}
      width={360}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="rentRange"
          label="Plage de dates"
          rules={[
            {
              required: true,
              message: 'Veuillez sélectionner une plage de dates',
            },
          ]}
        >
          <DatePicker.RangePicker disabledDate={disabledDate} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Créer
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default RentDrawer
