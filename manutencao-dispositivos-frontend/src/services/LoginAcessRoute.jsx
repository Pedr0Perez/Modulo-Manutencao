import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginAcessRoute({ children }) {
  const navigate = useNavigate();

  function getCookie(name) {
    const cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }

    return null;
  }

  if (!getCookie("token")) return children;

  useEffect(() => {
    navigate("/home");
  }, []);
}
