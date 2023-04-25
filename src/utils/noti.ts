import { toast } from "react-toastify";

interface INotiProps {
  type: "info" | "success" | "warning" | "error" | "default";
  message: string;
}

export default ({ type, message }: INotiProps) =>
  toast(message, {
    type,
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
