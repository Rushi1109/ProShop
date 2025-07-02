import React from 'react'
import { Button,Form } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'


const SearchBox = () => {

    const [keyword,setKeyword]=useState('')
    let location = useLocation();

    const navigate=useNavigate()




    const submitHandler=(e)=>{
        e.preventDefault()
        if(keyword){
            navigate(`/?keyword=${keyword}&page=1`)
            
        }else{
            navigate(navigate(location.pathname))
        }
    }

  return (
    <Form className='d-flex' onSubmit={(e)=>submitHandler(e)} style={{color:'black'}} >
        <Form.Control
        type='search'
        name='q'
        onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Search..'
        className='mr-sm-2 ml-sm-5 me-2'
        style={{color:'black'}}
        >

        </Form.Control>
        <Button
            type='submit'
            variant='outline-success'
            className='p-2'
        >Search</Button>
    </Form>
  )
}

export default SearchBox