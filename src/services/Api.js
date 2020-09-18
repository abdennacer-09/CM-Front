import axios from 'axios';

export default () => {
    return axios.create({
        //baseURL: `http://localhost:5000/posts`
        baseURL: `http://backend.storeino.info/posts`

        //var url ='backend.storeino.info'
        //var url ='localhost:5000';
    })
}