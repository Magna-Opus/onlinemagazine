
export const DeletePost =(types,token) => {
     let baseUrl='https://onlinemagazine.org.uk/';	
     console.log(baseUrl+types);
     return new Promise((resolve, reject)=>{
         fetch(baseUrl+types,
         {
             method:'DELETE',
             headers:{
                "Authorization":"Bearer "+token,
             },
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