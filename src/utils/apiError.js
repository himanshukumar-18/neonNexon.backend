class ApiError extends Error {
    constructor(
        statusCode,
        message = "Somthing went wrong",
        error = []
    ) {
        super(message)
        this.statusCode = statusCode
        this.error = error
        this.data = null
        this.success = false
    }
}

export default  ApiError; 