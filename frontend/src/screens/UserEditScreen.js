import React, { useState, useEffect } from 'react'
import { Link, redirect,useParams } from 'react-router-dom'
import { Form, Butoon, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { userDetailStart, userDetailSuccess, userDetailFail, userDetailReset } from '../features/userDetailSlice'
import FormContainer from '../components/FormContainer'
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { userLoginSuccess } from '../features/userLoginSlice'
import {userupdateadminrequest,userupdateadminsuccess, userupdateadminfail,userupdateadminreset } from '../features/userUpdateAdminSlice'



const UserEditScreen = () => {


    const { id } = useParams()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)



    let location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo,loading:loadinguser,error:loadingerror}=userLogin
   

    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)
    const { loading:loadingUpdate, error:errorUpdate,success:successUpdate } = userUpdateAdmin

    const userDetail = useSelector(state => state.userDetail)
    const { user, loading, error } = userDetail

    const getUserDetail=(id)=>async()=>{
        try{
            dispatch(userDetailStart())
            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }
    
            }
            const {data} = await axios.get(`/api/users/${id}/`,config)
            console.log(data);
            dispatch(userDetailSuccess(data))
    
           
        }catch(error){
            dispatch(userDetailFail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
           
        }
    }
    


    useEffect(() => {
        if(successUpdate){
            dispatch(userupdateadminreset())
            navigate('/admin/userlist')
        }else{

            if(!user.name || user._id!=Number(id)){
                dispatch(getUserDetail(id));
            }
            else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }


       
    }, [user,id,successUpdate,navigate])



    const submitHandler = (e) => {
        e.preventDefault();
        console.log(isAdmin)
        dispatch(updateUser({ _id:user._id,name,email,isAdmin}))



    }

    const updateUser=(user)=>async()=>{
        try{
            dispatch(userupdateadminrequest())
            const config={
                headers:{
                    'Content-type':'application/json',
                    Authorization:`Bearer ${userInfo.token}`
                }
    
            }
            const {data} = await axios.put(`/api/users/update/${user._id}/`,user,config)
            dispatch(userupdateadminsuccess())
            dispatch(userDetailSuccess(data))
           
        }catch(error){
            dispatch( userupdateadminfail(
                error.response && error.response.data.detail ? error.response.data.detail : error.message,
            ))
            
        }
    }
      
    


    return (
        <div>
            <Link to='/admin/userlist'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader/>}
                {
                    errorUpdate && <Message variant='danger'>{errorUpdate}</Message>
                }
                {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
                  :(
                     <Form onSubmit={submitHandler}>

                     <Form.Group controlId='name' style={{ margin: '1rem 0' }}>
                         <Form.Label>Name</Form.Label>
                         <Form.Control
                             type='name'
 
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
 
                             placeholder='Enter Email'
                             value={email}
                             onChange={(e) => setEmail(e.target.value)}
                         >
 
                         </Form.Control>
                     </Form.Group>
                     <Form.Group controlId='isAdmin' style={{ margin: '1rem 0' }}>
 
                         <Form.Check
                             type='checkbox'
 
                             label='Is Admin'
                             checked={isAdmin}
                             onChange={(e) => setIsAdmin(e.target.checked)}
                         >
 
                         </Form.Check>
                     </Form.Group>
 
 
 
                     <Form.Group style={{ margin: '1rem 0' }}>
                         <Button type='submit' variant='primary'>
                             Update
                         </Button>
                     </Form.Group>
 
                 </Form>
 
           
                )}
            </FormContainer>
               
        </div>

    )
}

export default UserEditScreen