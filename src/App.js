import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import TodoMain from "./pages/TodoMain";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  { path: "/", element: <Main /> },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/todo",
    element: <TodoMain />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
