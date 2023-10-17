import {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider'

const Settings = () => {
const {darkMode, setDarkMode, user, updateUser, logout}: any = useContext(UserContext)
const [userEdit, setUserEdit] = useState(false)
const initForm = {firstName: user['firstName'], lastName: user['lastName'], email: user['email']}
const [formData, setFormData] = useState(initForm)

const editToggle = () => {
    setUserEdit(prev => !prev)
}

const handle = (e:any) => {
    let {checked} = e.target
    if(checked === true){
        setDarkMode(true)
        localStorage.setItem('darkMode', 'true')
    }else if(checked === false){
        setDarkMode(false)
        localStorage.setItem('darkMode', 'false')
    }
}

const handleChange = (e:any) => {
    const {name, value} = e['target']
    setFormData(prevState => ({
            ...prevState,
            [name]: value
        }
    ))
}

const handleSubmit = (e:any) => {
    e.preventDefault()

    updateUser(user['_id'], formData)
    setFormData(initForm)
    setUserEdit(false)
}



    // return(
    //     <>
    //         {!userEdit ? <div className='settings'>
    //             <div className='darkThemeSetting'>
    //                 <p>Dark theme</p>
    //                 <div className="ThemeContainer">
    //                     <label className="switch">
    //                     <input 
    //                         type="checkbox" 
    //                         id="checkbox" 
    //                         onChange={handle}
    //                         checked={darkMode} />
    //                     <div className="slider round"></div>
    //                     </label>
    //             </div>
    //             </div>
                
    //             <p>Personal Information</p>
    //             <p className='settingsP'>First Name: <span>{user['firstName']}</span></p>
    //             <p className='settingsP'>Last Name: <span>{user['lastName']}</span></p>
    //             <p className='settingsP'>Email: <span>{user['email']}</span></p>
    //             <button onClick={editToggle}>Edit Account</button>
    //         </div>
    //         :
    //         <div className='userUpdateForm'>
    //         <form >
    //             <input 
    //                 type="text"
    //                 name='firstName'
    //                 placeholder='First Name'
    //                 value={formData['firstName']}
    //                 onChange={handleChange}
    //             />
    //             <input 
    //                 type="text"
    //                 name='lastName'
    //                 placeholder='last Name'
    //                 value={formData['lastName']}
    //                 onChange={handleChange}
    //             />
    //             <input 
    //                 type="text"
    //                 name='email'
    //                 placeholder='Email'
    //                 value={formData['email']}
    //                 onChange={handleChange}
    //             />
    //             <button>Enter</button>
    //         </form>
    //         <button onClick={editToggle}>Cancel</button>
    //         </div>}
    //     </>
    // )


    return(
        <>
            <div className='settings'>
                <div className='darkThemeSetting'>
                    <p>Dark theme</p>
                    <div className="ThemeContainer">
                        <label className="switch">
                        <input 
                            type="checkbox" 
                            id="checkbox" 
                            onChange={handle}
                            checked={darkMode} />
                        <div className="slider round"></div>
                        </label>
                </div>
                </div>
                
                <p>Personal Information</p>
                <p className='settingsP'>First Name: {!userEdit ? <span>{user['firstName']}</span> : <input 
                    type="text"
                    name='firstName'
                    placeholder={user['firstName']}
                    value={formData['firstName']}
                    onChange={handleChange}
                />}</p>
                <p className='settingsP'>Last Name: {!userEdit ? <span>{user['lastName']}</span> : <input 
                    type="text"
                    name='lastName'
                    placeholder={user['lastName']}
                    value={formData['lastName']}
                    onChange={handleChange}
                />}</p>
                <p className='settingsP'>Email: {!userEdit ? <span>{user['email']}</span> : <input 
                    type="text"
                    name='email'
                    placeholder={user['email']}
                    value={formData['email']}
                    onChange={handleChange}
                />}</p>
                {!userEdit ? <button onClick={editToggle}>Edit Account</button> : <button onClick={handleSubmit}>Enter</button>}
            </div>
            {userEdit && <button style={{marginLeft: '100px'}} onClick={editToggle}>Cancel</button>}
        </>
    )
}

export default Settings