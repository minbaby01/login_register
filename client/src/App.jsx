import { Routes, Route } from 'react-router-dom'
import Navbar from '../src/component/Navbar'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import Home from '../src/pages/Home'
import { Toaster } from 'react-hot-toast';
// import { UserContextProvider } from '../context/userContext';
import LogOut from '../src/component/Logout';
import ChangePassword from '../src/pages/ChangePassword';
import Product from '../src/pages/Product';
import User from '../src/pages/User';

function App() {
  return (
    <>
    {/* <UserContextProvider> */}
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path='/product' element={<Product />}></Route>
        <Route path='/user' element={<User />}></Route>
      </Routes>
      {/* </UserContextProvider> */}
    </>
  )
}

export default App
