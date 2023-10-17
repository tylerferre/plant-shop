import React from 'react'
import { Link } from 'react-router-dom'

const Product = (props:any) => {
    return (
        <Link className='productLink' to={`/product/${props['_id']}`}>
            <div className='product'>
                    <img src={props['imgUrl']} alt="productPic" />
                    <>
                        <h2>{props['title']}</h2>
                        <h3>{`$${props['price']}`}</h3>
                        <p>{props['inStock'] ? 
                        <span style={{color: 'green'}}>In Stock</span> 
                        : 
                        <span style={{color: 'red'}}>Out of Stock</span> }</p>
                    </>
                    
            </div>
        </Link>
    )
}

export default Product