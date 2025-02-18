import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SanPham from './Pages/SANPHAM/SanPham';
import Layout from './Pages/Layout';
import ProductDetail from './Pages/CHITIET/ChiTiet';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    // errorElement: <Error404 />,
    children: [
      { index: true, element: <SanPham/> },
   { path: "product/:id", element: <ProductDetail/> }
      // { path: "sanpham", element: <SanPham /> },  
      // // { path: "cart", element: <Cart/> }, 
      // { path: "product/:id", element: <ProductDetail /> },
      // { path: "thanhtoan", element: <ThanhToan/> }, 

    ],
  },
  
]);


function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
