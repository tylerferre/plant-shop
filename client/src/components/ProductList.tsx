import React from 'react'
import Product from './Product'


const ProductList = (props:any) => {
    return (
        <div className='productList'>
            {props['products'].map((product:any, index: number) => <Product {...product} key={index}/>)}
        </div>
    )
}

export default ProductList