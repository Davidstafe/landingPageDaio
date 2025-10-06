let swiperInstance = null;

const imagenes = {
  'galeria-diseno': ['images/diseño.jpg', 'images/diseño2.jpg', 'images/diseño3.jpg'],
  'galeria-impresion': ['images/impresion.jpg', 'images/impresion2.jpg', 'images/impresion3.jpg'],
  'galeria-sublimacion': ['images/sublimacion1.jpg', 'images/sublimacion1.png', 'images/sublimacion2.jpg']
};

function abrirgaleria(id) {
  const contenedor = document.getElementById('galeria-slides');
  contenedor.innerHTML = '';

  // Cargar imágenes de la galería seleccionada
  imagenes[id].forEach(src => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `<img src="${src}" alt="imagen" style="width:100%">`;
    contenedor.appendChild(slide);
  });

  // Mostrar modal con animación
  const modal = document.getElementById('galeria-general');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('activa'), 10);

  // Destruir Swiper anterior si existía
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

function cerrarGaleria() {
  const modal = document.getElementById('galeria-general');
  modal.classList.remove('activa');
  setTimeout(() => {
    modal.style.display = 'none';
    if (swiperInstance) {
      swiperInstance.destroy(true, true);
      swiperInstance = null;
    }
  }, 400); // tiempo igual al de la animación CSS
}

// Botón X (solo si existe)
document.addEventListener('DOMContentLoaded', () => {
  const btnCerrar = document.querySelector('.cerrar');
  if (btnCerrar) btnCerrar.addEventListener('click', cerrarGaleria);
});

// Cerrar con fondo oscuro
document.getElementById('galeria-general')?.addEventListener('click', e => {
  if (e.target.id === 'galeria-general') cerrarGaleria();
});

// Teclas: Escape, flechas
document.addEventListener('keydown', e => {
  const modal = document.getElementById('galeria-general');
  if (modal && modal.style.display === 'flex') {
    if (e.key === 'Escape') cerrarGaleria();
    if (e.key === 'ArrowRight' && swiperInstance) swiperInstance.slideNext();
    if (e.key === 'ArrowLeft' && swiperInstance) swiperInstance.slidePrev();
  }
});
