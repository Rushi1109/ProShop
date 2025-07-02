import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({pages,page,keyword='',isAdmin=false}) => {
    console.log('KEYWORD:',)
    if(keyword){
        keyword=keyword.split('?keyword=')[1].split('&')[0]
        console.log(keyword)
    }
  return (pages >0 &&(
    <Pagination  size="lg">
         
        {[...Array(pages).keys()].map((x)=>(
            <LinkContainer key={x+1}
            to={
                {
                    pathname: !isAdmin ? '/':'/admin/productlist/',
                   
                    search:`keyword=${keyword}&page=${x+1}`
                }
             
              
                }>

                <Pagination.Item linkStyle={{background:'white',color:'black'}} active={x+1===page}>{x+1}</Pagination.Item>

            </LinkContainer>
        ))}
    </Pagination>
  )
    
  )
}

export default Paginate