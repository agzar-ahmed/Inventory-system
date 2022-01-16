import React,{useEffect,useState} from 'react';
import "./style.css"

export default function Size(){
    const [data,setData] = useState({})
    const[shapesList,setShapesList] = useState([]);
    const[tableColumn,setTableColumn] = useState([]);


    const fetchShapes=()=>{
        return(
            fetch('http://localhost:3000/api/shapes')
            .then(res => res.json())
            .then((responseJSON) => {
               // do stuff with responseJSON here...
                setShapesList(responseJSON.shape)
             })
            .catch(err =>  console.log(err))
        )
    }
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
    const {name,width,height,length} = data

    const handelSubmit=(e)=>{
        e.preventDefault() // stops default reloading behaviour

            fetch("http://localhost:3000/api/size", {
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
            name ==''|| width =='' || height == '' || length== '' ?
            <button className="btnSubmit" disabled>ADD to disables</button>
            :<button className="btnSubmit" onClick={(e)=> handelSubmit(e)}>ADD</button>
        )
    } 

    
    const handelmodal=()=>{

    }

    

    useEffect(fetchShapes,[])
    return (
        <div className="size">
            <form className="formContent" onSubmit={handelSubmit}>
                <div className="sizeForm">
                   <div className="inputBox">
                      <label>Name</label>
                      <input  placeholder='Size name' name="name" value={name} onChange={handleChange}/>
                   </div>

                   <div className="inputBox">
                      <label>Length</label>
                      <input type="number" min="1" step="0.01" placeholder="Length" name="length" value={length} onChange={handleChange}/>
                      {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                   </div> 

                   <div className="inputBox">
                      <label>Width</label>
                      <input type="number" min="1" step="0.01" placeholder="Width" name="width" value={width} onChange={handleChange}/>
                      {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                   </div> 

                   <div className="inputBox">
                      <label>Height</label>
                      <input type="number" min="1" step="0.01" placeholder="Height" name="height" value={height} onChange={handleChange}/>
                      {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                   </div> 
                   
                   <div className="inputRow">
                        <div className="inputBox">
                            <label>Shape</label>
                            <select name="shapeId" onChange={handleChange}>
                             {shapesList.map((option)=><option value={option.id} key={option.id}>{option.name}</option>)}                
                            </select>
                        </div>   
                        <button class="addNew" class="addNew" onClick={handelmodal}>Add new</button>                          
                   </div>

                   {renderBtn()}

                </div>   
            </form>
        </div>
    )
}
