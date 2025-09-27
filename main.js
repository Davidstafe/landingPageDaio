let modal = document.getElementById("modal");
let imagenModal = document.getElementById("imagen-modal");
let imagenes = []; // aquí guardamos todas las imágenes
let indiceActual = 0;

document.querySelectorAll(".galeria img").forEach((img, idx) => {
  imagenes.push(img.src); // guardamos src de todas
  img.dataset.index = idx;
});

function abrirModal(img) {
  indiceActual = parseInt(img.dataset.index);
  imagenModal.src = img.src;
  modal.style.display = "flex";
}

function cerrarModal() {
  modal.style.display = "none";
}

function cambiarImagen(direccion) {
  indiceActual += direccion;
  if (indiceActual < 0) indiceActual = imagenes.length - 1;
  if (indiceActual >= imagenes.length) indiceActual = 0;
  imagenModal.src = imagenes[indiceActual];
}

// Cerrar modal con tecla Esc
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModal();
});
