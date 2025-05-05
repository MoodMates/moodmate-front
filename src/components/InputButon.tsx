import { useState, useEffect } from 'react'
import { Button, Drawer, Form, Input, notification } from 'antd'
import type { FormProps } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { Bike } from '../models/Bike'
import { PlusOutlined } from '@ant-design/icons'

interface InputButtonProps {
  onButtonClick: (
    id: number,
    model: string,
    type: string,
    color: string,
    wheelSize: number,
    price: number,
    description: string
  ) => boolean
  initialValues?: Bike | null
  drawerVisible: boolean
  setDrawerVisible: (visible: boolean) => void
}

type FieldType = {
  model?: string
  type?: string
  color?: string
  wheelSize?: number
  price?: number
  description?: string
}

// Component to add or update a bike
const InputButton = ({
  onButtonClick,
  initialValues,
  drawerVisible,
  setDrawerVisible,
}: InputButtonProps) => {
  const [isLoading, setisLoading] = useState(false)
  const [form] = Form.useForm()

  // Set the initial values of the form
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues, form])

  // Function to clean the fields of the form
  const cleanField = () => {
    form.resetFields()
  }

  // Function to add or update a bike
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setisLoading(true)

    // Add or update a bike
    const result = onButtonClick(
      initialValues?.id ?? 0,
      String(values.model),
      String(values.type),
      String(values.color),
      Number(values.wheelSize),
      Number(values.price),
      String(values.description)
    )

    // Check if the bike has been added or updated
    if (result === true) {
      setisLoading(false)
      cleanField()
      setDrawerVisible(false)
      notification.success({
        message: 'Succès',
        description: initialValues
          ? 'Le vélo a été mis à jour avec succès.'
          : 'Le vélo a été ajouté avec succès.',
      })
    }
  }

  return (
    // Return a button to open a drawer to add or update a bike
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setDrawerVisible(true)}
        style={{ marginBottom: '16px' }}
      >
        {initialValues ? 'Mettre à jour un vélo' : 'Ajouter un vélo'}
      </Button>
      <Drawer
        title={initialValues ? 'Mettre à jour le vélo' : 'Ajouter un vélo'}
        width={360}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        style={{ paddingBottom: 80 }}
      >
        <Form
          initialValues={{ remember: true }}
          onFinish={onFinish}
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="Modèle du vélo"
            name="model"
            rules={[{ required: true, message: 'Ajoutez un modèle de vélo' }]}
          >
            <Input placeholder="Enter the model of bike" type="text" />
          </Form.Item>
          <Form.Item
            label="Type de vélo"
            name="type"
            rules={[{ required: true, message: 'Ajoutez un type de vélo' }]}
          >
            <Input placeholder="Enter the type of bike" type="text" />
          </Form.Item>
          <Form.Item
            label="Couleur"
            name="color"
            rules={[{ required: true, message: 'Ajoutez une couleur au vélo' }]}
          >
            <Input placeholder="Enter the color of bike" type="text" />
          </Form.Item>
          <Form.Item
            label="Taille de roue"
            name="wheelSize"
            rules={[
              {
                required: true,
                message: 'Ajoutez une taille de roue à votre vélo',
              },
            ]}
          >
            <Input placeholder="Enter the wheel size of bike" type="number" />
          </Form.Item>
          <Form.Item
            label="Prix"
            name="price"
            rules={[
              { required: true, message: 'Ajoutez un prix à votre vélo' },
            ]}
          >
            <Input placeholder="Enter the price of bike" type="number" />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Ajoutez une description à votre vélo',
              },
            ]}
          >
            <TextArea placeholder="Enter the description of bike" />
          </Form.Item>
          <Form.Item>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              htmlType="submit"
              loading={isLoading}
              style={{ width: '100%' }}
            >
              {initialValues ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default InputButton
