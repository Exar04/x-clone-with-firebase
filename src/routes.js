import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Timeline } from "./pages/timeline";
import { Messages } from "./pages/messages";
import { Profile } from "./pages/profile";
import { Notifications } from "./pages/notification";
import { Explore } from "./pages/explore";
import { Draft } from "./pages/drafts";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

export const PrivateRoute = ({
  component: Component,
  authenticated,
  ...rest
}) => {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <PrivateRoute component={Home} />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Timeline />,
      },
      {
        path: "home/timeline",
        element: <Timeline />,
      },
      {
        path: "home/messages",
        element: <Messages />,
      },
      {
        path: "home/profile/:permanentUsername",
        element: <Profile />,
      },
      {
        path: "home/notification",
        element: <Notifications />,
      },
      {
        path: "home/explore",
        element: <Explore />,
      },
      {
        path: "home/draft",
        element: <Draft />,
      },
    ],
  },
]);