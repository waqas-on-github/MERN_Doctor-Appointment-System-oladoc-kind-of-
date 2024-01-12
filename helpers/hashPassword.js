import bcrypt from "bcryptjs";


const hashPass  =  async (pass) => {
    
    console.log(typeof(pass));
    return await bcrypt.hash( String(pass), 10)

}

export {
    hashPass
}


