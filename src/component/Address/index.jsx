import React,{useEffect,useState} from 'react';
import "./style.css"

export default function Address({manufacturerAddress,setManufacturerAddress,manufacturerHandelSubmit}){
    const [data,setData] = useState({ address1:'', address2:'', city:'', StateId:'10', CountryId:'', zipCode:'' })
    const[countryList,setCounteryList] = useState([]);

    
    const fetchCountery =()=>{
        return(
            //check the developement mode
            // process.env.NODE_ENV !== 'development'
            //             ? `/api/countries`
            //             : 'http://localhost:3000/api/countries',
            fetch('http://localhost:3000/api/countries')
            .then(res => res.json())
            .then((responseJSON) => {
               // do stuff with responseJSON here...
               setCounteryList(responseJSON.countries)
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
        manufacturerAddress && setManufacturerAddress({  
                                                        ...manufacturerAddress,
                                                        [e.target.name]: e.target.value
                                                      })
    }

    const { address1, address2, city, StateId, CountryId, zipCode } = manufacturerAddress ? manufacturerAddress:data
    
    const handelSubmit=(e)=>{
        e.preventDefault() // stops default reloading behaviour
          fetch("http://localhost:3000/api/address", {
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
            address1 ==''|| city == '' || 
            StateId == '' || CountryId == '' ?
            <button className="btnSubmit" disabled>ADD to disables</button>
            :<button className="btnSubmit">ADD</button>
        )
    } 

    const handelmodal=()=>{
        // console.log(data,'MANIFACTURER2')
    }
    
    useEffect(
        fetchCountery
        ,[])

    // useEffect(() => {
    //     handelSubmit(e);
    //     }, [getAddress]);

    return (
        <div className="address">
            <form className="adressFormContent" onSubmit={manufacturerHandelSubmit? manufacturerHandelSubmit:handelSubmit}>
                <div className="addressForm">
                   <div className="inputBox">
                      <label>Address1</label>
                      <input type="text" placeholder='Address1' name="address1" value={address1} onChange={handleChange}/>
                   </div>

                   <div className="inputBox">
                      <label>Address2</label>
                      <input type="text" placeholder="Address2" name="address2" value={address2} onChange={handleChange}/>
                      {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                   </div> 

                <div className="addressFormRow">
                    <div className="inputBox">
                      <label>City</label>
                      <input type="text" placeholder="City name" name="city" value={city} onChange={handleChange}/>
                      {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                   </div>

                   <div className="inputBox">
                      <label>State</label>
                      <input type="text" placeholder="State name" name="state" value={StateId} onChange={handleChange}/>
                      {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                   </div> 
                </div>  

                <div className="inputRow">
                        <div className="inputBox">
                            <label>Countery</label>
                            <select name="CountryId" onChange={handleChange}>
                             {countryList && countryList.map((option)=><option value={option.id} key={option.id}>{option.name}</option>)}                
                            </select>
                        </div>                             
                   </div>    
                   {/* <div className="inputBox">
                      <label>Countery</label>
                      <input type="text" placeholder="Countery name" name="countery" value={countery} onChange={handleChange}/>
                   </div>  
                   */}
                   <div className="inputBox">
                      <label>Zipcode</label>
                      <input type="text" placeholder="Zipcode" name="zipCode" value={zipCode} onChange={handleChange}/>
                      {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                   </div>


                   {!manufacturerHandelSubmit && renderBtn()}

                </div>   
            </form>
        </div>
    )
}
