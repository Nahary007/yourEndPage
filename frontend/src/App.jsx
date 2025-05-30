import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import RegisterForm from './Pages/RegisterForm';
import LoginForm from './Pages/LoginForm';
import HomePage from './Pages/homePage';
import ProtectedRoute from './ProtectedRoute';
import UpdateProfile from './Pages/UpdateProfile';
import CreatePage from './Pages/CreatePage';
import Myposts from './Pages/Myposts';
import './index.css'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/auth" element={<LoginForm />} /> 
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/profile/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/myposts"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/CreateEndPage"
          element={
            <ProtectedRoute>
              <CreatePage />
            </ProtectedRoute>
          }
        /> 
        {/* <Route path="/auth" element={<Auth />} />        
        <Route path='/homePage' element={<EmailUI />}/>
        <Route path="/endpage" element={<EndPage />} />
        <Route path='/faq' element={<Faq />}/>
        <Route path='chat' element={<Chat/>}/> */}
      </Routes>
    </>
  )
}

export default App