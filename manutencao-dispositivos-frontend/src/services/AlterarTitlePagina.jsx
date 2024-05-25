export default function AlterarTitlePagina(titlePage) {
  if (titlePage !== "") {
    document.title = titlePage + " / Módulo de Manutenções";
    return;
  }
  document.title = "Módulo de Manutenções";
  return;
}
