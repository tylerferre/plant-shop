import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const NavDetails = () => {

    const context = useContext(UserContext)

    return (
        <div className='navDetails'>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/about'>About</Link>
            <Link to='/contact'>Contact</Link>
            {Object(context)['token'] && <Link to='/profile'>Profile</Link>}
        </div>
    )
}

export default NavDetails