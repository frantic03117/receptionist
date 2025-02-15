import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import Specialization from './pages/specilazaion'
import Doctors from './pages/Doctors'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import Reservations from './pages/reservations'
import AcceptReservation from './pages/reservations/AcceptReservation'
import Users from './pages/Users'
import AcceptedReservations from './pages/reservations/AcceptedReservations'
import CreateDoctor from './pages/Doctors/CreateDoctor'
import CreateAppointment from './pages/appointment/CreateAppointment'

function App() {
  const themeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/specialization' element={<Specialization />} />

          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctor/create' element={<CreateDoctor />} />
          <Route path='/doctor/edit/:id' element={<CreateDoctor />} />
          <Route path='/users' element={<Users />} />
          <Route path='/consultants' element={<Reservations />} />
          <Route path='/consultants/create' element={<CreateAppointment />} />
          <Route path='/reservation/accept/:id' element={<AcceptReservation />} />
          <Route path='/reservations/:status' element={<AcceptedReservations />} />
        </Route>
      </>
    )
  )
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <RouterProvider router={themeRoutes} />
      </ThemeProvider>
    </>
  )
}

export default App