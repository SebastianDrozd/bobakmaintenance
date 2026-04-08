const {default : axios} = require('axios');
const BASE = "http://sebastian.bobak.local:5159/api/Pdf";

const generateWorkOrderPdf = async (id) => {
    return await axios.get(`${BASE}/workorder/${id}`,{
    responseType: "blob",
    withCredentials: true,
  })
}

module.exports = {
    generateWorkOrderPdf
}