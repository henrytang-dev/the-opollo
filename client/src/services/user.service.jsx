import axios from 'axios'
import authHeader from './auth-header'

const API_URL = `${VITE_ENDPOINT}`

class UserService {
    getPublicContent () {
        return axios.get(API_URL)
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() })
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() })
    }
}

export default new UserService()

// service for accessing data
// we add an HTTP header witht he help of authHeader() function when requesting authorized resource