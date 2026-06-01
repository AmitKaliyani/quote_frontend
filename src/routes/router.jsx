import MainLayout from "../Layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Quotes from "../pages/Quotes";
import SignUp from "../pages/SignUp";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/signup" element={<SignUp />} />
    <Route path="/login" element={<Login />} />
 
 
   <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />  
      <Route path="/quotes" element={<Quotes />} />   
      <Route path="/about" element={<About />} />   
   </Route>
    </>
),
);

export default router;
