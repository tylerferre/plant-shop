import {useContext} from 'react'
import { Link } from 'react-router-dom'
import NavDetails from './NavDetails'
import { UserContext } from '../context/UserProvider'

const Navbar = () => {

    const { user }: any = useContext(UserContext)

    return (
        <div className='navbar'>
            
            <div className='leftNav'>
                <div className='menu'>
                    <button><span className="material-symbols-rounded">menu</span></button>
                    <div className='menuDetails'>
                       <NavDetails/> 
                    </div>
                </div>
                
                <h1>Logo</h1>
            </div>
            <div className='rightNav'>
                <h3>{user['firstName'] ? `${user['firstName']} ${user['lastName']}` : ''}</h3>
                <Link to='/profile'><img src={user['profilePic'] ? user['profilePic'] : 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0QDQ4ODw8QDxAQDQ0NDRANDQ8PEA0PFRIWFhURFRUYHSggGBolGxUTITIhJTUrLi4uFx8zODMsNygtLisBCgoKDQ0ODw0PDysZFRkrNysrNy03KysrNzcrLSsrKysrLSsrKystKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QALBABAAEDAQcCBgMBAAAAAAAAAAECAxEEITFBUWFxgRKhIjJCkbHRFHLB8f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5Mg6I6r9EfVHja8/yqOftIJhD/Ko5+0uxfon6o87ASjkTEugAAAAAAAAAAAAAAAAAAA811xEZnYD0hu6imnrPKFe9qKp2Rsj3lXwuJqevVVTu2R03oqqpnfMz3l5dVAAAACJxuTUamuOvdCGC9b1NM9J6/tOyktq/VT1jkmLrQHi3ciqMx56PaKAAAAAAAAAAAAA811xETM8Acu3IpjM+I5s+5cmqcz4jkXbk1TmfHR5akZtAAAAAAAAAAAAdoqmJzGxfsXoqjrxhnu01zE5go1B4tXIqjP36S9stAAAAAAAAAAChqruZxwj3la1Nz009Z2QzliV0BUAAAcB0S2tPVVt3R1WI0lHWfJpikL06SjrHlBd0tUbY2x7mmIAAAAAASWLnpq6TvaMMpc0dzNOOMfhKsWQEUAAAAAAByZBS1leascvygKpzMzznLjUZdAAAAWNLZz8U7o3RzlXadunERHKEpHoBGgAFTV2fqjz+1VqTDMrpxMxymYWM1wBQAASaevFUddko3Aaw8W6s0xPOHtloAAAAAAR6icUVdsJEOr+SfH5BQHHWmQAAAHaN8d4ajKaVqvNMSlWPYCKAAM7UfPV3aFU4jPLay6pzMzzmZWJQBUAAAAXtJPwdpmE6toZ+Gf7f5CyysABQAAABDq/knx+UyPURmirtkGcA0yAAAAJtPe9M4ndPshAakS6zbd2qndPidyenWc6ftKYurYqzrI4Uz5lBcv1Vb9kcoTDUmpv5+GN3GeauDSAAAAAALmh+Wf7f4soNFHwd5mU7KwAFAAAAHJjY6Aypjhy2CbV0Yq77ULUZAAAABJZszV0jmuW7FNPDM85NMUabVU7qZSRpa+n3XxNXFD+LX0+7xVZrjfTPja0g0xkutG5Zpq3x54ql7TzTt3x7wupiEAAABx17sUZqiPM9gX7NOKYjp7vYMtAAAAAAAAINXbzTnjG39qLVZ+otemrpO79LEqIBUE+mserbO78o7Nv1VY8z2aMRhLSQiHQRoAAAAABT1On+qnzH+qzVZ+ptemdm6d3TosZqIBQXNFb2ernsjsrWbfqqx9+zRiMbEpHQEaAAAAAAAAHi7biqMT/x7AZddMxOJcaF+zFUdeEqM0TE4nfua1nFzSUYpzxnb4TuRGIw6y0AAAAAAAAItRRmmY8wlAZLsRnZD1coxVMRHGcQuaex6ds7/wANay9WLXpjrxSgy0AAAAAAAAAAAAPNVETjPCYmHoAAAAAAAAAAAAB5iiMzONs8XoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/Z'}
                 className='navImg'></img></Link>
            </div>
        </div>
    )
}

export default Navbar