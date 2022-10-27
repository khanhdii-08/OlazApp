import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../store";
import { apiConversations } from '../../service/conversationService';
// import { conversations } from '../../service/conversationService';

const NAME = "conversation"

export interface Conversation {
    isLoading: boolean,
    conversationId: string,
    conversations: Array<any>,
    conversation: any,
}

const initialState: Conversation = {
    isLoading: false,
    conversationId: '',
    conversations: [],
    conversation: {},
}
  
export const getConversations = createAsyncThunk(`${NAME}/getList`, async ({name , type } : {name : string; type : number}) => {
    const response = await apiConversations.getConversations(name ? name : '', type = 0);
    return response.data;
});


const conversationSlice = createSlice({
    name: NAME,
    initialState,
    reducers: {
        setCurrentConversation: (state, action) => {
            state.conversationId = action.payload._id;
            state.conversation = action.payload;

        },

        resetConversationSlice: (state, action) => {
            Object.assign(state, initialState); 
          },
    },
    extraReducers: (builder) => {
        builder.addCase(getConversations.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getConversations.fulfilled, (state, action) => {
            state.conversations = action.payload
            state.isLoading = false;
        })
        builder.addCase(getConversations.rejected, (state, action) => {
        
        })
    },
});

const conversationReducer = conversationSlice.reducer;

export const conversationSelector = (state: RootState) => state.conversationReducer;

export const { setCurrentConversation, resetConversationSlice } = conversationSlice.actions

export default conversationReducer;