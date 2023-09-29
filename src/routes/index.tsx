import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ChatPage from "../pages/chat";
import HomePage from "../pages/home";

const router = createBrowserRouter(
  [
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
      ],
    },
  ]
  // {
  //   basename: "/chat-room",
  // },
);

export default router;
