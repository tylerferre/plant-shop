import {useContext, useEffect, useState} from 'react'
import { UserContext } from '../context/UserProvider'
import Product from './Product'


const Products = () => {
    const {productData, searchProduct, filterStock, getProducts}:any = useContext(UserContext)
    const productCards = productData.map((product:any, index:number) => <Product {...product} key={index}/>)

    const initForm = {search: ''}
    const [formData, setFormData] = useState(initForm)

    const initFilter = {filter: ''}
    const [filterData, setFilterData] = useState(initFilter)

    const handleChange = (e:any) => {
        const {value, name} = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]:value
        }))
    }
    
    const handleSubmit = (e:any) => {
        e.preventDefault()

        searchProduct(formData['search'])
        setFormData(initForm)
    }

    const handleFilter = (e:any) => {
        const {name, value} = e.target
        setFilterData(prevState => ({
            ...prevState, 
            [name]:value
        }))
        // if(filterData['filter'] === ''){
        //     getProducts()
        // }else if(filterData['filter'] === 'true'){
        //     filterStock(filterData['filter'])
        // }else if(filterData['filter'] === 'false'){
        //     filterStock(filterData['filter'])
        // }
    }

    useEffect(()=> {
        if(filterData['filter'] === ''){
            getProducts()
        } else if(filterData['filter'] === 'true'){
            filterStock('false')
        } else if(filterData['filter'] === 'false'){
            filterStock('true')
        }
    }, [handleFilter])

    return (
        <div className='productPage'>
            <select onChange={handleFilter} name='filter'>
                <option value="">All Products</option>
                <option value="false">In Stock</option>
                <option value="true">Out of Stock</option>
            </select>
            <form onSubmit={handleSubmit} className='searchForm'>
                <input 
                type="search"
                name='search'
                placeholder='Search for a product'
                value={formData['search']}
                onChange={handleChange}
                />
                <button>Search</button>
            </form>

            <section className='productCards'>
                {productCards}
            </section>
        </div>
    )
}

export default Products