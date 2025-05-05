import { Rent } from './Rent'

// Bike model
export interface Bike {
  id: number
  model: string
  type: string
  color: string
  wheelSize: number
  price: number
  description: string
  rents: Rent[]
}
