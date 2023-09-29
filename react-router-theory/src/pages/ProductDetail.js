import React from 'react'
import { Link, useParams } from 'react-router-dom'

export const ProductDetail = () => {
  const params = useParams();
  
  return (
    <div>
      ProductDetail {params['productId']}
      <Link to='..' relative='path'>Back</Link> 
    </div>
  )
}
