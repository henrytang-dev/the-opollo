import axios from "axios"

const API_URL = `${VITE_ENDPOINT}`

// this service uses Axios for HTTP requests and the window's local storage for user information and JWT

// login(): POST {username, password} & save JWT to Local Storage
// logout(): remove JWT from Local Storage
// register(): POST {username, email, password}
// getCurrentUser(): get stored user information (including JWT)

class AuthService {

    login(username, password) {
        return axios.post(API_URL + "signin", {
            username,
            password
        })
        .then(response => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data)) // localStorage allows persisting data of a browser session/client based on that specific browser instance
            }
            return response.data;
        });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(firstName, lastName, email, username, password) {
        return axios.post(API_URL + "signup", {
            firstName,
            lastName,
            email,
            username,
            password
        })
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService()