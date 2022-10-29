import { RootState } from './../index';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFriend } from '../../service/friendService';


export interface Friend{
    user: any,
    friends: Array<any>,
    friendInvites: Array<any>,
    friendMeInvites: Array<any>,
}

const initialState : Friend = {
    user: null,
    friends: [],
    friendInvites: [],
    friendMeInvites: [],
}

const NAME = "friend";


export const getFriends = createAsyncThunk('friend/list', async () => {
    const rs = await apiFriend.getFriends();
    return rs.data;
});

const friendSlice = createSlice({
    name : NAME,
    initialState,

    reducers : {},

    extraReducers : (builder) => {
        ////////
        builder.addCase(getFriends.pending, (action, payload) => {

        })
        builder.addCase(getFriends.fulfilled, (state, action) => {
            state.friends = action.payload;
        })
        builder.addCase(getFriends.rejected, (action, payload) => {
            
        })


        ////////
    }


})


const friendReducer = friendSlice.reducer;

export const friendSeletor = (state : RootState) => state.friendReducer;


export default friendReducer;