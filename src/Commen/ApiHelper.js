import axios from "axios"

class ApiHelper {
    constructor() {
        this.token = localStorage.getItem("token")
        // this.baseUrl = 'http://192.168.1.90:5000'
        this.baseUrl = 'http://localhost:5000'
    }

    fetchProduct() {
        return axios.get(`${this.baseUrl}/product`)
    }

    fetchProductbyId(id) {
        return axios.get(`${this.baseUrl}/product/${id}`)
    }
    RegisterUser(userInfo) {
        return axios.post(`${this.baseUrl}/user/register`, userInfo)
    }
    LoginUser(userInfo) {
        return axios.post(`${this.baseUrl}/user/login`, userInfo)
    }
    fetchCart(products) {
        return axios.post(`${this.baseUrl}/cart`, { products: products })
    }
    createOrder(orderDetails) {
        return axios.post(`${this.baseUrl}/order`, orderDetails, { headers: { "token": this.token } })
    }
    paymentVerify(details) {
        return axios.post(`${this.baseUrl}/payment/verify`, details, { headers: { "token": this.token } })
    }
}

const apiHelper = new ApiHelper()

export default apiHelper