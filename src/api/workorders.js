const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/WorkOrders";

const saveWorkOrder = async (wo) => {
    const response =await  axios.post(BASE,wo,{
        withCredentials:true
    })
    return response.data;
}

const updateWorkOrder = async (wo,id ) => {
    const response = await axios.put(`${BASE}/${id}`,wo,{
        withCredentials: true
    })
    return response.data
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

const getWorkOrdersQuery = async (page,pageSize,sortBy,sortDirection,searchTerm,status,priority,type) => {
    console.log("this is sortby",sortBy)
    console.log(`${BASE}/query?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}&searchTerm=${searchTerm}&status=${status}&priority=${priority}&type=${type}`)
    const response = await axios.get(`${BASE}/query?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}&searchTerm=${searchTerm}&status=${status}&priority=${priority}&type=${type}`)
    return response.data;
}

const getDashboardStats = async () => {
    const response = await axios.get(`${BASE}/stats`,{
        withCredentials : true
    })
    return response.data;
}

module.exports = {
    saveWorkOrder,
    getWorkOrderById,
    getWorkOrders,
    closeWorkOrder,
    getWorkOrdersQuery,
    updateWorkOrder,
    getDashboardStats
}