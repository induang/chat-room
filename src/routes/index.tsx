import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatPage from "../pages/chat";
import HomePage from "../pages/home";
import Interview from "@/pages/interview";
import Sudoku from "@/pages/sudoku";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
      { path: "sudoku", element: <Sudoku /> },
      { path: "interview", element: <Interview /> },
    ],
  },
]);

export default router;
