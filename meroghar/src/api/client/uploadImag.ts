

interface imageUpload{
    imgId:string
    imgUrl:string
}


export async function uploadImage(image:any):Promise<imageUpload>{
    try{
        
    //there might be multiple image upload so
    const imageData = new FormData()
    //first upload image
    imageData.append('file',image)
    imageData.append('cloud_name', 'drpojzybw')
    imageData.append('upload_preset', 'FypMeroGhar')

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/drpojzybw/image/upload',
      {
        method: 'POST',
        body: imageData,
      }
    )
    const response = await res.json()
    return{
        imgId:response.public_id,
        imgUrl:response.url
    }

    }catch(e){
        console.log(e)
        throw e;
    }
}

export async function deleteImage(imgId: string): Promise<boolean> {
  try {
    const cloudName ='drpojzybw';
    const apiKey='842872465112638';
    const apiSecret='0Enpr1Xhc7O8brOPk57HjxCQDHU';

    const deleteUrl = `https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`;

    const payload = {
      public_id: imgId,
      api_key:apiKey,
      api_secret:apiSecret,
    };

    const res = await fetch(deleteUrl,{
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await res.json();
    console.log(response);

    return true;
  } catch (e) {
    console.log(e);
    return false
  }
}

