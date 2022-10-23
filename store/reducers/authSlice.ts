
import { createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import { RootState } from "../../store";
import httpRequest from "../../utils/httpRequest";


const NAME = 'login'

export interface User {
  username: string,
  password: string,
  _id: string,
  isLogin: boolean,
  token: string,
  isRegister: boolean,
}

export interface InitialState {
  user : User;
}

const initialState: InitialState = {
  user : {
    username: '',
    password: '',
    _id: '',
    isLogin: false,
    token: '',
    isRegister: false,
  }
};

export const fetchLogin = createAsyncThunk(`${NAME}/fetchLogin`, async (data : {username :string, password : string}) => {
  try {
    const res = await httpRequest.post("auth/login", data, { withCredentials: true })
    return res.data;
  } catch (error) {
    console.log(error)
  }
})

const authSlice = createSlice({
    name: NAME,
    initialState,  
    reducers: {
     
    },
    extraReducers: (builder) => {
      ///////// Longin ////////
      builder.addCase(fetchLogin.pending, (state, action) => {
        
      })
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        // console.log(action.payload.token)
        if(action.payload){
          state.user.token = action.payload.token;
          state.user.isLogin = true;
        }
      })  
      builder.addCase(fetchLogin.rejected, (state, action) => {
        
      })
    }
})


const authReducer = authSlice.reducer;

export const authSelector = (state: RootState) => state.authReducer.user;

export default authReducer;