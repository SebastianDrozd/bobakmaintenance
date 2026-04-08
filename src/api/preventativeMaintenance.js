const {default : axios} = require('axios');
const BASE = "http://sebastian.bobak.local:5159/api/PreventativeMaintenance/templates";


const createNewPmTemplate = async (pmTask) => {
    const response = await axios.post(BASE,pmTask,{
        withCredentials : true
    })
    return response.data;
}

const getShortPmTemplates = async () => {
    const response = await axios.get(`${BASE}/short`,{
        withCredentials : true
    })
    return response.data;
}

const getPmTemplateById = async (id) => {
    console.log(`${BASE}/${id}`)
    const response = await axios.get(`${BASE}/${id}`,{
        withCredentials : true
    })
    return response.data;
}

const updatePmTemplate = async (id, updateRequest) => {
    const response = await axios.put(`${BASE}/${id}`, updateRequest, {
        withCredentials : true
    })
    return response.data;
}

const deletePmTemplate = async (id) => {
    const response = await  axios.delete(`${BASE}/${id}`, {
        withCredentials : true
    })
    return response.data;
}

const getShortPmTemplatesQuery = async (page, pageSize, searchTerm,frequency) => {
    const response = await axios.get(`${BASE}/short/query?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&frequency=${frequency}`, {
        withCredentials : true
    })
    return response.data;
}


module.exports = {
    createNewPmTemplate,
    getShortPmTemplates,
    getPmTemplateById,
    updatePmTemplate,
    deletePmTemplate,
    getShortPmTemplatesQuery
}