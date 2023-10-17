import {useState, useContext} from 'react'
import { UserContext } from '../context/UserProvider'

const AuthForm = () => {
    const initSignupInputs: object = {firstname: '', lastName: '', email: '', password: ''}
    const initLoginInputs: object = {email: '', password: ''}
    const [loginToggle, setLoginToggle] = useState(true)
    const [inputs, setInputs] = useState(loginToggle ? initLoginInputs : initSignupInputs)
    const [password, setPassword] = useState(false)

    const { signup, login }: any = useContext(UserContext)

    const togglePassword = () => {
        setPassword(prevState => !prevState)
    }

    const handleChange = (e: any) => {
        const {name, value} = e['target']
        setInputs(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const toggle = () => {
        setLoginToggle(prevState => !prevState)
    }

    const handleSignup = (e: any) => {
        e.preventDefault()

        signup(inputs)
        setInputs(initSignupInputs)
    }

    const handleLogin = (e: any) => {
        e.preventDefault()

        login(inputs)
        setInputs(initLoginInputs)
    }

    return (
        <div className='authForm'>
            <>
                { !loginToggle ? <form onSubmit={handleSignup} className='signupForm'>
                    <h2>Sign up</h2>
                    <input
                        type="text" 
                        name="firstName" 
                        value={Object(inputs)['firstName']} 
                        onChange={handleChange}
                        placeholder='First Name'
                        required
                    />
                    <input
                        type="text" 
                        name="lastName" 
                        value={Object(inputs)['lastName']} 
                        onChange={handleChange}
                        placeholder='Last Name'
                        required
                    />
                    <input
                        type="text" 
                        name="email" 
                        value={Object(inputs)['email']}
                        onChange={handleChange}
                        placeholder='Email'
                        required
                    />
                    <div className='passDiv'>
                        <input
                            type={!password ? 'password' : 'text'} 
                            name="password" 
                            value={Object(inputs)['password']}
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                        <span onClick={togglePassword} className='passToggle' >{!password ? <span style={{marginTop: '6px'}} className="material-symbols-rounded">visibility</span> : <span style={{marginTop: '6px'}} className="material-symbols-rounded">visibility_off</span>}</span>
                    </div>
                    
                    <button>Submit</button>
                </form>
                    :
                <form onSubmit={handleLogin} className='loginForm'>   
                    <h2>Login</h2>
                    <input
                        type="text" 
                        name="email" 
                        value={Object(inputs)['email']}
                        onChange={handleChange}
                        placeholder='Email'
                        required
                    />
                    <div className='passDiv'>
                        <input
                            type={!password ? 'password' : 'text'} 
                            name="password" 
                            value={Object(inputs)['password']} 
                            onChange={handleChange}
                            placeholder='Password'
                            required
                        />
                        <span onClick={togglePassword} className='passToggle' >{!password ? <span style={{marginTop: '6px'}} className="material-symbols-rounded">visibility</span> : <span style={{marginTop: '6px'}} className="material-symbols-rounded">visibility_off</span>}</span>
                    </div>
                    
                    <button>Submit</button>
                </form> }
            </>
            <p onClick={toggle}>{loginToggle ? 'Not a Member?' : 'Already a Member?'}</p>
        </div>

    )
}

export default AuthForm 

