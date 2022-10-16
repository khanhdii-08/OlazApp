import { httpRequest } from './../utils/httpRequest';
export const conversations = async () => {
    try {
        const res = await httpRequest.get("conversations")
        return res.data;
    } catch (error) {
        console.log(error);
    }
}


// import httpRequest from "../utils/httpRequest";

// export const login = async (username : string, password : string ) => {
//     try {
//         const res = await httpRequest.post("auth/login", { username, password }, { withCredentials: true })
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
    
// }