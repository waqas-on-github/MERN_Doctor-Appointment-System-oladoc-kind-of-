class CustomError extends Error {
    constructor(message, code , stack) {
        
        super(message);
        this.code = code
        this.stack = stack
    }

}


export default CustomError


