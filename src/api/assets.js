const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/assets";


const getAssets = async() => {
    const response = await axios.get(BASE + {
               withCredentials : true,
           });
           return response.data;
}

module.exports = {
    getAssets
}