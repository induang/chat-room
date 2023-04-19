import { createBrowserRouter } from "react-router-dom";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "page1",
        element: <div>PAGE 1</div>,
      },
      {
        path: "page2",
        element: <div>PAGE 2</div>,
      },
    ],
  },
]);

export default router;
