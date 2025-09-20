class ApiResponse {
    constructor(statusCode, data, message = "Success", user, token) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
        this.user = user
        this.token = token
    }
}

export default ApiResponse 