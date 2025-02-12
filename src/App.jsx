import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'

function App() {
  const themeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
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
