
import httpRequest from "../utils/httpRequest";

export const login = async (username : string, password : string ) => {
    try {
        const res = await httpRequest.post("auth/login", { username, password }, { withCredentials: true })
        return res.data;
    } catch (error) {
        console.log(error);
    }
    
}

export const registry =async (name : string, username : string, password : string) => {

    try {
        await httpRequest.post("auth/registry", {name, username, password}, {withCredentials :true})
    } catch (error) {
        console.log(error)
    }
}

export const logout =async () => {

    try {
       const res =  await httpRequest.post("auth/logout", {}, {withCredentials :true})
       console.log(res)
    } catch (error) {
        console.log(error)
    }
    
}

// export default authService

