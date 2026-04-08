const {default : axios} = require('axios');
const BASE = "http://sebastian.bobak.local:5159/api/mechanics";

const getAllMechanics = async () => {
    const response = await axios.get(BASE,{
        withCredentials: true
    })
    return response.data;
}

const createMechanic = async (data) => {
    const response = await axios.post(BASE,data,{
        withCredentials : true
    })
    return response.data
}

const getAllMechanicsFull = async () => {
    const response = await axios.get(`${BASE}/full`,{
        withCredentials : true
    })
    return response.data
}


module.exports = {
    getAllMechanics,
    createMechanic,
    getAllMechanicsFull
}