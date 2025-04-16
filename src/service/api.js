import axios from "axios";

const Api = axios.create({
    baseURL: "https://fullstack-vue-express-backend.vercel.app/api",
})

export default Api;