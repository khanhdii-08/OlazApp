import { httpRequest } from './../utils/httpRequest';


export const apiConversations = {
    getList: async (name : string, type: number = 0) => {
        return await httpRequest.get('/conversations', {
            params: {
                name: name ? name : '',
                type,
            },
        });
    },
};
