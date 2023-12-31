import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch,useSelector } from 'react-redux';
import { listProductDetail } from '../redux/slices/productDetailSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {

    const [qty, setQty] = useState(1);

    // To get the product id from url
    const parameters = useParams();

    // To dispatch the method to action
    const dispatch = useDispatch();

    // To navigate to cart 
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(listProductDetail(parameters.id));
    }, [dispatch, parameters.id]);

    const product = useSelector(state => state.productDetailReducer.product);
    const status = useSelector(state => state.productDetailReducer.status);
    const error = useSelector(state => state.productDetailReducer.error);

    const addToCartHandler = () => {
        // navigate cart with product id and qty in url
        navigate(`/cart/${parameters.id}?qty=${qty}`);
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/' state={qty}>Go Back</Link>

            {status === 'loading' ? (
                <Loader />
            ) : status === 'failed' ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{product.name}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}></Rating>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col><strong>${product.price}</strong> </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col><strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong></Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty:</Col>
                                            <Col>
                                                <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}

                                <ListGroup.Item>
                                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )
            }
        </>
    )
}

export default ProductScreen
