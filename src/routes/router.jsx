import MainLayout from "../Layout/MainLayout";
import About from "../pages/user-pages/About";
import Home from "../pages/user-pages/Home";
import Login from "../pages/user-pages/Login";
import Quotes from "../pages/user-pages/Quotes";
import SignUp from "../pages/user-pages/SignUp";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import { UserProtectedRoute } from "./protected.route";
import GetMyQoutes from "../pages/user-pages/GetMyQoutes";
import ProfilePage from "../pages/user-pages/ProfilePage";
import QuotePage from "../pages/user-pages/QuotePage";
import SavedQuotes from "../pages/user-pages/SavedQuotes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/about" element={<About />} />
        <Route path="/quotes/:id" element={<QuotePage />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/my-quotes" element={<GetMyQoutes />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/saved-quotes" element={<SavedQuotes />} />
        </Route>
      </Route>
    </>,
  ),
);

export default router;
