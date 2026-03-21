const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/WorkOrders";

const saveWorkOrder = async (wo) => {
    const response =await  axios.post(BASE,wo,{
        withCredentials:true
    })
    return response.data;
}

const closeWorkOrder = async (wo,id) => {
    console.log(wo,id)
    const response = await axios.put(`${BASE}/close/${id}`,wo,{
        withCredentials : true
    })
    return response.data;
} 

const getWorkOrderById = async (id) => {
    const response = await axios.get(`${BASE}/${id}`,{
        withCredentials : true
    })
    return response.data;
}

const getWorkOrders = async (id) => {
    const response = await axios.get(BASE);
    return response.data
}

const getWorkOrdersQuery = async (sortBy) => {
    console.log("this is sortby",sortBy)
    console.log(`${BASE}/query?sortBy=${sortBy}`)
    const response = await axios.get(`${BASE}/query?sortBy=${sortBy}`)
    return response.data;
}

module.exports = {
    saveWorkOrder,
    getWorkOrderById,
    getWorkOrders,
    closeWorkOrder,
    getWorkOrdersQuery
}