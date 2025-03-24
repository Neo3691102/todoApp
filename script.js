const tareaForm = document.getElementById("formcontainer");
const mainContainer = document.getElementById("maincontainer");
const agregarTareaBtn = document.getElementById("btn-agregar-tarea");
const agregarTareaBtn2 = document.getElementById("btn-agregar-tarea-dos");
const dialogo = document.getElementById("confirmar-cerrar-dialogo"); //confirm-close-dialog
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const cerrarForm = document.getElementById("cerrartarea");
const addOrUpdateBtn = document.getElementById("agregar-actualizar-tarea");
const tareasContainer = document.getElementById("taskscontainer");
const tituloInput = document.getElementById("titulo-input");
const fechaInput = document.getElementById("fecha-input");
const descripcionInput = document.getElementById("descripcion-input");

const tareaData = JSON.parse(localStorage.getItem("datos")) || []; //aqui se almacenaran todas las tareas con ayuda del localStorage
const removeSpecialChars = (string) => {
  return string.trim().replace(/[^A-Za-z0-9\-\s]/g, ""); //funcion para remover comillas simples, espacios y caracteres especiales
};
let tareaActual = {}; //aqui se almacena la tarea actual cuando se trate de editar o eliminar

const addOrUpdateTask = () => {
  if (!tituloInput.value.trim()) {
    alert("Por favor proporcione un titulo");
  }

  const dataArrIndex = tareaData.findIndex(
    (item) => item.id === tareaActual.id
  );
  const tareaObj = {
    id: `${removeSpecialChars(tituloInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`, //para hacer minuscula la entrada del usuario
    titulo: removeSpecialChars(tituloInput.value), //y remover caracteres especiales, espacios y comillas simples
    fecha: fechaInput.value,
    descripcion: removeSpecialChars(descripcionInput.value),
  };
  console.log(tareaObj); //REMOVER!!!
  console.log(tareaActual);

  if (dataArrIndex === -1) {
    // indica que la tarea es nueva
    tareaData.unshift(tareaObj);
  } else {
    tareaData[dataArrIndex] = tareaObj;
  }

  localStorage.setItem("datos", JSON.stringify(tareaData));

  updateTaskContainer();
  reset();
};

const updateTaskContainer = () => {
  tareasContainer.innerHTML = "";

  tareaData.forEach(({ id, titulo, fecha, descripcion }) => {
    tareasContainer.innerHTML += `
  <div id="${id}" class="tarea">
    <p><strong>Title: </strong>${titulo}</p>
    <p><strong>Date: </strong>${fecha}</p>
    <p><strong>Description: </strong>${descripcion}</p>
    <button onclick="editTask(this)" type="button" class="btn btn-primary">Editar</button>
    <button onclick="deleteTask(this)" type="button" class="btn btn-danger">Eliminar</button>
  </div>
  `;
  }); //para mostrar las tareas iterando a traves del array tareaData
};

const deleteTask = (buttonEl) => {
  const dataArrIndex = tareaData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  buttonEl.parentElement.remove();
  tareaData.splice(dataArrIndex, 1);

  localStorage.setItem("datos", JSON.stringify(tareaData));
};

const editTask = (buttonEl) => {
  const dataArrIndex = tareaData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );
  tareaActual = tareaData[dataArrIndex];
  tituloInput.value = tareaActual.titulo;
  fechaInput.value = tareaActual.fecha;
  descripcionInput.value = tareaActual.descripcion;

  addOrUpdateBtn.innerText = "Actualizar Tarea";
  tareaForm.classList.toggle("hidden");
};

const reset = () => {
  addOrUpdateBtn.innerText = "Agregar Tarea";

  tituloInput.value = "";
  fechaInput.value = "";
  descripcionInput.value = "";
  tareaForm.classList.toggle("hidden");
  tareaActual = {};
};

if (tareaData.length) {
  updateTaskContainer();
}

agregarTareaBtn.addEventListener("click", () => {
  tareaForm.classList.toggle("hidden");
});

cerrarForm.addEventListener("click", (e) => {
  e.preventDefault();
  const formsInputsContainValues =
    tituloInput.value || fechaInput.value || descripcionInput.value;

  const formInputValuesUpdated =
    tituloInput.value !== tareaActual.titulo ||
    fechaInput.value !== tareaActual.fecha ||
    descripcionInput.value !== tareaActual.descripcion;

  if (formsInputsContainValues && formInputValuesUpdated) {
    //para no mostrar el modal si no ha hecho cambios
    dialogo.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => {
  dialogo.close();
});

discardBtn.addEventListener("click", () => {
  dialogo.close();
  mainContainer.classList.toggle("hidden");
  reset();
});

tareaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});
