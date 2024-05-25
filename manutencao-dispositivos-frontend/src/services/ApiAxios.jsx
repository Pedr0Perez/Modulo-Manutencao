import axios from "axios";

function getCookie(name) {
  // Divide a string de cookies em pares chave=valor
  const cookies = document.cookie.split(";");

  // Procura o cookie desejado e retorna seu valor
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    // Verifica se o cookie atual é o cookie que estamos procurando
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null;
}

const api = axios.create({
  baseURL: "http://localhost/ci_api/public/",
});

const setAuthToken = () => {
  api.defaults.headers.common["Authorization"] = getCookie("token");
};

export { api, setAuthToken };
