let swiperInstance = null;

const imagenes = {
  'galeria-diseno': ['images/diseno.jpg', 'images/diseno2.jpg', 'images/diseno3.jpg'],
  'galeria-impresion': ['images/impresion.jpg', 'images/impresion2.jpg', 'images/impresion3.jpg'],
  'galeria-sublimacion': ['images/sublimacion1.jpg', 'images/sublimacion1.png', 'images/sublimacion2.jpg']
};

// Abrir galería
function abrirGaleria(id, index = 0) {
  const contenedor = document.getElementById('galeria-slides');
  contenedor.innerHTML = '';

  imagenes[id].forEach(src => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `<img src="${src}" style="width:100%; max-height:80vh; object-fit:contain;">`;
    contenedor.appendChild(slide);
  });

  const modal = document.getElementById('galeria-general');
  modal.style.display = 'flex';

  // Destruir Swiper previo
  if (swiperInstance) swiperInstance.destroy(true, true);

  swiperInstance = new Swiper('.mySwiper', {
    slidesPerView: 1,
    loop: true,
    initialSlide: index,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    centeredSlides: true
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

// Eventos
document.querySelector('.cerrar').addEventListener('click', cerrarGaleria);
document.addEventListener('keydown', e => {
  const modal = document.getElementById('galeria-general');
  if (modal.style.display === 'flex') {
    if (e.key === 'Escape') cerrarGaleria();
    if (e.key === 'ArrowRight' && swiperInstance) swiperInstance.slideNext();
    if (e.key === 'ArrowLeft' && swiperInstance) swiperInstance.slidePrev();
  }
});

// Agregar eventos click a imágenes
document.querySelectorAll('.galeria-diseno img').forEach((img, i) => {
  img.addEventListener('click', () => abrirGaleria('galeria-diseno', i));
});
document.querySelectorAll('.galeria-impresion img').forEach((img, i) => {
  img.addEventListener('click', () => abrirGaleria('galeria-impresion', i));
});
document.querySelectorAll('.galeria-sublimacion img').forEach((img, i) => {
  img.addEventListener('click', () => abrirGaleria('galeria-sublimacion', i));
});
