import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './components/NotFoundPage';
import DashBoard from './components/DashBoard'
import ReportsPage from './pages/ReportsPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />} >
      <Route index element={<DashBoard />} />
      <Route path='/orders' element={<OrdersPage />} />
      <Route path='/reports' element={<ReportsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App








