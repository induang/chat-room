import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";

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
      {
        path: "test",
        element: <TestPage />,
      },
    ],
  },
]);

export default router;
