import {v2 as cloudinary} from 'cloudinary';
        
export default function() {
cloudinary.config({ 
  cloud_name:  process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret: process.env.API_SECRET  
});

return cloudinary
}



