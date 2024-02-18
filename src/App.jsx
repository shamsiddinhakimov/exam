import Header from './components/Header'
import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Error from './pages/Error'
function App() {
  

  return (
    <>
     
    <BrowserRouter>
    <Header/>
    <Routes>

    <Route path='/' element={<Home/>}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/products' element={<Products/>}></Route>
    {/* <Route path='*' element={<Error/>}></Route> */}
    </Routes>


    </BrowserRouter>
    
    </>
     
  )
}

export default App
