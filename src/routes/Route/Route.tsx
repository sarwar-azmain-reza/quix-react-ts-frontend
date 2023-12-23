import { createBrowserRouter } from "react-router-dom";
import Main from "../../components/Layout/Main";
import Login from "../../pages/Login/Login";
import Questions from "../../pages/Questions/Questions";
import Answers from "../../pages/Answers/Answers";
import AdminRoute from "../AdminRoute/AdminRoute";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Home from "../../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login-signup", element: <Login /> },
      { path: "/questions", element: <AdminRoute><Questions /></AdminRoute> },
      { path: "/answers", element: <ProtectedRoute><Answers /></ProtectedRoute> },
    ],
  },
]);

export default router;