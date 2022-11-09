import { httpRequest } from "./../utils/httpRequest";

export const apiConversations = {
  getConversations: async (name: string, type: number = 0) => {
    return await httpRequest.get("/conversations", {
      params: {
        name: name ? name : "",
        type,
      },
    });
  },

  getConversationById: async (id: string) => {
    return await httpRequest.get(`/conversations/${id}`);
  },
};
