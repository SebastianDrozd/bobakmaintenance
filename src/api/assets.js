const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/assets";


const getAssets = async () => {
    const response = await axios.get(BASE , {
               withCredentials : true,
           });
           return response.data;
}
const getFullAssets = async () => {
    const response = await axios.get(`${BASE}/full` , {
               withCredentials : true,
           });
           return response.data;
}

const getAssetsQuery= async ( page, pageSize,sortBy,sortDirection) => {
    const response = await axios.get(`${BASE}/query?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`, {
        withCredentials: true
    });
    return response.data;
}

module.exports = {
    getAssets,
    getFullAssets,
    getAssetsQuery
}