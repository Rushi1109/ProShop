import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/slices/productSlice.js';
import Loader from '../components/Loader';
import Message from '../components/Message';


const HomeScreen = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.productReducer.products);
    const status = useSelector(state => state.productReducer.status);
    const error = useSelector(state => state.productReducer.error);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    return (
        <>
            <h1>Latest Products</h1>
            {status === 'loading' ? (
                <Loader />
            ) : status === 'failed' ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )
            }
        </>
    )
}

export default HomeScreen;
