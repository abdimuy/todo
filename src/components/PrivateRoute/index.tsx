import React from "react";
import useAuth from "../../hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

const PrivateRoute = ({ Layout }: { Layout: any }) => {
  const location = useLocation();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return user ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
