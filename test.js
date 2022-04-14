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

const dataStock = {
    "stock": [
        {
            "id": 1,
            "totalQuantity": "5",
            "createdAt": "2022-03-26T11:35:12.000Z",
            "updatedAt": "2022-03-26T11:35:12.000Z",
            "inventoryId": 2,
            "itemId": 1,
            "Inventory": {
                "id": 2,
                "name": "Inventory 2",
                "description": null,
                "imageURL": null,
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "AddressId": 2
            },
            "Item": {
                "id": 1,
                "name": "Item test1",
                "description": "Item test1 description",
                "sku": "1453546ADYHL",
                "imageURL1": "1639327545797-599549423-crispy-chicken-burger.png",
                "imageURL2": "1639327545818-527227345-colorvu-camera.JPG",
                "imageURL3": "1639327545797-599549423-crispy-chicken-burger.png",
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "CompanyId": 1,
                "userId": 2,
                "ItemTypeId": 10,
                "SizeId": 2,
                "UserId": 2
            }
        },
        {
            "id": 2,
            "totalQuantity": "5",
            "createdAt": "2022-03-26T11:35:12.000Z",
            "updatedAt": "2022-03-26T11:35:12.000Z",
            "inventoryId": 2,
            "itemId": 4,
            "Inventory": {
                "id": 2,
                "name": "Inventory 2",
                "description": null,
                "imageURL": null,
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "AddressId": 2
            },
            "Item": {
                "id": 4,
                "name": "Item test4",
                "description": "Item test4 description",
                "sku": "1453546ADYHT4",
                "imageURL1": "1639327545797-599549423-crispy-chicken-burger.png",
                "imageURL2": "1639327545818-527227345-colorvu-camera.JPG",
                "imageURL3": "1639327545797-599549423-crispy-chicken-burger.png",
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "CompanyId": 1,
                "userId": 2,
                "ItemTypeId": 10,
                "SizeId": 2,
                "UserId": 2
            }
        },
        {
            "id": 3,
            "totalQuantity": "10",
            "createdAt": "2022-03-26T11:35:12.000Z",
            "updatedAt": "2022-03-26T11:35:12.000Z",
            "inventoryId": 4,
            "itemId": 3,
            "Inventory": {
                "id": 4,
                "name": "Inventory 4",
                "description": null,
                "imageURL": null,
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "AddressId": 1
            },
            "Item": {
                "id": 3,
                "name": "Item test3",
                "description": "Item test3 description",
                "sku": "1453546ADYT3",
                "imageURL1": "1639327545797-599549423-crispy-chicken-burger.png",
                "imageURL2": "1639327545818-527227345-colorvu-camera.JPG",
                "imageURL3": "1639327545797-599549423-crispy-chicken-burger.png",
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "CompanyId": 4,
                "userId": 4,
                "ItemTypeId": 1,
                "SizeId": 2,
                "UserId": 4
            }
        },
        {
            "id": 4,
            "totalQuantity": "5",
            "createdAt": "2022-03-26T11:35:12.000Z",
            "updatedAt": "2022-03-26T11:35:12.000Z",
            "inventoryId": 4,
            "itemId": 2,
            "Inventory": {
                "id": 4,
                "name": "Inventory 4",
                "description": null,
                "imageURL": null,
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "AddressId": 1
            },
            "Item": {
                "id": 2,
                "name": "Item test2",
                "description": "Item test2 description",
                "sku": "1453546ADT2",
                "imageURL1": "1639327545797-599549423-crispy-chicken-burger.png",
                "imageURL2": "1639327545818-527227345-colorvu-camera.JPG",
                "imageURL3": "1639327545797-599549423-crispy-chicken-burger.png",
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "CompanyId": 2,
                "userId": 3,
                "ItemTypeId": 5,
                "SizeId": 1,
                "UserId": 3
            }
        },
        {
            "id": 5,
            "totalQuantity": "5",
            "createdAt": "2022-03-26T11:35:12.000Z",
            "updatedAt": "2022-03-26T11:35:12.000Z",
            "inventoryId": 4,
            "itemId": 4,
            "Inventory": {
                "id": 4,
                "name": "Inventory 4",
                "description": null,
                "imageURL": null,
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "AddressId": 1
            },
            "Item": {
                "id": 4,
                "name": "Item test4",
                "description": "Item test4 description",
                "sku": "1453546ADYHT4",
                "imageURL1": "1639327545797-599549423-crispy-chicken-burger.png",
                "imageURL2": "1639327545818-527227345-colorvu-camera.JPG",
                "imageURL3": "1639327545797-599549423-crispy-chicken-burger.png",
                "createdAt": "2022-03-26T11:35:11.000Z",
                "updatedAt": "2022-03-26T11:35:11.000Z",
                "CompanyId": 1,
                "userId": 2,
                "ItemTypeId": 10,
                "SizeId": 2,
                "UserId": 2
            }
        }
    ]
}


// const reorderArray = [1,2,3,4]
// .map(product => dataStock.stock.filter(info=>info.itemId == product).map(item=>item.totalQuantity).reduce(function(acc, val) { return acc + Number(val); }, 0))

// console.log(reorderArray)
// // data1.filter(info=>info.inventoryId == 4)
// console.log(dataStock.stock.filter((v,i,a)=>a.findIndex(v2=>(v2.itemId===v.itemId))===i).map((item,index)=>{
//     return {
//         ...item,
//         totalQuantity: reorderArray[index]
//     }
// })   

    // return {
    //     id:item.id,
    //     image:<img className='table-productimg' 
    //            src={`${ process.env.REACT_APP_PUBLIC_URL}${item.Item.imageURL1||item.Item.imageURL2||item.Item.imageURL3}`} 
    //            label={item.Item.imageURL1} />,
    //     sku:item.Item.sku,
    //     totalQuantity: dataStock.stock.filter(info=>info.itemId == item.itemId).map(item=>item.totalQuantity).reduce(function(acc, val) { return acc + Number(val); }, 0),
    //     lastUpdate:(new Date(item.updatedAt)).toUTCString(),
    //     }
    // })
    // )

// {     
//     id:item.id,
//     inventory:item.Inventory.name,
//     product:item.Item.name,
//     image:<img className='table-productimg' 
//                src={`${ process.env.REACT_APP_PUBLIC_URL}${item.Item.imageURL1||item.Item.imageURL2||item.Item.imageURL3}`} 
//                label={item.Item.imageURL1} />,
//     sku:item.Item.sku,
//     inventory:item.Inventory.name,
//     totalQuantity:item.totalQuantity,
//     lastUpdate:(new Date(item.updatedAt)).toUTCString(),
//    //  action:tableAction(inventoryItem.id)
//   }

const data2 =  [
    {
        "id": 2,
        "totalQuantity": "5",
        "createdAt": "2022-03-26T11:35:12.000Z",
        "updatedAt": "2022-03-26T11:35:12.000Z",
        "inventoryId": 2,
        "itemId": 4
    },
    {
        "id": 5,
        "totalQuantity": "5",
        "createdAt": "2022-03-26T11:35:12.000Z",
        "updatedAt": "2022-03-26T11:35:12.000Z",
        "inventoryId": 4,
        "itemId": 4
    }
]
// console.log(data2.reduce((c,p)=>{return {...c,totalQuantity: Number(c.totalQuantity)+ Number(p.totalQuantity)}}))

 function groupBy(objectArray, property){
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key]= obj
      return acc
    }, {})
}

console.log(groupBy(data2,'id'))




