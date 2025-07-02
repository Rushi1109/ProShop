import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { cartAddItem ,cartRemoveItem} from '../features/cartSlice'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const CartScreen = () => {
  const { id } = useParams()
  const productId = id
  const location = useLocation();
  const navigate=useNavigate();

  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  const dispatch = useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
 

  const addToCart = (id, qty)=>async () => {

    const { data } = await axios.get(`/api/products/${id}`)
    const items = {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty

    }
   
    dispatch(cartAddItem(items));
  }


  useEffect(() => {
    if (productId) {
      dispatch(addToCart(id,qty))
    }
  }, [dispatch, id, qty])

  const removeFromCartHandler = (id)=>() =>{
  
    dispatch(cartRemoveItem(id))
  }


  const checkoutHandler=()=>{
      navigate('/login?redirect=shipping')
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush' >
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>

                  <Col md={2}>
                    ${item.price}
                  </Col>
                  <Col md={3}>
                    <Form.Select
                      as='select'
                      value={item.qty}
                      onChange={(e) =>dispatch(addToCart(item.product,Number(e.target.value)))}
                    >
                      {
                        [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }

                    </Form.Select>
                  </Col>
                  <Col md={1}>
                    <Button 
                    type='button' 
                    variant='light'
                    onClick={()=>dispatch(removeFromCartHandler(item.product))}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>

            ))}


          </ListGroup>
        )}
      </Col>

      <Col md={4}>
              <Card>
                  <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <h2>SubTotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h2>
                        ${cartItems.reduce((acc,item)=>acc + item.qty * item.price,0).toFixed(2)}
                      </ListGroup.Item>
                      <ListGroup.Item>
                    <Button
                      type='button'
                      bsSize="large"
                      className='btn-block'
                      style={{width:'100%'}}
                      disabled={cartItems.length===0}
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout

                    </Button>
                  </ListGroup.Item>

                  </ListGroup>
                  
                  
              </Card>          
      </Col>
    </Row>
  )
}

export default CartScreen