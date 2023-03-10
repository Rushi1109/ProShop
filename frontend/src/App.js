import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
    return (
        <>
            <Router>
                <Header />
                <main className='py-3'>
                    <Container>
                        <Routes>
                            <Route exact path='/' element={<HomeScreen />} />
                            <Route exact path='/product/:productId' element={<ProductScreen />} />
                        </Routes>
                    </Container>
                </main>
                <Footer />
            </Router>
        </>
    );
}

export default App;
