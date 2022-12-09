import { createBrowserRouter } from "react-router-dom";
import Enter from "./routes/Enter";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import UserPage from "./routes/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/enter",
    element: <Enter />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/user",
    element: <UserPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default router;
