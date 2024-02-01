import { useState } from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Home from './pages/Home';
import AllTask from './pages/AllTask';
import EditTask from './pages/EditTask';
import NewTask from './pages/NewTask';
import toast, { Toaster } from 'react-hot-toast';
import ClientTask from './components/ClientTask';



function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path='/AllTask' element={<AllTask/>}/>
      <Route path='/NewTask' element={<NewTask/>}/>
      <Route path='/EditTask/:userId' element={<EditTask/>}/>
      <Route path='/ClientTask/:userId' element={<ClientTask/>}/>



    </Routes>
    
    </BrowserRouter>
    <Toaster />

      
    </>
  )
}

export default App
