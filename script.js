const dialogo = document.getElementById("confirmar-cerrar-dialogo");

const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", () => {
  dialogo.close();
});
