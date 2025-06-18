import { useEffect } from "react";
import { ToastProps } from "../misc/types";
import { BiX } from "react-icons/bi";

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const isSuccess: boolean = type === "SUCCESS";

  return (
    <div className="my-toast bg-third py-2 px-3 rounded-2 shadow-lg position-fixed overflow-hidden">
      <BiX
        onClick={onClose}
        size={30}
        className="close-icon p-1 position-absolute end-0 top-0 pointer transition-03" />

      <h1
        className="mb-2 py-1 border-bottom fs-5 text-white"
      >
        {isSuccess ? "Success" : "failed"}
      </h1>

      <p
        className="mb-0 fs-sm text-white"
      >
        {message}
      </p>
    </div>
  );
};
