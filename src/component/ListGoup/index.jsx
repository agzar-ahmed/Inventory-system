import React,{useState} from 'react';
import './style.css'

export default function ListGroup() {
  const [ activeItem,setActiveItem ] = useState(1)
  const listGroup = [{id:"1",label:"All inventory"},
                     {id:"2",label:"Inventory 1"},
                     {id:"3",label:"Inventory 2"},
                     {id:"4",label:"Inventory 3"}]
  return (
    <div className='listGroup'>
        <ul>
          {listGroup.map((item)=> 
                      <li className={item.id == activeItem && "active"} 
                          onClick={()=>{setActiveItem(item.id)}}>
                            {item.label}
                      </li>
          )}
           
        </ul>

    </div>
  )
}
