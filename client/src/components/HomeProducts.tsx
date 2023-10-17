import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserProvider'
import ProductList from './ProductList'


const HomeProducts = () => {

    const {productData}: any = useContext(UserContext)

    return (
        <div className='HomeProducts'>
            <ProductList products={productData} />
        </div>
    )
}

export default HomeProducts