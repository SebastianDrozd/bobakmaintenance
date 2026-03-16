const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/auth/";

const loginUser = async (login) => {
    try{
        const response = await axios.post(BASE ,login);
        return response.data;
    }catch(err){
    }
}

const getUser = async () => {
    try{
        const response = await axios.get(BASE + `me`);
        return response.data;
    }catch(err){

    }
}




module.exports = {
    loginUser,
    getUser
}