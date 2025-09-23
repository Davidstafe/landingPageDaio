let swiperInstance = null;

function abrirgaleria(id) {
  const contenedor = document.getElementById('galeria-slides');
  contenedor.innerHTML = '';

  let indexInicial = 0; // slide donde inicia la categoría seleccionada
  let contador = 0;

  for (let cat in imagenes) {
    // Slide del título de la categoría
    const tituloSlide = document.createElement('div');
    tituloSlide.classList.add('swiper-slide', 'titulo-slide');
    tituloSlide.innerHTML = `<h2>${cat.replace('galeria-', '').toUpperCase()}</h2>`;
    contenedor.appendChild(tituloSlide);
    contador++;

    // Slide con las 3 imágenes
    const grupoSlide = document.createElement('div');
    grupoSlide.classList.add('swiper-slide');
    grupoSlide.innerHTML = `
      <div class="grupo-fotos">
        ${imagenes[cat].map(img => `<img src="${img}" alt="">`).join('')}
      </div>
    `;
    contenedor.appendChild(grupoSlide);

    // Guardamos el índice inicial si es la categoría elegida
    if (cat === id) indexInicial = contador - 1;
    contador++;
  }

  // Mostrar galería
  document.getElementById('galeria-general').style.display = 'block';

  // Destruir Swiper previo si existe
  if (swiperInstance) swiperInstance.destroy(true, true);

  // Inicializar Swiper
  swiperInstance = new Swiper('.mySwiper', {
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    initialSlide: indexInicial,
  });

  // Esc para cerrar
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrarGaleria();
  });
}

function cerrarGaleria() {
  const galeria = document.getElementById('galeria-general');
  galeria.style.display = 'none';
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}

const imagenes = {
  'galeria-diseno': ['img/diseno1.jpg', 'img/diseno2.jpg', 'img/diseno3.jpg'],
  'galeria-impresion': ['img/impresion1.jpg', 'img/impresion2.jpg', 'img/impresion3.jpg'],
  'galeria-sublimacion': ['imagenes/sublimacion.jpg', 'imagenes/sublimacion1.jpg', 'img/sublimacion3.jpg'],
};
