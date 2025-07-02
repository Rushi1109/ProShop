import React,{useState,useEffect} from 'react'
import {Link, redirect} from 'react-router-dom'
import {Form ,Butoon,Row,Col,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userRegisterStart,userRegisterSuccess,userRegisterFail,userLogout } from '../features/userRegisterSlice'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userLoginSuccess } from '../features/userLoginSlice'



const RegisterScreen = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmpassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState('')

    let location = useLocation();
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const redirect=location.search ? location.search.split('=')[1]:'/'

    const userRegister=useSelector(state=>state.userRegister)
    const {userInfo,loading,error}=userRegister
    
    useEffect(()=>{
        if(userInfo){
            console.log('userInfo',userInfo)
            if(redirect=='/'){
                navigate(redirect)
            }
            else{
                navigate(`/${redirect}`)
            }
            
        }
    },[navigate,userInfo,redirect])

    const register=(name,email,password)=>async()=>{
        try{
            dispatch(userRegisterStart())
            const config={
                headers:{
                    'Content-type':'application/json'
                }

            }
            const {data} = await axios.post('/api/users/register/',{'name':name,'email':email,'password':password},config)
            dispatch(userRegisterSuccess(data))
            dispatch(userLoginSuccess(data))
        }catch(error){
            dispatch(userRegisterFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
        }
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!=confirmpassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password));
        }
       



    }


  return (
    <FormContainer>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>

              <Form.Group controlId='name' style={{ margin: '1rem 0' }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                      type='name'
                      required
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='email' style={{ margin: '1rem 0' }}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                      type='email'
                      required
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>
              <Form.Group controlId='password' style={{ margin: '1rem 0' }}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      type='password'
                      required
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>

              <Form.Group controlId='passwordConfirm' style={{ margin: '1rem 0' }}>
                  <Form.Label>confirm Password</Form.Label>
                  <Form.Control
                      type='password'
                      required
                      placeholder='Confirm Password'
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                  >

                  </Form.Control>
              </Form.Group>

              <Form.Group style={{margin:'1rem 0'}}>
            <Button type='submit' variant='primary'>
                Register
            </Button>
            </Form.Group>

        </Form>
        <Row className='py-3'>
            <Col>
            Have an Account? <Link to={redirect ? `/login?redirect=${redirect}`:'/register'}>Sign In</Link></Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen