import React ,{useState,useEffect}from 'react'
import './style.css'
import TopBar from '../../component//TopBar';
import IncomingPurchase from '../../component/IncomingPurchase'


import {getProductTypes} from '../../store/actions/productTypeActions'
import {getInventories} from '../../store/actions/inventoryActions'
import {getSizes} from '../../store/actions/sizeActions'
import {getProviders} from '../../store/actions/providerActions'
import {getManufacturers} from '../../store/actions/manufacturerActions'
import { getItems } from '../../store/actions/itemAction';
import { getIncomingPurchases } from '../../store/actions/incomingPurchaseActions';
import { getCompanies } from '../../store/actions/companiesActions'

import { inventorySelector } from '../../store/selectors/inventorySelector'
import { providerSelector } from '../../store/selectors/providerSelector'
import {productTypeSelector} from '../../store/selectors/productTypeSelector'
import {sizeSelector} from '../../store/selectors/sizeSelector'
import {manufacturerSelector} from '../../store/selectors/manufacturerSelector'
import { itemsSelector } from '../../store/selectors/itemSelector'
import { incomingPurchaseSelector } from '../../store/selectors/incomingPurchaseSelector'


import { Table } from '../../component/Table';

import { useDispatch,useSelector } from 'react-redux';

export default function Product() {

    /* before using Redux */
    // const [itemSizes,setItemSizes] = useState([]);
    // const [itemTypes,setItemTypes] = useState([]);
    // const [providers,setProviders] = useState([]);
    // const [manufacturers,setManufacturers] = useState([]);
    // const [inventories,setInventories] = useState([])

    // //setManufacturers(store.manufacturers.manufacturerData)
    //     //    ( 
    //     //        setItemSizes(store.size.sizeData),
    //     //        setItemTypes(store.productType.productTypeData),
    //     //        setProviders(store.providers.providerData)
    //     //       )

    // const fetchData=()=>{
    //     return(
    //         Promise.all([
    //             fetch('http://localhost:3000/api/sizes'),
    //             fetch('http://localhost:3000/api/itemTypes'),
    //             fetch('http://localhost:3000/api/providers'),
    //             fetch('http://localhost:3000/api/manufacturers'),
    //             fetch('http://localhost:3000/api/inventories')
    //         ]).then((responses)=>{
    //             // Get a JSON object from each of the responses
    //             console.log(responses,'responses')
    //             return Promise.all(responses.map(function (response) {
    //                 return response.json();
    //             }));
    //         }).then((data)=>{
    //             // Log the data to the console
    //             // You would do something with both sets of data here
    //             console.log(data)
    //             setItemSizes(data['0'].size);
    //             setItemTypes(data['1'].itemTypes);
    //             setProviders(data['2'].provider);
    //             setManufacturers(data['3'].manufacturers)
    //             setInventories(data['4'].inventories)
    //         }).catch((error)=>{
    //             // if there's an error, log it
    //             console.log(error);
    //         })
      
    //     )
    // }

//life cycle HOOKS
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getProductTypes())
        dispatch(getInventories())
        dispatch(getSizes())
        dispatch(getProviders())
        dispatch(getManufacturers())
        dispatch(getItems())
        dispatch(getIncomingPurchases())
        
    }
    ,[])

    
    const inventoriesList = useSelector(inventorySelector())
    const productTypesList = useSelector(productTypeSelector())
    const providersList = useSelector(providerSelector())
    const sizesList = useSelector(sizeSelector())
    const manufacturersList = useSelector(manufacturerSelector())
    const itemsList = useSelector(itemsSelector())
    const incomingPurchases = useSelector(incomingPurchaseSelector())

    const state = useSelector(state=>state)

    console.log(state,manufacturersList,inventoriesList,productTypesList,providersList,sizesList,'selectors')
    // setItemTypes(store.productType.productTypeData)

    return (
        <div className="productPage">
             <TopBar/>
             <IncomingPurchase sizes={sizesList} itemTypes={productTypesList} providers={providersList} manufacturers={manufacturersList} inventories={inventoriesList} items={itemsList}/>     
        </div>
    )
}
