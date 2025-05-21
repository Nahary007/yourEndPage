import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path='/homePage' element={<EmailUI />}/>
        <Route path="/endpage" element={<EndPage />} />
        <Route path='/faq' element={<Faq />}/>
        <Route path='chat' element={<Chat/>}/> */}
      </Routes>
    </>
  )
}

export default App