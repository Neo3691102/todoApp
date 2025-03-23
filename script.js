const dialogo = document.getElementById("confirmar-cerrar-dialogo");
dialogo.showModal();

const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", () => {
    dialogo.close();
});
