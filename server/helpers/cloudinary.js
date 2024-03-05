import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'db2kn0rhf', 
  api_key: '441377853876731', 
  api_secret: 'XJgSz_zqBU-G4r4t4pXy7DUwrew' 
});


export default function cloudinaryUploadImage(images) {

    return new Promise((resolve, reject) => {
      const uploadPromises = [];
  
      for (const image of images) {
        uploadPromises.push(
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image, (error, result) => {
              if (result && result.secure_url) {
                resolve(result.secure_url);
              } else {
                reject(error);
              }
            });
          })
        );
      }
  
      // Upload all images in parallel
      Promise.all(uploadPromises).then(resolve).catch(reject);
    });
  }