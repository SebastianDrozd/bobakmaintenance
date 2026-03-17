const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/auth";

const loginUser = async (login) => {
    try{
        const response = await axios.post(BASE ,login,{
            withCredentials : true
        });
        return response.data;
    }catch(err){
    }
}

const getUser = async () => {
 
        const response = await axios.get(BASE + `/me`, {
            withCredentials : true,
            
        });
        return response.data;
}




module.exports = {
    loginUser,
    getUser
}