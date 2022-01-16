
const logger = param =>store=>next=>action=>{
     if(process.env.NODE_ENV == "development"){
            // console.log(param,"Logging")
            // console.log(store,"store");
            // console.log(next,"next");
            console.log(action,"action")
            // console.log(process.env,"process env")
            // console.log(path,"process")
     }
    next(action)
}
export default logger