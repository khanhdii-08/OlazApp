import { InitialState } from './authSlice';
import { apiMessage } from './../../service/messageService';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Message {
    isLoading : boolean,
    chatting: Object,
    messages: Array<Object>,
    error: boolean,
    members: Array<Object>,
}

const initialState : Message = {
    isLoading : false,
    chatting: {},
    messages: [],
    error: false,
    members: [],
}

const NAME = "message"

export const getMessages = createAsyncThunk(`${NAME}`,async (id : string) => {

    const res = await apiMessage.getMessages(id);
    return res.data
})


const messageSlice = createSlice({
    name : NAME,
    initialState,
    reducers :{

    },
    extraReducers : (builder) => {
        builder.addCase(getMessages.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.messages = action.payload;
        })
        builder.addCase(getMessages.rejected, (state, action) => {
            state.error = true;
        
        })
    }
})

const messageReducer = messageSlice.reducer;

export const messageSelector = (state: RootState) => state.messageReducer;

export default messageReducer;