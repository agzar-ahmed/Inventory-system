import React,{useState , useEffect,useRef} from 'react'
import {  HighlightOff,AddPhotoAlternate } from '@material-ui/icons';
import './style.css'
import {FormInput,FileForm} from '../FormFields'
import { handleChange } from '../Form/formFunctions';
import { itemSchema } from '../../validations/productValidation';

const ImagWidget = ({data,setData,errors,setErrors,maxPicture}) => {

    const [previewImg,setPreviewImg] = useState()
    const [previewList,setPreviewList] = useState([])
    const [maxImgWarning,setMaxImgWarning] = useState(false)
    const [duplicateImg,setDuplicateImg] = useState(false)
    const [selectedImg,setSelectedImg] = useState(null)
    // const imgRef = useRef()

    const handelPicture=(e)=>{
        
        handleChange(e,data,setData,itemSchema,errors,setErrors);
        //clear all errors
        setDuplicateImg(false)
        setMaxImgWarning(false)
        setSelectedImg(null)

        e.target.files[0] && setPreviewImg(URL.createObjectURL(e.target.files[0])) 
      
        //verify if photo already exists:
        if(previewList.includes(previewImg)){
        setDuplicateImg(true)
        return
        }
        
        //verify max photo number:
        if(previewList.length >= maxPicture ){
        setMaxImgWarning(true)
        return
        }
        
        let newPreviewList = [];
        // /if(previewImg && previewList){
          e.target.files[0] && (newPreviewList = [...previewList, URL.createObjectURL(e.target.files[0])])
        // }
    
       
        // console.log(previewList.find(url=> url === previewImg),'duplicated') 
        // console.log(previewImg,previewList,'previewList')
    
    
        // console.log(e.target.files)
        setPreviewList(newPreviewList)
        //heighlight selected image length-1 to match the index
        // setSelectedImg(newPreviewList.length)
        
        setData({
            ...data,
            [e.target.name]:[...data.productImg, e.target.files[0]]
        })
        // handleChange()
    
        // console.log(data)
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


                      {/* <label 
                      onClick={()=>{
                        console.log(imgRef.current,"input Ref")
                        imgRef.current.click()
                      }} 
                      htmlFor="file1"> 
                      <AddPhotoAlternate className="imgIcon"/> 
                      </label>
                      <input 
                         ref={imgRef} 
                         type="file"  
                         name="productImg" 
                         onChange={handelPicture} 
                         style={{display:'none'}}
                      /> */}
                      {console.log(errors.productImg,'errorMessage')}
                      <FileForm 
                             type="file"  
                             label={<AddPhotoAlternate className="imgIcon"/>}
                             name="productImg" 
                             onChange={handelPicture}
                             onBlur={handelPicture}
                             errorMessage={errors.productImg}
                        />
                      {/* <FormInput
                            htmlFor="file1"
                            label={<AddPhotoAlternate className="imgIcon"/>}
                            displayInput={false}
                            type="file"
                            id="file1"
                            // style={{display:'none'}}
                            name="productImg" 
                            onChange={handelPicture}
                            onBlur={handelPicture}
                            errorMessage="erromessage"
                      />  */}
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
                                      <img 
                                        key={index+1}
                                        className="imgIconPrev"
                                        src={image} 
                                        alt="profile image"
                                        onClick={(e)=>{
                                          setPreviewImg(e.target.src)
                                          setSelectedImg(index+1)
                                        }}
                                        />
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
