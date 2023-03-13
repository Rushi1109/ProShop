import React, { useEffect } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Message from '../components/Message';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../redux/slices/cartSlice';

const CartScreen = () => {
    // To get the product id from parameter
    const parameters = useParams();

    const dispatch = useDispatch();
    // To get the qty from url 
    const location = useLocation();

    const navigate = useNavigate();

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    useEffect(() => {
        if (parameters.id) {
            const id = parameters.id;
            const args = {
                id,
                qty
            }
            dispatch(addProductToCart(args));
        }
    }, [dispatch, parameters.id, qty]);

    const cartItems = useSelector(state => state.cartReducer.cart);

    const changeQtyHandler = (id, qty) => {
        const args = {
            id,
            qty
        };
        dispatch(addProductToCart(args));
    }

    const removeFromCartHandler = (id) => {
        console.log('remove');
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shoping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go back</Link></Message>
                    : (<ListGroup variant='flsuh'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => changeQtyHandler(item.product, Number(e.target.value))}>
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>{x + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
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
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            ${cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0)}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>
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
