
const cookieOptions = {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "PRODUCTION",
    expires: new Date(Date.now() + 15 * 60 * 1000), // Shorter expiration time
    sameSite: "lax", // Add SameSite attribute
  };


  export {
    cookieOptions
  }