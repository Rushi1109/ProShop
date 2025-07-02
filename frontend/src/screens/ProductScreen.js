import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { fetchProductDetailsStart, fetchProductDetailsSuccess, fetchProductDetailsFailure } from '../features/productDetailsSlice'
import { useNavigate } from "react-router-dom";
import { productCreateReviewrequest, productCreateReviewsuccess, productCreateReviewfailure, productCreateReviewreset } from '../features/productCreateReviewSlice'

const ProductScreen = ({ match }) => {

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const { id } = useParams()
    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );
    // const [product,setProduct]=useState([])
    const { userInfo } = useSelector(
        (state) => state.userLogin
    );

    const productCreateReview=useSelector(state=>state.productCreateReview)
    const {loadingProductReview,error:errorProductReview,success:successProductReview} = productCreateReview
    
    const fetchDetails = ()=>async () => {
        dispatch(fetchProductDetailsStart());
        try {
            const { data } = await axios.get(`/api/products/${id}`)
            dispatch(fetchProductDetailsSuccess(data));
        } catch (err) {

            dispatch(fetchProductDetailsFailure(err.responsse && err.responsse.data.detail ? err.response.data.detail : err.message));
        }
    }


    useEffect(() => {

        if(successProductReview){
            setRating(0)
            setComment('')
            dispatch(productCreateReviewreset())
        }
        
      

        dispatch(fetchDetails())
    }, [dispatch, id,successProductReview])

    const navigate = useNavigate();

    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
        console.log('Add to cart:', id)
    }

    const submitHanlder=(e)=>{
        e.preventDefault();
        dispatch(createProductReview(id,{
            rating,
            comment
        }))
    }

    const createProductReview = (productId,review) => async (dispatch, getState) => {
        try {
            dispatch(productCreateReviewrequest())
            
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
    
            }
            const { data } = await axios.post(`/api/products/${productId}/reviews/`,review,config)
            
             dispatch(productCreateReviewsuccess(data));
          
            
        } catch (error) {
            dispatch(productCreateReviewfailure(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
          
        }
    }
    


    // const product=products.find((p)=>p._id==id)
    return (
        <div>
            <Link to='/' className='btn btn-light my-3 '>Go Back</Link>
            {loading ?
                <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>

                       
                        <Row>
                            <Col md={6}>
                                <Image src={product.image} alt={product.name} fluid />

                            </Col>
                            <Col md={3}>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h3>{product.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Price:{product.price}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        Description:{product.description}
                                    </ListGroup.Item>

                                </ListGroup>

                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${product.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {product.countInStock > 0 && (
                                            <ListGroupItem>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col xs='auto' className='my-1'>
                                                        <Form.Select
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {
                                                                [...Array(product.countInStock).keys()].map((x) => (
                                                                    <option key={x + 1} value={x + 1}>
                                                                        {x + 1}
                                                                    </option>
                                                                ))
                                                            }

                                                        </Form.Select>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )}


                                        <ListGroup.Item>
                                            <Row>
                                                <Button bsSize="large" onClick={addToCartHandler} disabled={product.countInStock == 0} block >Add to Cart</Button>
                                            </Row>

                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>
                        
                        <Row style={{marginTop:'25px'}}>
                            <Col md={6} >
                                <h4>Reviews</h4>
                                {product.reviews.length===0 && <Message variant='info'>No Reviews</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews.map((review)=>(
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} color='#f8e825' />
                                            <p>{review.createdAt.substring(0,10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h4>Write a review</h4>
                                        {loadingProductReview && <Loader/>}
                                        {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                        {userInfo ?(
                                            <Form onSubmit={(e)=>submitHanlder(e)}>
                                                 
                                                <Form.Group controlId='rating'  Lable='rating' style={{marginTop:'15px'}}>
                                                <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        Lable='rating'
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e)=>setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Vary Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                
                                                <Form.Group controlId='comment'
                                                    style={{marginTop:'15px'}}         
                                                    >
                                                    <Form.Label>Review</Form.Label>
                                                    <Form.Control Lable='Review' as='textarea'
                                                             row='5'
                                                             value={comment}
                                                             onChange={(e)=>setComment(e.target.value)}>
                                                       
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button 
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                    style={{marginTop:'15px'}}
                                                    
                                                >
                                                    Submit
                                                </Button>
                                            </Form>
                                        ):(
                                            <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>


                        </div>
                    )
            }



        </div>
    )
}

export default ProductScreen