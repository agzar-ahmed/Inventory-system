import React,{useState} from 'react';
import './style.css'

export default function ListGroup({listData, onSelect}) {
  const [ activeItem,setActiveItem ] = useState(1)
  return (
    <div className='listGroup'>
        <ul>
          {listData.map((item)=> 
                      <li key={item.id} className={item.id == activeItem ? "active":undefined} 
                          onClick={()=>{
                            setActiveItem(item.id)
                            onSelect(item.id)
                          }}>
                            {item.name}
                           <span className="listGroup-totalitem">({item.totalItem ? item.totalItem:0})</span>
                      </li>
          )}
           
        </ul>

    </div>
  )
}
