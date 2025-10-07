

import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Category from "./Components/Category/Category";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import NotFound from "./Components/NotFound/NotFound";
import UserContextProvider from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout";
import Allorders from "./Components/Allorders/Allorders";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RelatedProducts from "./Components/RelatedProducts/RelatedProducts";
import RelatedBrands from "./Components/RelatedBrands/RelatedBrands";
import Wishlist from "./Components/Wishlist/Wishlist";
import WishlistContextProvider from "./Context/WishlistContext";
import Footer from "./Components/Footer/Footer";


export default function App() {

  

let routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Category /> </ProtectedRoute>},
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><Checkout /></ProtectedRoute> },
      { path: "allorders", element: <ProtectedRoute><Allorders /></ProtectedRoute> },
      { path: "/productdetails/:id", element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
      { path: "categories/:name", element: <ProtectedRoute><RelatedProducts/></ProtectedRoute> },
      { path: "brands/:name", element: <ProtectedRoute><RelatedBrands/></ProtectedRoute> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

let query = new QueryClient();
  return (
    <>
      <QueryClientProvider client={query}>
        <WishlistContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <ReactQueryDevtools />
              <Toaster />
            </UserContextProvider>
          </CartContextProvider>
        </WishlistContextProvider>
      </QueryClientProvider>
    </>
  );
}
