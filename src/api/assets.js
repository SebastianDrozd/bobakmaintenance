const {default : axios} = require('axios');
const BASE = "http://sebastian.bobak.local:5159/api/assets";


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

const getAssetsQuery= async ( page, pageSize,sortBy,sortDirection,searchTerm,status) => {
    const response = await axios.get(`${BASE}/query?page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}&searchTerm=${searchTerm}&status=${status}`, {
        withCredentials: true
    });
    return response.data;
}

const createNewAsset = async (asset) => {
    const response = await axios.post(`${BASE}`,asset,{
        withCredentials: true
    })
    return response.data;
}

const getAssetById = async (id) => {
    const response = await axios.get(`${BASE}/${id}`, {
        withCredentials: true
    })
    return response.data;
}

const updateAsset = async (id, asset) => {
    console.log("Updating asset with ID:", id, "and data:", asset);
    const response = await axios.put(`${BASE}/${id}`, asset, {
        withCredentials: true
    })
    return response.data;
}

module.exports = {
    getAssets,
    getFullAssets,
    getAssetsQuery,
    createNewAsset,
    getAssetById,
    updateAsset
}