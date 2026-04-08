const {default : axios, get} = require('axios');
const BASE = "http://sebastian.bobak.local:5159/api/logs";

const getLogs  = async () => {
    const response = await axios.get(BASE,{
        withCredentials : true
    })
    return response.data;
}


module.exports = {
    getLogs
}
