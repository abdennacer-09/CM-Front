import axios from 'axios';

export default () => {
    return axios.create({
        //baseURL: `http://backend.storeino.info`,
        baseURL: `http://localhost:5000`,
        //var url ='backend.storeino.info'
        //var url ='localhost:5000';
        withCredentials : false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
}