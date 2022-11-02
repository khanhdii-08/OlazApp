import { apiMessage } from "./../../service/messageService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ParamsApi } from "../../components/ChatRoomItem/ChatRoomItem";

export interface Message {
  isLoading: boolean;
  chatting: Object;
  messages: any;
  error: boolean;
  members: Array<Object>;
}

const initialState: Message = {
  isLoading: false,
  chatting: {},
  messages: [],
  error: false,
  members: [],
};

const NAME = "message";

const getUniqueListBy = (arr: Array<any>, key: string) => {
  return [...new Map(arr.map((item) => [item[key], item])).values()];
};

export const getMessages = createAsyncThunk(
  `${NAME}`,
  async (params: { conversationId: string; paramsApi: ParamsApi }) => {
    const { conversationId, paramsApi } = params;

    const res = await apiMessage.getMessages(conversationId, paramsApi);
    return res.data;
  }
);

export const sendMessage = createAsyncThunk(
  "message/sended",
  async (data: { conversationId: string; content: string; type: string }) => {
    const response = await apiMessage.sendText(data);
    return response.data;
  }
);

const messageSlice = createSlice({
  name: NAME,
  initialState,
  reducers: {
    rerenderMessage(state, action) {
      state.messages.data = [...state.messages.data, action.payload];
    },

    resetMessageSlice: (state, action) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      if (state.messages.length === 0) {
        state.messages = action.payload;
      } else {
        const temp = [...action.payload.data, ...state.messages.data];
        state.messages.data = getUniqueListBy(temp, "_id");
      }
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.error = true;
    });

    ////////////
    builder.addCase(sendMessage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.messages.data = [...state.messages.data, action.payload];
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.error = true;
    });
  },
});

const messageReducer = messageSlice.reducer;

export const messageSelector = (state: RootState) => state.messageReducer;

export const { rerenderMessage, resetMessageSlice } = messageSlice.actions;

export default messageReducer;
