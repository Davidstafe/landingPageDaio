let swiperInstance = null;

const imagenes = {
  'galeria-diseno': ['images/diseño.jpg', 'images/diseño2.jpg', 'images/diseño3.jpg'],
  'galeria-impresion': ['images/impresion.jpg', 'images/impresion2.jpg', 'images/impresion3.jpg'],
  'galeria-sublimacion': ['images/sublimacion1.jpg', 'images/sublimacion1.png', 'images/sublimacion2.jpg']
};

function abrirgaleria(id) {
  const contenedor = document.getElementById('galeria-slides');
  contenedor.innerHTML = '';

  // Cargar las imágenes de la categoría seleccionada
  imagenes[id].forEach(src => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `<img src="${src}" style="width:100%">`;
    contenedor.appendChild(slide);
  });

  // Mostrar modal
  const modal = document.getElementById('galeria-general');
  modal.style.display = 'block';

  // Destruir Swiper previo si existe
  if (swiperInstance) swiperInstance.destroy(true, true);

  // Inicializar Swiper
  swiperInstance = new Swiper('.mySwiper', {
    slidesPerView: 1,
    loop: true,
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
}

// Cerrar modal
function cerrarGaleria() {
  const modal = document.getElementById('galeria-general');
  modal.style.display = 'none';
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

// Botón X
document.querySelector('.cerrar').addEventListener('click', cerrarGaleria);

// Teclas: Escape, flechas
document.addEventListener('keydown', e => {
  const modal = document.getElementById('galeria-general');
  if (modal.style.display === 'block') {
    if (e.key === 'Escape') cerrarGaleria();
    if (e.key === 'ArrowRight' && swiperInstance) swiperInstance.slideNext();
    if (e.key === 'ArrowLeft' && swiperInstance) swiperInstance.slidePrev();
  }
});
