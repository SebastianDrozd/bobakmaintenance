const {default : axios, get} = require('axios');
const BASE = "http://sebastian.bobak.local:5159/api/logs";

const getLogsQuery  = async (page,pageSize,searchTerm,type,action) => {
    const response = await axios.get(`${BASE}/query?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&type=${type}&action=${action}`,{
        withCredentials : true
    })
    return response.data;
}


module.exports = {
    getLogsQuery
}
