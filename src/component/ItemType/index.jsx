import React,{useEffect,useState} from 'react';
import "./style.css"

export default function ItemTypes(){
    const[data,setData] = useState({})
    

    const handleChange=(e)=>{
        setData({  
            ...data,
            [e.target.name]: e.target.value
           })
           console.log(
            {  
             ...data,
             [e.target.name]: e.target.value
            }
          )
    }
    const {name} = data

    const handelSubmit=(e)=>{
        console.log(data,"response");
        e.preventDefault() // stops default reloading behaviour

            fetch("http://localhost:3000/api/itemtype", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(data)
            })
            .then( (response) => { 
                console.log(response,"response");
            //do something awesome that makes the world a better place
            });
    }

    const renderBtn=()=>{
        return(
            name =='' ?
            <button className="btnSubmit" disabled>ADD to disables</button>
            :<button className="btnSubmit" onClick={(e)=> handelSubmit(e)}>ADD</button>
        )
    } 

    return (
        <div className="size">
            <form className="formContent" onSubmit={handelSubmit}>
                <div className="itemTypeForm">
                   <div className="inputBox">
                      <label>Name</label>
                      <input  placeholder='Size name' name="name" value={name} onChange={handleChange}/>
                   </div>

                   {renderBtn()}

                </div>   
            </form>
        </div>
    )
}
