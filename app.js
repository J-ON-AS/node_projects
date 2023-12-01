const fs = require('fs');
const {google} = require('googleapis');

const api_key = require('./api-key.json');
const SCOPE = ['https://www.googleapis.com/auth/drive'];

async function authorize(){
  const jwtClient = new google.auth.JWT(
    api_key.client_id,
    null,
    api_key.private_key,
    SCOPE
    );
    await jwtClient.authorize();
    
    return jwtClient;
  }
  async function uploadFile(authClient){
    console.log("Upload Started...");
    return new Promise ((resolve,rejected)=>{
      const drive = google.drive({version:'v3',auth:authClient});
      var fileMetaData ={
        name:'Shutter_Island_1080p',
        parents:['1NAGe-iS2IUJqRY6AxavjNFUD7mpXDNmn']
      }
      
      drive.files.create({
      resource:fileMetaData,
      media:{
        body:fs.createReadStream('Shutter.Island.2010.1080p.10Bit.BRRip.Hindi.English.MoviesHeist.Com.mkv')  ,
        mimeType:'video/mkv'
      },
      fields:'id'
    },function(error,file){
      if(error){
        return rejected(error)
      }
      resolve(file);
      console.log("Uploaded..!")
    })
    
  }
  );
  

}
authorize().then(uploadFile).catch("error",console.error());