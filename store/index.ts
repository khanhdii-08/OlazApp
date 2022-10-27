import {configureStore } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import authReducer from "./reducers/authSlice"
import conversationReducer from "./reducers/conversationSlice"
import messageReducer from "./reducers/messageSlice"
import userReducer from "./reducers/userSlice"


const store = configureStore({
    reducer: {
      authReducer,
      conversationReducer,
      messageReducer,
      userReducer
    },
  })


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store;