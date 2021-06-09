
export const Get =(types,token) => {
    
    let baseUrl='https://onlinemagazine.org.uk/';	
    console.log(baseUrl+types);

    return new Promise((resolve, reject)=>{
        fetch(baseUrl+types,
        {
            method:'GET',
            headers:{
                "Authorization":"Bearer "+token,
                "Content-Type":'application/json'
            }
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

export const Get2 =(types) => {
    
    let baseUrl='https://onlinemagazine.org.uk/';	
    console.log(baseUrl+types);

    return new Promise((resolve, reject)=>{
        fetch(baseUrl+types,
        {
            method:'GET',
            headers:{
                
                "Content-Type":'application/json'
            }
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