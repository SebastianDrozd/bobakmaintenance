const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/PreventativeMaintenance/templates";


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


module.exports = {
    createNewPmTemplate,
    getShortPmTemplates
}