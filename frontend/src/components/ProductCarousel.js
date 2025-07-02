import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import axios from 'axios'
import { productToprequest,productTopsuccess,productTopfailure } from '../features/productTopSlice'


const ProductCarousel = () => {
    const dispatch=useDispatch()
    const productTopRated=useSelector(state=>state.productTopRated)
    const {products,loading,error}=productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

    const listTopProducts = ()=>async () => {
        dispatch(productToprequest());
        try {
          const { data } = await axios.get(`/api/products/top/`)
          dispatch(productTopsuccess(data));
        } catch (err) {
    
          dispatch(productTopfailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
        }
      }
    
  return ( loading ? <Loader/>
  :error
  ? <Message variant='danger'>{error}</Message>
      :(
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product=>(
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid/>
                        <Carousel.Caption className='carousel.caption'>
                            <h4>{product.name}(${product.price})</h4>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
      )

   
  )
}

export default ProductCarousel