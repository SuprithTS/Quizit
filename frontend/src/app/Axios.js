import axios from 'axios'

const axoisInstance = axios.create({
    // baseURL:'http://ec2-65-2-5-95.ap-south-1.compute.amazonaws.com:9000/api'
    baseURL:'https://iicbackend.onrender.com/'
    //baseURL : 'http://ec2-52-66-164-57.ap-south-1.compute.amazonaws.com/'
    //baseURL : 'https://ec2-65-2-11-93.ap-south-1.compute.amazonaws.com:5000/'
});

export default axoisInstance;