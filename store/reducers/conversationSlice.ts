import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../store";
import { apiConversations } from '../../service/conversationService';
// import { conversations } from '../../service/conversationService';

const NAME = "conversation"

export interface Conversation {
    isLoading: boolean,
    currentConversation: string,
    conversations: Array<any>,
    conversation: Object,
}

const initialState: Conversation = {
    isLoading: false,
    currentConversation: '',
    conversations: [],
    conversation: {},
}
  
export const getList = createAsyncThunk(`${NAME}/getList`, async ({name , type } : {name : string; type : number}) => {
    const response = await apiConversations.getList(name ? name : '', type = 0);
    return response.data;
});


const conversationSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            state.currentConversation = action.payload._id;
            state.conversation = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getList.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getList.fulfilled, (state, action) => {
            state.conversations = action.payload
            state.isLoading = false;
        })
        builder.addCase(getList.rejected, (state, action) => {
        
        })
    },
});

const conversationReducer = conversationSlice.reducer;

export const conversationSelector = (state: RootState) => state.conversationReducer;

export const { setCurrentConversation } = conversationSlice.actions

export default conversationReducer;