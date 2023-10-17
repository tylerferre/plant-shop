import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserContext = createContext({})
const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProvider = (props: any) => {

    const Navigate = useNavigate()
    
    const initUserState: object = {
        user: JSON.parse(localStorage.getItem('user') || '{}'),
        token: localStorage.getItem('token') || ''
    }

    const [ userState, setUserState ] = useState(initUserState)
    const [productData, setProductData] = useState([])
    const [reviews, setReviews] = useState([])
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true' ? true : false || false)
    
    const signup = (credentials: object) => {
        axios.post('/proxy/auth/signup', credentials)
        .then(res => {
            const {user, token} = res['data']
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevState => ({
                ...prevState,
                user,
                token
            }))
            Navigate('/profile')
        })
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const login = (credentials: object) => {
        axios.post('/proxy/auth/login', credentials)
        .then(res => {
            const {user, token} = res['data']
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevState => ({
                ...prevState,
                user,
                token
            }))
            Navigate('/profile')
        }) 
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({user: {}, token: ''})
        Navigate( -1 )
    }

    const updateUser = (userId:string, updatedUser:object) => {
        userAxios.put(`/proxy/api/user/${userId}`, updatedUser)
        .then(res => { setUserState(prevState => ({
            ...prevState,
            user: res['data']
        }))
            logout()
        })
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const getProducts = () => {
        axios.get('/proxy/products')
        .then(res => setProductData(res['data']))
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const searchProduct = (input:string) => {
        axios.get(`/proxy/products/search/product?product=${input}`)
        .then(res => setProductData(res['data']))
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const filterStock = (input:any) => {
        axios.get(`/proxy/products/filter?inStock=${input}`)
        .then(res => setProductData(res['data']))
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const getReviews = () => {
        axios.get('/proxy/review')
        .then(res => setReviews(res['data']))
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const postReview = (newReview:object, productId:string) => {
        userAxios.post(`/proxy/api/review/${productId}`, newReview)
        .then((res) => {
            setReviews((prevState:any[]):any => [...prevState, res['data']])
            getReviews()
        })
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const deleteReview = (reviewId:string) => {
        userAxios.delete(`/proxy/api/review/${reviewId}`)
        .then(() => {
            setReviews(prevState => (
                prevState.filter((item:any) => item['_id'] !== reviewId)
            ))
        })
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const upVote = (reviewId:string) => {
        userAxios.put(`/proxy/api/review/upVote/${reviewId}`)
        .then(res => {
            setReviews((prevState:any):any => ([...prevState, prevState.map((review:any) => reviewId !== review['_id'] ? review : res['data'])]))
        })
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    const downVote = (reviewId:string) => {
        userAxios.put(`/proxy/api/review/downVote/${reviewId}`)
        .then(res => {
            setReviews((prevState:any):any => ([...prevState, prevState.map((review:any) => reviewId !== review['_id'] ? review : res['data'])]))
        })
        .catch(err => console.log(err['response']['data']['errMsg']))
    }

    useEffect(()=> {
        getReviews()
    },[])

    useEffect(()=> {
        getProducts()
    }, [])

    // const toggleDark = () => {
    //     setDarkMode(prevState => !prevState)
    // }

    return (
        <UserContext.Provider
            value={{
                ...userState,
                productData,
                signup,
                login,
                logout,
                updateUser,
                darkMode,
                setDarkMode,
                getProducts,
                reviews,
                getReviews,
                postReview,
                deleteReview,
                upVote,
                downVote,
                searchProduct,
                filterStock
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext, UserProvider}