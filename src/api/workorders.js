const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/WorkOrders";

const saveWorkOrder = async (wo) => {
    const response =await  axios.post(BASE,wo,{
        withCredentials:true
    })
    return response.data;
}

const getWorkOrderById = async (id) => {
    const response = await axios.get(`${BASE}/${id}`,{
        withCredentials : true
    })
    return response.data;
}

module.exports = {
    saveWorkOrder,
    getWorkOrderById
}