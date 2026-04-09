const {default : axios} = require('axios');
const BASE = "http://sebastian.bobak.local:5159/api/auth";

const loginUser = async (login) => {
        const response = await axios.post(BASE ,login,{
            withCredentials : true
        });
        return response.data;
}

const logoutUser = async () => {
        const response = await axios.post(BASE + "/logout",{},{
            withCredentials : true
        });
        return response.data;
}

const getUser = async () => {
        const response = await axios.get(BASE + `/me`, {
            withCredentials : true,
        });
        return response.data;
}

module.exports = {
    loginUser,
    getUser,
    logoutUser
}