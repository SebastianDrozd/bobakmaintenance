const {default : axios} = require('axios');
const BASE = "http://localhost:5159/api/mechanics";

const getAllMechanics = async () => {
    const response = await axios.get(BASE,{
        withCredentials: true
    })
    return response.data;
}


export default getAllMechanics;