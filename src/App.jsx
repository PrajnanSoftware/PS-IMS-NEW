import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from 'react-router-dom';
import GetStarted from './pages/GetStartedPage';
import Register from './pages/Register';
import Login from './pages/Login';
import CustomerForm from './components/CustomerForm';
import MainLayout from './layouts/MainLayout';
import OrdersPage from './pages/OrdersPage';
import NotFoundPage from './components/NotFoundPage';


const App = () => {
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  const fetchCustomers = async () => {
    // Your fetch logic here
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route index element={<DashBoard />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customers" element={<CustomerForm fetchCustomers={fetchCustomers} />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;


// import React, { useState } from 'react';
// import { Route, Routes } from 'react-router-dom';
// import GetStarted from './pages/GetStartedPage';
// import Register from './pages/Register';
// import Login from './pages/Login';
// import CustomerForm from './components/CustomerForm';

// const App = () => {
//   const [filteredCustomers, setFilteredCustomers] = useState([]);

//   const fetchCustomers = async () => {

//   };

//   return (
//     <div className="App">
//       <header>
//         <h1>Customer Management</h1>
//       </header>
//       <main>
//         <Routes>
//           <Route path="/" element={<GetStarted />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route
//             path="/customers"
//             element={
//               <>
//                 <CustomerForm fetchCustomers={fetchCustomers} />
//               </>
//             }
//           />
//         </Routes>
//       </main>
      
//     </div>
//   );
// };

// export default App;










