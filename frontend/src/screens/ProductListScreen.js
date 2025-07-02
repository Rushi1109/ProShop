import React,{useState,useEffect} from 'react'
import {Link, redirect} from 'react-router-dom'
import {Form ,Butoon,Row,Col,Button,Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userListRequest,userListSuccess, userListFail, userListReset} from '../features/userListSlice'
import {productDeleteStart,productDeleteSuccess,productDeleteFailure} from '../features/productDeleteSlice'
import Paginate from '../components/Paginate'
import { LinkContainer } from 'react-router-bootstrap'
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from '../features/productSlice'
import {productcreaterequest,productcreatesuccess,productcreatefailure, productcreatereset } from '../features/productCreateSlice'


const ProductListScreen = () => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {productList,loading,error,page,pages}=useSelector(state=>state.productList)
 
  const {loading:loadingDelete,success:successDelete,error:errorDelete}=useSelector(state=>state.productDelete)
 
  const {product:createdProduct,loading:loadingCreate,success:successCreate,error:errorCreate}=useSelector(state=>state.productCreate)
 

  const { userInfo } = useSelector(state => state.userLogin)


   const fetchProducts = (keyword='')=>async () => {
      dispatch(fetchProductsStart());
      try {
        const { data } = await axios.get(`/api/products${keyword}`)
        dispatch(fetchProductsSuccess(data));
      } catch (err) {

        dispatch(fetchProductsFailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
      }
    }
  const location=useLocation()
  let keyword=location.search
  // let keyword = keywords.slice(1);
  console.log(keyword)
  useEffect(()=>{
    dispatch(productcreatereset())
    
    if(!userInfo.isAdmin){
       navigate('/login')
    }
    if(successCreate){
      navigate(`/admin/product/${createdProduct._id}/edit`)
    }else{
      dispatch(fetchProducts(keyword))
    }
    
  },[dispatch,navigate,userInfo,successDelete,successCreate,createdProduct,keyword])

  
const deleteProduct = (id) => async (dispatch, getState) => {
  try {
      dispatch(productDeleteStart())
      // const userInfo = getState().userLogin;
      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }

      }
      const { data } = await axios.delete(`/api/products/delete/${id}`,config)
      
       dispatch(productDeleteSuccess(data));
    

  } catch (error) {
      dispatch(productDeleteFailure(
          error.response && error.response.data.detail ? error.response.data.detail : error.message,
      ))
    
  }
}
  

 

  const deleteHandler=(id)=>{
    if(window.confirm('Are you sure you want to delete this product?')){
     
      dispatch(deleteProduct(id))
    }
    
  
  }

  
const createProduct = () => async (dispatch, getState) => {
  try {
      dispatch(productcreaterequest())
      // const userInfo = getState().userLogin;
      const config = {
          headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`
          }

      }
      const { data } = await axios.post(`/api/products/create/`,{},config)
      
       dispatch(productcreatesuccess(data));
    

  } catch (error) {
      dispatch(productcreatefailure(
          error.response && error.response.data.detail ? error.response.data.detail : error.message,
      ))
    
  }
}

  const createProductHandler=()=>{
    //create product
    console.log('created')
    dispatch(createProduct())
  }





  return (
    <div>
      <Row className='align-items-center'>
        <Col>
            <h1>Products</h1>
        </Col>
        <Col className='text-right'>
            <Button className='my-3' onClick={()=>createProductHandler()}>
                <i className='fas fa-plus'></i> Create Product
            </Button>

        </Col>

      </Row>

      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loadingCreate && <Loader/>}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

      {loading 
        ?( <Loader/>)
        :error
          ?(<Message variant='danger'>{error}</Message>)
          :(
            <div>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                </tr>
                
                
                
              </thead>
              <tbody>
                { productList.map(product=>(
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    
                    <td>
                      <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light'className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                       <Button variant='danger'className='btn-sm' onClick={()=>deleteHandler(product._id)} >
                          <i className='fas fa-trash'></i>
                        </Button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate pages={pages} page={page} isAdmin={true}/>
            </div>
          )

    }
    </div>
  )
}

export default ProductListScreen