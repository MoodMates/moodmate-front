import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Rent } from '../models/Rent'

export interface RentState {
  rents: Rent[]
}

const initialState: RentState = {
  rents: [],
}

export const rentSlice = createSlice({
  name: 'rent',
  initialState,
  reducers: {
    addRent: (state, action: PayloadAction<Rent>) => {
      state.rents.push(action.payload)
    },
  },
})

export const { addRent } = rentSlice.actions

export default rentSlice.reducer
