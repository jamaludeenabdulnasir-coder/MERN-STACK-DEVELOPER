import Register from './pages/Register'
import Login from './pages/Login'
import './css/App.css'
import './css/Register.css'
import './css/Login.css'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import NoPageFound from './pages/NoPageFound'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
 

  return (
    <>
    <Router>

      <Routes>

        <Route path='/' element={<Home/>}/>
        
        <Route path='/register' element={<Register/>}/>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='*' element={<NoPageFound/>}/>
      </Routes>



    </Router>
    
    </>
  )
}

export default App
