import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
    return (
        <>
            <Router>
                <Header />
                <main className='py-3'>
                    <Container>
                        <Routes>
                            <Route exact path='/' element={<HomeScreen />} />
                            <Route exact path='/product/:id' element={<ProductScreen />} />
                            <Route exact path='/cart/:id?' element={<CartScreen />} />
                            <Route exact path='/login' element={<LoginScreen />} />
                            <Route exact path='/register' element={<RegisterScreen />} />
                            <Route exact path='/profile' element={<ProfileScreen />} />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </Router>
        </>
    );
}

export default App;
