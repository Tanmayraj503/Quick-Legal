import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Contact from './Pages/Contact'
import About from './Pages/About'
import ScrollToTop from './components/ScrollToTop'
function App() {


  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='About' element={<About />}/>
          <Route path='Contact' element={<Contact />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
