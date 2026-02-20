import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import { lazy, Suspense } from 'react'
import Loader from './components/Loader';
const Contact = lazy(() => import('./Pages/Contact'));
const About = lazy(() => import('./Pages/About'));
const ScrollToTop = lazy(() => import('./components/ScrollToTop'));


function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='About' element={<About />} />
            <Route path='Contact' element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
