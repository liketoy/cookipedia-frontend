import { createBrowserRouter } from "react-router-dom";
import Enter from "./routes/Enter";
import Home from "./routes/Home";
import Recipes from "./routes/Recipes";
import RecipeUpload from "./routes/RecipeUpload";
import SignIn from "./routes/SignIn";
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
    path: "recipes",
    element: <Recipes />,
  },
  {
    path: "recipes/upload",
    element: <RecipeUpload />,
  },
]);

export default router;
