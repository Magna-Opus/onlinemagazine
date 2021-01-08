
export const Translate =(datas) => {
  
    let baseUrl='https://translation.googleapis.com/language/translate/v2?key=AIzaSyAGKVaKufY6oHI_O2axWhpE-a8OnKbLcn8';	
    console.log("data is: ",datas)
   return new Promise((resolve, reject)=>{
       fetch(baseUrl,
       {
           method:'POST',
           headers:{
            'Content-Type': 'multipart/form-data'
           },
           body:datas
       })
       .then((response)=>response.json())
       .then((responseJson)=>{            
           resolve(responseJson);
       })
       .catch((error)=>{
           reject(error);
           console.log("error..........")
       })
   })
}