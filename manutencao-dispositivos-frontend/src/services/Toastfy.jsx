import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function toast() {
  const notify = () => toast("Wow so easy!");
  useEffect(() => {
    notify();
  });

  return (
    <div>
      <ToastContainer />
    </div>
  );
}

export default toast;
