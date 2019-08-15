import axios from 'axios'

const instance = axios.create({
    baseURL : 'https://burguer-builder-94096.firebaseio.com/'
})

export default instance