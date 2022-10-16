
import httpRequest from "../utils/httpRequest";

export const login = async (username : string, password : string ) => {
    try {
        const res = await httpRequest.post("auth/login", { username, password }, { withCredentials: true })
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
}

// export default authService

