import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import RegisterForm from './pages/register';
import LoginForm from './pages/login';
import HomePage from './pages/home-page';
import ProtectedRoute from './ProtectedRoute';
import UpdateProfile from './pages/update-profile';
import CreatePage from './pages/create-page';
import Myposts from './pages/my-posts';
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