const items = [
    {id: 1, name: 'Item test1', description: 'Item test1 description', sku: '1453546ADYHL', imageURL1: '1639327545797-599549423-crispy-chicken-burger.png'},
    {id: 2, name: 'Item test2', description: 'Item test1 description', sku: '1453546ADYHL', imageURL1: '1639327545797-599549423-crispy-chicken-burger.png'},
    {id: 10, name: 'Item test3', description: 'Item test1 description', sku: '1453546ADYHL', imageURL1: '1639327545797-599549423-crispy-chicken-burger.png'},
    {id: 7, name: 'Item test4', description: 'Item test1 description', sku: '1453546ADYHL', imageURL1: '1639327545797-599549423-crispy-chicken-burger.png'},
    {id: 8, name: 'Item test5', description: 'Item test1 description', sku: '1453546ADYHL', imageURL1: '1639327545797-599549423-crispy-chicken-burger.png'}
]

// this is for normaliz=ing redux turn an array of object into object of array with id as property

// var obj = {};
// items.map(k => obj[k.id] = k)
// console.log(obj)
function reorderState(state){
    var obj = {};
    state.map(k => obj[k.id] = k)
    return obj
}
const res = reorderState(items)

console.log(res)

console.log(Object.values(res))

//find a key of giving value in object?

const data = {user:'testUser',status:'active',job:'developer',img1:'URLimg1',img2:'URLimg2'}

function findKey(data, values){
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

const key = findKey(data,['URLimg1','URLimg2'])

console.log(findKey(data,['URLimg1','URLimg2']))
let req ={}
findKey(data,['URLimg1','URLimg2']).map(img=> {
    {req[img]= null}
})
console.log(req)


//
const obj ={a:{j:"1",k:"2"},b:{j:"1",k:"2"},c:{j:"1",k:"2"}}
console.log(obj)

delete obj["a"]["k"]

console.log(obj)