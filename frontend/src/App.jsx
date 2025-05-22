import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';
import RegisterForm from './Pages/RegisterForm';
import LoginForm from './Pages/LoginForm';
import './index.css'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/auth" element={<LoginForm />} /> 
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