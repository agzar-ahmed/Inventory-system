import React,{useState} from 'react';
import'./style.css'
import { PermIdentity, Today, PhoneIphone, Place, MailOutline, Publish } from '@material-ui/icons';

import {userProfile}from'../../dummyData'

export default function User() {
    const [data,setData] = useState(
        {
            ...userProfile
        }
    );
   

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
    
    const handleSubmit=(e)=>{
        e.preventDefault() // stops default reloading behaviour
        console.log(data,"name");
    }
    
    const {fullName,email,phone,birthDay,adress,image}= data

    return (
        <div className="userContainer">
            <div className="userTitleContainer">
               <h1 className="userTitle">Edit user</h1>
               <button className="createBtn">Create</button>
            </div>

            <div className="userDataContainer">
              <div className="userData">
                <h3>Profile</h3>
                <div className="userDataInfo">
                   <img src={userProfile.image} alt="memeber img" />
                   <div className="userDataTitle">                   
                       <span className="userDataName">{userProfile.fullName}</span>
                       <span className="userDataJobTitle">{userProfile.job}</span>
                   </div>
                </div>

                <div className="userDataBody">
                   <h4 className="userDataBodytitle">Account details</h4>
                   <div className="userDataInfo">  
                       <PermIdentity className="userDataIcon"/>
                       <span className="userDataField">{userProfile.fullName}</span>                      
                   </div>

                   <div className="userDataInfo">  
                       <MailOutline className="userDataIcon"/>
                       <span className="userDataField">{userProfile.email}</span>                      
                   </div>
                   <h4 className="userDataBodytitle">User details</h4>
                   <div className="userDataInfo">                      
                       <Today className="userDataIcon"/>
                       <span className="userDataField">{userProfile.birthDay}</span>    
                   </div>

                   <div className="userDataInfo">                      
                       <PhoneIphone className="userDataIcon"/>
                       <span className="userDataField">{userProfile.phone}</span> 
                   </div>
                   
                   <div className="userDataInfo">  
                       <Place className="userDataIcon"/>
                       <span className="userDataField">{userProfile.adress}</span>    
                   </div>
                   
                </div>
              </div>
              
              <div className="userEdit">    
              <h3>Edit Profile</h3>           
                <form className="user-formContent" onSubmit={handleSubmit}>
                <div className="formData">
                   <div className="inputBox">
                      <label>Full Name</label>
                      <input  name="fullName" value={fullName} onChange={handleChange}/>
                   </div>
                   
                   <div className="inputBox">
                      <label>Email</label>
                      <input placeholder="Email" name="email" value={email} onChange={handleChange}/>
                   </div>   
                  
                   <div className="inputBox">
                      <label>Phone</label>
                      <input placeholder="Phone number" name="phone" value={phone} onChange={handleChange}/>
                   </div> 
                   
                   <div className="inputBox">
                      <label>Birth day</label>
                      <input placeholder="Birth Day" name="birthDay" value={birthDay} onChange={handleChange}/>
                   </div> 
                   
                   <div className="inputBox">
                       <label>Adress</label>
                       <input placeholder="Adress" name="adress" value={adress} onChange={handleChange}/>
                   </div>
                   <button class='updateBtn'>Update</button> 
                </div>
                <div className="UpdateImageBox">

                     <img 
                     src={image} 
                     alt="profile image"
                     />
                     <label htmlFor="file"><Publish/></label>
                     <input type="file" id="file" style={{display:'none'}}/>
                </div>                  
                   

                </form>   
               </div>
            </div>
        </div>
    )
}
