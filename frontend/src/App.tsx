import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import './App.css'
function App() {

  return (
    <>
    <div className='max-w-screen-2xl mx-auto'>
    <Header/>
    <Outlet/>
    <Footer/>
    </div>
    </>
  )
}

export default App
