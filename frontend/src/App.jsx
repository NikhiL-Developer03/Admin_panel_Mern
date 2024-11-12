
import { Route, Routes } from 'react-router-dom'
import './App.css'
import EmployeeList from './pages/EmployeeList'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'

function App() {
 

  return (
 <div className=' '>
<Navbar/>
 <Routes>
 <Route path="/" element={<Home/>}
  />
  <Route path="/employee" element={<EmployeeList/>}/>
  <Route path="/Login" element={<Login/>}
  />
 </Routes>
 
 </div>
  )
}

export default App
