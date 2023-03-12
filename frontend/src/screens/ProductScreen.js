import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch,useSelector } from 'react-redux';
import { listProductDetail } from '../redux/slices/productDetailSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {

    const parameters = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProductDetail(parameters.id));
    }, [dispatch]);

    const product = useSelector(state => state.productDetailReducer.product);
    const status = useSelector(state => state.productDetailReducer.status);
    const error = useSelector(state => state.productDetailReducer.error);

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>

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
                                <ListGroup.Item>
                                    <Button className='btn-block' type='button' disabled={product.countInStock === 0}>
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
