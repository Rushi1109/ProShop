import React, { useState, useEffect } from 'react'
import { Link, redirect,useParams } from 'react-router-dom'
import { Form, Butoon, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userDetailStart, userDetailSuccess, userDetailFail, userDetailReset } from '../features/userDetailSlice'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userLoginSuccess } from '../features/userLoginSlice'
import {userupdateadminrequest,userupdateadminsuccess, userupdateadminfail,userupdateadminreset } from '../features/userUpdateAdminSlice'
import {fetchProductDetailsStart,fetchProductDetailsSuccess,fetchProductDetailsFailure } from '../features/productDetailsSlice'
import {productUpdaterequest,productUpdatesuccess,productUpdatefailure,productUpdatereset} from '../features/productUpdateSlice'

const ProductEditScreen = () => {


    const { id } = useParams()
    const productId=id
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading,setUploading]=useState(false)


   
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo,loading:loadinguser,error:loadingerror}=userLogin
   
    const productDetails = useSelector(state => state.productDetails)
    const { product, loading, error } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate,success:successUpdate, error:errorUpdate } = productUpdate


    const fetchDetails =(id)=> async () => {
        dispatch(fetchProductDetailsStart());
        try {
          const { data } = await axios.get(`/api/products/${id}`)
          dispatch(fetchProductDetailsSuccess(data));
        } catch (err) {
  
          dispatch(fetchProductDetailsFailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
        }
    }
    


    useEffect(() => {
       if(successUpdate){
        dispatch(productUpdatereset())
        navigate('/admin/productlist')
       }else{
             if(!product.name || product._id!=Number(productId)){
            dispatch(fetchDetails(productId));
            }
            else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
           
        }

       }

            
        


       
    }, [dispatch,product,id,navigate,successUpdate])



    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct(
            {
                _id:productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            }
        ))


    }

    
const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch(productUpdaterequest())
        
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }

        }
        const { data } = await axios.put(`/api/products/update/${product._id}/`,product,config)
        
         dispatch(productUpdatesuccess(data));
      
         dispatch(fetchProductDetailsSuccess(data))

    } catch (error) {
        dispatch(productUpdatefailure(
            error.response && error.response.data.detail ? error.response.data.detail : error.message,
        ))
      
    }
}

    
      
const uploadFileHandler = async(e)=>{
    // console.log('file is uploding')
    const file=e.target.files[0]
    const formData=new FormData()
    formData.append('image',file)
    formData.append('product_id',productId)
    setUploading(true)
    try{
        
        
        const config={
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }

        const {data}=await axios.post('/api/products/upload/',formData,config)
        setImage(data)
        setUploading(false)



    }catch(error){
        setUploading(false)
    }
}    


    return (
        <div>
            <Link to='/admin/productlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
                  :(
                     <Form onSubmit={submitHandler}>

                     <Form.Group controlId='name' style={{ margin: '1rem 0' }}>
                         <Form.Label>Name</Form.Label>
                         <Form.Control
                             type='name'
 
                             placeholder='Enter name'
                             value={name}
                             onChange={(e) => setName(e.target.value)}
                         >
 
                         </Form.Control>
                     </Form.Group>

                     <Form.Group controlId='price' style={{ margin: '1rem 0' }}>
                         <Form.Label>Price</Form.Label>
                         <Form.Control
                             type='number'
 
                             placeholder='Enter price'
                             value={price}
                             onChange={(e) => setPrice(e.target.value)}
                         >
 
                         </Form.Control>
                     </Form.Group>

                     <Form.Group controlId='image' style={{ margin: '1rem 0' }}>
                         <Form.Label>Image</Form.Label>
                         <Form.Control
                             type='text'
 
                             placeholder='Enter Image'
                             value={image}
                             onChange={(e) => setImage(e.target.value)}
                         >
 
                         </Form.Control>
                         <Form.Control
                            type='file'
                            id='image-file'
                            custom
                            onChange={(e)=>uploadFileHandler(e)} 
                        >
                            
                         </Form.Control>
                         
                     </Form.Group>

                     <Form.Group controlId='brand' style={{ margin: '1rem 0' }}>
                         <Form.Label>Brand</Form.Label>
                         <Form.Control
                             type='text'
 
                             placeholder='Enter brand'
                             value={brand}
                             onChange={(e) => setBrand(e.target.value)}
                         >
 
                         </Form.Control>
                     </Form.Group>

                     <Form.Group controlId='countinstock' style={{ margin: '1rem 0' }}>
                         <Form.Label>Stock</Form.Label>
                         <Form.Control
                             type='number'
 
                             placeholder='Enter stock'
                             value={countInStock}
                             onChange={(e) => setCountInStock(e.target.value)}
                         >
 
                         </Form.Control>
                     </Form.Group>

                     <Form.Group controlId='category' style={{ margin: '1rem 0' }}>
                         <Form.Label>category</Form.Label>
                         <Form.Control
                             type='text'
 
                             placeholder='Enter category'
                             value={category}
                             onChange={(e) => setCategory(e.target.value)}
                         >
 
                         </Form.Control>
                     </Form.Group>

                     <Form.Group controlId='description' style={{ margin: '1rem 0' }}>
                         <Form.Label>Description</Form.Label>
                         <Form.Control
                             type='text'
 
                             placeholder='Enter description'
                             value={description}
                             onChange={(e) => setDescription(e.target.value)}
                         >
 
                         </Form.Control>
                     </Form.Group>
                     
                     
 
 
 
                     <Form.Group style={{ margin: '1rem 0' }}>
                         <Button type='submit' variant='primary'>
                             Update
                         </Button>
                     </Form.Group>
 
                 </Form>
 
           
                )}
            </FormContainer>
               
        </div>

    )
}

export default ProductEditScreen