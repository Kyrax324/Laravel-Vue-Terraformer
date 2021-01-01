import axios from 'axios';

const userApi = {
	
	getUserInfo(id, payload){
        return axios.get("/user/info/"+id, {params: payload})
    },
    getUserList(payload){
        return axios.get("/user/list", {params: payload})
    },
    createUser(payload){
        return axios.post("/user/create", payload)
    },
    updateUser(payload){
        return axios.patch("/user/update", payload)
    },
    archiveUser(payload){
        return axios.delete("/user/archive", {params: payload})
    },

}

export default userApi;