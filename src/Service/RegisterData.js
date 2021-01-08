
export const RegisterData =(types,datas) => {
    console.log(datas);
     let baseUrl='https://onlinemagazine.org.uk/';	
     console.log(baseUrl+types);
     return new Promise((resolve, reject)=>{
         fetch(baseUrl+types,
         {
             method:'POST',
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