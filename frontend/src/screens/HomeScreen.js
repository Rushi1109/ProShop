import React, { useState, useEffect } from 'react'
// import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsFailure, fetchProductsStart, fetchProductsSuccess } from '../features/productSlice'
import { useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = () => {
  // const [products,setProducts]=useState([])
  const location=useLocation()

  let keyword=location.search
  // keyword=keyword.slice(1)
  console.log(keyword)


  const dispatch = useDispatch()
  const { productList, loading, error,page,pages } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {

    const fetchProducts = (keyword='')=>async () => {
      dispatch(fetchProductsStart());
      try {
        const { data } = await axios.get(`/api/products${keyword}`)
        dispatch(fetchProductsSuccess(data));
      } catch (err) {

        dispatch(fetchProductsFailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
      }
    }






    // async function fetchProducts(){
    //   const {data}= await axios.get('/api/products/')
    //   console.log(data)
    //   dispatch(listProducts(data))
    // }

    dispatch(fetchProducts(keyword))
  }, [dispatch,keyword])



  return (
    <div>
      {!keyword &&    <ProductCarousel/> }
   
      <h1>Latest Products</h1>
      {loading ? <Loader/>
        : error ? <Message variant='danger'>{error}</Message>
          :
          <div>

         
          <Row>
            {productList.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        
          <Paginate page={page} pages={pages} keyword={keyword}/>
          </div>


      }


    </div>
  )
}

export default HomeScreen