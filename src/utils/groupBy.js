export default function groupBy(objectArray, property){
    return objectArray.reduce(function (acc, obj) {
      let key = obj[property]
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key] = obj
      return acc
    }, {})
}
