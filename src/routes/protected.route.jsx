import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

export function UserProtectedRoute() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }

  return <Outlet />;
}
