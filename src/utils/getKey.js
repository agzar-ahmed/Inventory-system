
//find a key of giving value in object?

export default function getKey(data, values){
  let keys = []
  Object.keys(data).map(key=>{
       values.map(value => {
        if(data[key] == value){
            console.log(key)  
            return keys.push(key)
        }
    })
  })
 return keys
}