import {useContext, useEffect} from 'react'
import HomeProducts from './HomeProducts'
import { UserContext } from '../context/UserProvider'

const Home = () => {

    const {getProducts}:any = useContext(UserContext)
    useEffect(()=> {
        getProducts()
    },[])
    
    return (
        <div className='home'>
            <h1>Welcome to Plant Store!</h1>
            <div className='homeProductBanner'>
                <HomeProducts/>
            </div>
        
        </div>
    )
}

export default Home 