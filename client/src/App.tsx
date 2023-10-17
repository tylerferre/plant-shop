import { useContext } from 'react'
import {Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SideNav from './components/SideNav'
import AuthForm from './components/AuthForm'
import Profile from './components/Profile'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import ProtectedRoutes from './components/ProtectedRoutes'
import Settings from './components/Settings'
import { UserContext } from './context/UserProvider'
import ProductDetails from './components/ProductDetails'
import Products from './components/Products'


function App() {

const context = useContext(UserContext)
const theme = !Object(context)['darkMode'] ? "app" : 'darkApp'

  return (
    <div className={theme}>
      <Navbar/>
      <SideNav/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/auth' element={<AuthForm/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/product/:productId' element={<ProductDetails/>} />
          <Route path='/profile' 
          element={<ProtectedRoutes token={Object(context)['token']} redirect='/auth'>
            <Profile/>
          </ProtectedRoutes>}/>
          <Route path='/settings'
          element={<ProtectedRoutes token={Object(context)['token']} redirect='/auth'>
            <Settings/>
          </ProtectedRoutes>}
          />
        </Routes>
        
    </div>
  )
}

export default App
