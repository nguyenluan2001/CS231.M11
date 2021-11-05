import axios from "axios"
const axiosClient=axios.create({
    baseURL:"https://images.ctfassets.net"
})
export default axiosClient