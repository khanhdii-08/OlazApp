import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { apiConversations } from "../../service/conversationService";
import dateUtils from "../../utils/dateUtils";
// import { conversations } from '../../service/conversationService';

const NAME = "conversation";

export interface Conversation {
  isLoading: boolean;
  conversationId: string;
  toTalUnread: number;
  conversations: Array<any>;
  conversation: any;
}

const initialState: Conversation = {
  isLoading: false,
  conversationId: "",
  toTalUnread: 0,
  conversations: [],
  conversation: {},
};

const getUniqueListBy = (arr: Array<any>, key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const getConversations = createAsyncThunk(
  `${NAME}/getList`,
  async ({ name, type }: { name: string; type: number }) => {
    const response = await apiConversations.getConversations(
      name ? name : "",
      (type = 0)
    );
    return response.data;
  }
);

export const getConversationById = createAsyncThunk(
  `${NAME}/getConversationById`,
  async (id: string) => {
    const response = await apiConversations.getConversationById(id);
    return response.data;
  }
);

const conversationSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    setCurrentConversation: (state, action) => {
      state.conversationId = action.payload._id;
      state.conversation = action.payload;
    },

    setToTalUnread: (state, action) => {
      let tempCount = 0;
      state.conversations.forEach((ele, index) => {
        if (ele.numberUnread > 0) tempCount += 1;
      });
      state.toTalUnread = tempCount;
    },

    setLastMessageInConversation: (state, action) => {
      const { conversationId, message } = action.payload;
      const index = state.conversations.findIndex(
        (conversation) => conversation._id === conversationId
      );

      const searchConversation = state.conversations[index];

      searchConversation.numberUnread = searchConversation.numberUnread + 1;
      searchConversation.lastMessage = {
        ...message,
        createdAt: dateUtils.toTime(message.createdAt),
      };
      if (conversationId === state.conversationId)
        searchConversation.numberUnread = 0;
      const conversationTempt = state.conversations.filter(
        (conversation) => conversation._id !== conversationId
      );
      state.conversations = [searchConversation, ...conversationTempt];
    },

    resetConversationSlice: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    ///////////
    builder.addCase(getConversations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getConversations.fulfilled, (state, action) => {
      state.conversations = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getConversations.rejected, (state, action) => {});

    ////////

    builder.addCase(getConversationById.fulfilled, (state, action) => {
      state.conversations = [action.payload, ...state.conversations];
    });
  },
});

const conversationReducer = conversationSlice.reducer;

export const conversationSelector = (state: RootState) =>
  state.conversationReducer;

export const {
  setCurrentConversation,
  setLastMessageInConversation,
  resetConversationSlice,
  setToTalUnread,
} = conversationSlice.actions;

export default conversationReducer;
