import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'


const Profile = () => {

    const { logout, darkMode, user }: any = useContext(UserContext)
    const theme = !darkMode ? 'profile' : 'darkProfile'

    return (
        <div className={theme}>
            <div className='profilePic'>
                <img src={user['profilePic']} alt="profilePic" />
            </div>
            <div className='profileInfo'>
                <h1>{`${user['firstName']} ${user['lastName']}`}</h1>
                <h2>{user['email']}</h2>
            </div>
            <Link to='/settings'>{<h3>Account Settings</h3>}</Link>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile