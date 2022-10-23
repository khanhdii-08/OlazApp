import { httpRequest } from './../utils/httpRequest';

export const apiMessage = {
    getMessages: async (id : string) => {
        return await httpRequest.get(`/messages/${id}`);
    },
    sendText: async ({ conversationId, content, type = 'TEXT' } : {conversationId : string; content: string, type : string}) => {
        return await httpRequest.post(`/messages/text`, {
            conversationId,
            content,
            type,
        });
    },
};


// export const messages = async (conversationId : string) => {
//     try {
//         const res = await httpRequest.get(`messages/${conversationId}`)
//         // console.log("data : ", res.data)
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// }


// export const addText = async (conversationId: string, content : string, type: "TEXT" | 'HTML'| 'NOTIFY'| 'STICKER'= "TEXT" ) => {
//     try {
//         const res = await httpRequest.post("messages/text", {conversationId, content, type}, {withCredentials : true})
//     } catch (error) {
//         console.log(error);
        
//     }
// }