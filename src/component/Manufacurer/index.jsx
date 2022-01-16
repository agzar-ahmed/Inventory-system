import React,{useEffect,useState} from 'react';
import "./style.css"

import Address from '../Address'

export default function Manufacturer(){

    const addressInitialValue = { address1:'', address2:'', city:'', StateId:'10', CountryId:'', zipCode:'' };
    const initialData = { name:'',email:'',phone:'',websiteUrl:'',BusinessActivity:'Manufacturer',CompanyTypeId:'Manufacturer',description:'',addressId:''}

    const [data,setData] = useState(initialData)
    const [companyTypeList,setCompanyTypeList] = useState([]);
    const [manufacturerAddress,setManufacturerAddress] = useState(addressInitialValue)

    const BusinessActivityList=[{name:'Manufactrer',id:2}]
    
    const fetchCompanyType=()=>{
        return(
          
                fetch('http://localhost:3000/api/companytypes')
                .then(res => res.json())
                .then((responseJSON) => {
                // do stuff with responseJSON here...
                responseJSON.companyTypes.unshift({name:'Select a type',id:0})
                setCompanyTypeList(responseJSON.companyTypes)
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
    const { name, email, phone, websiteUrl, BusinessActivity, CompanyTypeId, description } = data
    const { address1, address2, city, StateId, CountryId, zipCode } = manufacturerAddress
    console.log({ address1, address2, city, StateId, CountryId, zipCode },manufacturerAddress,'change')


    const handelSubmit=(e)=>{
        e.preventDefault() // stops default reloading behaviour
        console.log(e.preventDefault,e.target.reset,'event outside promise')
        console.log(e.target.reset)
        console.log(e.target)
        // // e.target.reset();
        // setData({   name:'', 
        //             email:'', 
        //             phone:'', 
        //             websiteUrl:'',
        //             BusinessActivity:'Manufacturer', 
        //             CompanyTypeId:'Manufacturer', 
        //             description:'',addressId:''})
        fetch('http://localhost:3000/api/address', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(manufacturerAddress)
            })
         .then(res => res.json())
         .then(res=>{
            console.log(res.address,"address");
          const manufacturerData = {...data,AddressId:res.address.id}
            console.log(manufacturerData,"manufacturerData");
          fetch("http://localhost:3000/api/company", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            //make sure to serialize your JSON body
            body: JSON.stringify(manufacturerData)
            })
            .then( (response) => { 
                console.log(response,"response");
                e.target.reset();
                console.log(e.preventDefault,e.target,'event inside promise')
                setManufacturerAddress(addressInitialValue)
                setData(initialData)
            //do something awesome that makes the world a better place
            });
        })
        .catch(err =>  console.log(err))
    }

    console.log(companyTypeList)

    const renderBtn=()=>{
        return(
            name ==''|| email =='' || phone == '' || 
            websiteUrl == '' || BusinessActivity == '' || 
            CompanyTypeId == '' || BusinessActivityList =='' || 
            address1 ==''|| city == '' || StateId == '' || CountryId== '' ?
            <button className="btnSubmit" disabled>ADD to disables</button>
            :<button className="btnSubmit">ADD</button>
        )
    } 

    const handelmodal=()=>{
        // console.log(data,'MANIFACTURER2')
    }
    
    useEffect(
        fetchCompanyType
        ,[])

    return (
        <div className="Manufacturer">
              <div className="manufacturerFormContent">
                <form className="manufacturerFormContent" onSubmit={handelSubmit}>
                        <div className="companyTypeContainerForm">
                            <h3 className="subTitle">Manufacturer</h3>
                            <div className="inputBox">
                                <label>Name</label>
                                <input  placeholder='Size name' name="name" value={name} onChange={handleChange}/>
                            </div>

                            <div className="inputBox">
                                <label>Email</label>
                                <input type="text" placeholder="Email" name="email" value={email} onChange={handleChange}/>
                                {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                            </div> 

                            <div className="inputBox">
                                <label>Phone</label>
                                <input type="tel" placeholder="Phone number" name="phone" value={phone}  onChange={handleChange}/>
                                {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                            </div> 

                            <div className="inputBox">
                                <label>Website</label>
                                <input type="text" placeholder="URL" name="websiteUrl" value={websiteUrl} onChange={handleChange}/>
                                {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                            </div> 
                            
                            <div className="inputRow">
                                    <div className="inputBox">
                                        <label>Business activity</label>
                                        <select name="BusinessActivity" onChange={handleChange}>
                                        {BusinessActivityList && BusinessActivityList.map((option)=><option value={option.name} key={option.id}>{option.name}</option>)}                
                                        </select>
                                    </div>   
                                    <button className="addNew" onClick={handelmodal}>Add new</button>                          
                            </div>

                            <div className="inputRow">
                                    <div className="inputBox">
                                        <label>Company type</label>
                                        <select name="CompanyTypeId" onChange={handleChange}>
                                        {companyTypeList && companyTypeList.map((option)=><option value={option.id} key={option.id}>{option.name}</option>)}                
                                        </select>
                                    </div>   
                                    <button className="addNew" onClick={handelmodal}>Add new</button>                          
                            </div>

                            <div className="inputBox">
                                <label>Description</label>
                                <input type="text" placeholder="Description" name="description" value={description} onChange={handleChange}/>
                                {/* <input type="numeric" placeholder="Purchase Price" name="purchasePrice" value={purchasePrice} onChange={handleChange}/> */}
                            </div>

                            {renderBtn()}
                    </div>
                                    
                </form>
                <div className="addressContainerForm">
                        <h3 className="subTitle">Location</h3>
                        <Address manufacturerAddress={manufacturerAddress} 
                                 setManufacturerAddress={setManufacturerAddress} 
                                 manufacturerHandelSubmit={handelSubmit}
                                 /> 
                </div>
            </div>
        </div>
    )
}
