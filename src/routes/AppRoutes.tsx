import { Routes, Route, Navigate } from 'react-router-dom'
import GeneralLayout from '../layout/GeneralLayout'
import Home from '../pages/Home'
import BikeDetails from '../pages/BikeDetails'
import App from '../App'

const AppRoutes = () => (
  <Routes>
    <Route element={<App />}>
      <Route element={<GeneralLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/bike/:id" element={<BikeDetails />} />
      </Route>
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
)

export default AppRoutes
