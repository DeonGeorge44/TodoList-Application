import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Add from './Add.jsx'
import View from './View.jsx'

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS (includes Popper.js)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}></Route>
      <Route path='add' element={<Add/>}></Route>
      <Route path='view' element={<View/>}></Route>
    </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
