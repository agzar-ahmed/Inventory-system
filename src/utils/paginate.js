export function paginate(items, pageNumber, pageSize){
    const startIndex = (pageNumber-1)*pageSize
    //(pageNumber-1)*(pageSize-1);
    const endIndex = pageSize*pageNumber
    //(pageSize-1)*pageNumber;
    console.log(startIndex,'startIndex',endIndex,'endIndex')
    return items.slice(startIndex, endIndex);
}