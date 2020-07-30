import axios from 'axios';

export const axiosWithAuth = () => {
    return axios.create({
        // axios. create() function creates a new Axios instance. When you require('axios') , you get back an the default Axios instance. The reason why you would create an instance is to set custom defaults for your application.
        
        baseURL: `https://lambda-sprout.herokuapp.com/api`,
        headers: {
            token: localStorage.getItem('token')
        }
    });
};



