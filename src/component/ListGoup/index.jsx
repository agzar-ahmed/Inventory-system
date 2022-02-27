import React,{useState} from 'react';
import './style.css'

export default function ListGroup({listData, onSelect}) {
  const [ activeItem,setActiveItem ] = useState('all')
 
  return (
    <div className='listGroup box-shadow'>
        <ul>
        {console.log(listData,"listData")}
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
