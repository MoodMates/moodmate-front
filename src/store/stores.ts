import { configureStore } from '@reduxjs/toolkit'
import { count } from 'console'
import bikeReducer from './bikeReducer'

const store = configureStore({
  reducer: {
    bike: bikeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

export default store
