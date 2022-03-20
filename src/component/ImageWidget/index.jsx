import React,{useState , useEffect,useRef} from 'react'
import {  HighlightOff,AddPhotoAlternate } from '@material-ui/icons';
import './style.css'
import {FormInput,FileForm} from '../FormFields'
import { handleChange } from '../Form/formFunctions';
import { itemSchema } from '../../validations/productValidation';

import getKey from '../../utils/getKey';

const ImagWidget = ({data,setData,errors,setErrors,maxPicture}) => {

  // const [imgToUpdate,setImgToUpdate] = useState()
  //add img to initialState UPDATE cas:
    var imgToUpdate =[]
    let initialState = data.imageURL1 !== undefined ?
     (
      Object.keys(data).filter(prop => prop.startsWith("image")).map(key=>{
        //image URL
        if(data[key]) return `${process.env.REACT_APP_PUBLIC_URL}/${data[key]}`
        //get imageURL field to update data[key] undefined or null
        imgToUpdate.push(key)
        console.log(imgToUpdate,'check if image exist')
        return null
      }).filter(elem=>elem != null)
      ) :[]
    //you can also use hasOwnProperty or in operator

    console.log(data,initialState,'data from img widget')

    const [previewImg,setPreviewImg] = useState(initialState[0])
    const [previewList,setPreviewList] = useState(initialState)
    const [maxImgWarning,setMaxImgWarning] = useState(false)
    const [duplicateImg,setDuplicateImg] = useState(false)
    const [selectedImg,setSelectedImg] = useState(initialState[0]?1:null)
   

    const handelPicture=(e)=>{
      console.log(e.target.files,'img files')
        handleChange(e,data,setData,itemSchema,errors,setErrors);

        //clear all errors
        setDuplicateImg(false)
        setMaxImgWarning(false)
        setSelectedImg(null)

        if (e.target.files[0]){ 
          var imgUrl= URL.createObjectURL(e.target.files[0])
          setPreviewImg(imgUrl) 
          console.log(imgToUpdate,e.target.files[0],imgUrl,previewImg,previewList,'check if image exist')
        }
      
        console.log(imgUrl,previewList,previewImg,'check if image exist')
         //verify if photo already exists:
        if(previewList.includes(imgUrl)){
          setDuplicateImg(true)
          return
        }

        //verify max photo number:
        if(previewList.length >= maxPicture ){
          setMaxImgWarning(true)
          return
        }
             
        let newPreviewList = [];
      
          e.target.files[0] && (newPreviewList = [...previewList, URL.createObjectURL(e.target.files[0])])
        
        setPreviewList(newPreviewList)
        //heighlight selected image length-1 to match the index
        // setSelectedImg(newPreviewList.length)
        
        setData(
          {
            ...data,
            imgToUpdate,
            [e.target.name]:data.productImg !== undefined ? [...data.productImg , e.target.files[0]] :  [e.target.files[0]]
        })
      
      }

    return (
        <div>
            <div className="UpdateImageBox">
                    {
                    previewImg ? 
                    <div className='img-view'>
                          <img
                            src={previewImg} 
                            alt="product image"
                            />
                            {console.log(selectedImg,"selectedImg")}
                          {/* show overlay to delete image if image selected*/}
                          { selectedImg &&
                            <div className="img-delete">
                                <div>
                                    <HighlightOff 
                                            className="img-deleteIcon" 
                                            onClick={()=>{
                                            const FiltredImgList = previewList.filter(img=> img !== previewImg )
                                            // find deleted img key to update
                                            initialState.length>0 && (
                                            setData({...data,imgToUpdate:[...imgToUpdate,...getKey(data,[previewImg.substring(previewImg.lastIndexOf('/') + 1)])]})
                                              //  imgToUpdate !== undefined ? 
                                              //  data.imgToUpdate = [...imgToUpdate,...data.imgToUpdate ,...getKey(data,[previewImg.substring(previewImg.lastIndexOf('/') + 1)])]:
                                              //  data.imgToUpdate =[...imgToUpdate,...getKey(data,[previewImg.substring(previewImg.lastIndexOf('/') + 1)])]
                                              )
                                            console.log(data.imgToUpdate,data,[previewImg],getKey(data,[previewImg]),'data.imgToUpDate')
                                            // console.log(FiltredImgList,'FiltredImgList')
                                            setPreviewList(FiltredImgList)
                                            }}
                                    />
                                    <span> Delete</span>  
                                </div>
                            </div>
                            }     
                    </div>                    
                    :
                    <div>
                    {/* {console.log(errors.productImg,'errorMessage')} */}
                      <FileForm 
                             type="file"  
                             label={<AddPhotoAlternate className="imgIcon"/>}
                             name="productImg" 
                             onChange={handelPicture}
                             onBlur={handelPicture}
                             errorMessage={errors.productImg}
                        />

                    </div>
                    }
                    {
                      previewImg && 
                          <div className='imgSmallPrev'>
                              <label htmlFor="file"> <AddPhotoAlternate className="imgIconPrev"/> </label>
                              <input type="file" id='file' name="productImg" onChange={handelPicture} style={{display:'none'}}/>
                            {
                                // console.log(selectedImg),
                                previewList &&
                                previewList.map((image,index) =>
                                    <div key={index+1} className={ selectedImg == index+1 ?'overlay':'noOverlay'}>
                                      {console.log(selectedImg,image,index,'selectedImg')} 
                                      {image && <img 
                                        key={index+1}
                                        className="imgIconPrev"
                                        src={image} 
                                        alt="profile image"
                                        onClick={(e)=>{
                                          setPreviewImg(e.target.src)
                                          setSelectedImg(index+1)
                                        }}
                                        />}
                                    </div>
                                )
                            }
                               
                             { maxImgWarning && <div className='warning'>Maximum {maxPicture} photos</div> }
                             { duplicateImg && <div className='warning'>Photo already exists</div> }
                          
                          </div>
                    }
                    
                </div> 
                        
        </div>
    )
}

export default ImagWidget
