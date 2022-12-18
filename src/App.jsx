import { useState , useEffect } from 'react'
 import './App.css'
import Analytics from './pages/Analytics'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from './redux/features/table/tableSlice'
import { BrowserRouter as  Router , Route , Routes } from 'react-router-dom'
function App() {

  return (
    <>
      <Router>
        <Routes>        <Route  path='/' element={<Analytics/>} /></Routes>

      </Router>
      
    </>
  )
}

export default App
