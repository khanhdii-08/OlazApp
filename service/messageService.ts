import { httpRequest } from './../utils/httpRequest';
export const messages = async (conversationId : string) => {
    try {
        const res = await httpRequest.get(`messages/${conversationId}`)
        // console.log("data : ", res.data)
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


export const addText = async (conversationId: string, content : string, type: "TEXT" | 'HTML'| 'NOTIFY'| 'STICKER'= "TEXT" ) => {
    try {
        const res = await httpRequest.post("messages/text", {conversationId, content, type}, {withCredentials : true})
    } catch (error) {
        console.log(error);
        
    }
}