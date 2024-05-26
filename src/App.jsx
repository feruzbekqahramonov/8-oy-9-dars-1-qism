import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Scroll from './pages/Scroll'
function App() { 
  return (
    <div>
      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/scroll' element={<Scroll></Scroll>}></Route>
      </Routes>
    </div>
  )
}

export default App
