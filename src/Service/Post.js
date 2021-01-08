
export const Post =(types,datas,token) => {
  
        let baseUrl='https://onlinemagazine.org.uk/';	
        console.log(baseUrl+types);
        console.log("data is: ",datas)
       return new Promise((resolve, reject)=>{
           fetch(baseUrl+types,
           {
               method:'POST',
               headers:{
                    "Authorization":"Bearer "+token,
                   "Content-Type":'application/json'
               },
               body:JSON.stringify(datas)
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