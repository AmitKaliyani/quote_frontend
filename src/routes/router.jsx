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
import { UserProtectedRoute } from "./protected.route";
import GetMyQoutes from "../pages/GetMyQoutes";
import ProfilePage from "../pages/ProfilePage";
import QuotePage from "../pages/QuotePage";
import SavedQuotes from "../pages/SavedQuotes";
import NotFound from "../pages/NotFound";

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

      <Route path="*" element={<NotFound />} />
    </>,
  ),
);

export default router;
