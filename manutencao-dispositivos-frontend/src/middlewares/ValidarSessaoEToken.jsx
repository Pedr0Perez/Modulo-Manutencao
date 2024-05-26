import DescriptografarDados from "../services/DescriptografarDados";

export default function ValidarSessaoEToken() {
  const getCookie = (name) => {
    const cookieArr = document.cookie.split(";");
    //console.log(cookieArr);

    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");
      if (name === cookiePair[0].trim()) {
        // Decode the cookie value and return
        return true;
      }
    }
    removerDadosSessao();
    //alert("Cookie não encontrado.");
    return false;
  };

  const removerCookie = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  const removerDadosSessao = () => {
    localStorage.removeItem("dataUser");
  };

  const validarSessaoAtiva = () => {
    if (!localStorage.getItem("dataUser")) {
      //alert("Armazenamento local não encontrado.");
      removerCookie();
      return false;
    }

    const sessaoDados = DescriptografarDados(localStorage.getItem("dataUser"));

    if (new Date() > sessaoDados.expire_date) return false;

    return true;
  };

  if (getCookie("token") && validarSessaoAtiva()) return true;

  return false;
}
