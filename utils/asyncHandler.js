function asyncHandler (fun) {
    
        return async function(req, res, next) {
            try {
                 await fun(req, res, next)
            } catch (error) {
                console.log( "error name " , error);
                next(error)
            }
        }
    
    
}


export default asyncHandler