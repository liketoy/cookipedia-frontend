import { createBrowserRouter } from "react-router-dom";
import Enter from "./routes/Enter";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";

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
]);

export default router;
