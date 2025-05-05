import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Bike } from '../models/Bike'

export interface BikeState {
  bike: Bike[]
}

const initialState: BikeState = {
  bike: [],
}

export const bikeSlice = createSlice({
  name: 'bike',
  initialState,
  reducers: {
    addBike: (state, action: PayloadAction<Bike>) => {
      state.bike.push(action.payload)
    },
    updateBike: (state, action: PayloadAction<Bike>) => {
      state.bike = state.bike.map((bike) =>
        bike.id === action.payload.id ? action.payload : bike
      )
    },
    deleteBike: (state, action: PayloadAction<number>) => {
      state.bike = state.bike.filter((bike) => bike.id !== action.payload)
    },
  },
})

export const { addBike, updateBike, deleteBike } = bikeSlice.actions

export default bikeSlice.reducer
