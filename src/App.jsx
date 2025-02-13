import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import Specialization from './pages/specilazaion'
import Doctors from './pages/Doctors'

function App() {
  const themeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/specialization' element={<Specialization/>} />
          <Route path='/doctors' element={<Doctors/>} />
        </Route>
      </>
    )
  )
  return (
    <>
      <RouterProvider router={themeRoutes} />
    </>
  )
}

export default App
