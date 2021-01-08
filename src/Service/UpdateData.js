
export const UpdateData =(types,datas,token) => {
    console.log(datas);
     let baseUrl='https://onlinemagazine.org.uk/';	
     console.log(baseUrl+types);
     return new Promise((resolve, reject)=>{
         fetch(baseUrl+types,
         {
             method:'POST',
             headers:{
                "Authorization":"Bearer "+token,
             },
             body:datas
         })
         .then((response)=>response.json())
         .then((responseJson)=>{            
             resolve(responseJson);
         })
         .catch((error)=>{
             reject(error);
         })
     })
 }