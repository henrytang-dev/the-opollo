import axios from "axios";
import authHeader from "./auth-header";

const API_URL = `${VITE_ENDPOINT}`
const api = axios.create({timeout:'10000'})

class BlogService {

    async publish(object) {
      const user = JSON.parse(localStorage.getItem("user"))
      const username = user.username
      await api.post(API_URL + `/${username}/write/save`, object, { headers: authHeader()})
    }

    loadRandomBlogs() {
      return axios.get(API_URL + "/")
    }

    loadBlog() {
      return axios.get(API_URL + `/${username}/${title}`, { header: authHeader()})
    }

}

export default new BlogService()