import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { userLogout } from '../features/userLoginSlice';
import { userDetailReset } from '../features/userDetailSlice';
import { orderListreset } from '../features/orderListSlice';
import { userListReset } from '../features/userListSlice';
import SearchBox from './SearchBox';

const Header = () => {

  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo}=userLogin
  const dispatch=useDispatch()
  const logoutHandler=()=>{
    dispatch(userLogout())
    dispatch(orderListreset())
    dispatch(userDetailReset())
    dispatch(userListReset())

  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' data-bs-theme="dark" expand="lg" className="bg-body-tertiary" collapseOnSelect>
      <Container fluid>
        <LinkContainer to="/">
        <Navbar.Brand >
        {/* <img
              src="../logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt=""
            /> */}
            ProShop</Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" >
          <SearchBox/>
          <Nav
            className="ms-auto ml-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           <LinkContainer  to="/cart">
            <Nav.Link><i className='fas fa-shopping-cart'></i>cart</Nav.Link>
           </LinkContainer>

            {userInfo ? (
              <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>


              </NavDropdown>
            ):(
              <LinkContainer to="/login">
              <Nav.Link ><i className='fas fa-user '></i>login</Nav.Link>
              </LinkContainer>

            )}

            {userInfo && userInfo.isAdmin && (
              <NavDropdown title='Admin' id='adminmenue'>
              <LinkContainer to='/admin/userlist'>
                <NavDropdown.Item>Users</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/admin/productlist'>
                <NavDropdown.Item>Products</NavDropdown.Item>
              </LinkContainer>

              <LinkContainer to='/admin/orderlist'>
                <NavDropdown.Item>Orders</NavDropdown.Item>
              </LinkContainer>


              

            </NavDropdown>
            )}

            
             
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header
