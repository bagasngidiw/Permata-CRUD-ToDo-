import { useState } from 'react'
import viteLogo from '/vite.svg'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
// import './App.css'
import  Login  from './components/Login'
import Main from './Pages/Main'
import Register from './components/Register'
import Home from './Pages/Home'
import { useEffect } from 'react'

function App() {
  const Navigate = useNavigate()


  return (
    <>
      <Routes>
        <Route 
        path="/"
         element={
         <Main>
          <Register/>
         </Main>
         
      }/>
      <Route 
        path="/login"
         element={
         <Main>
          <Login/>
         </Main>
      }/>
      <Route path='/home' element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App
