import { Bike } from './Bike'

// Rent model
export interface Rent {
  id: number
  velo: Bike
  rentStart: Date
  rentEnd: Date
}
