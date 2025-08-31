let swiperInstance = null;

function abrirgaleria(id) {
  const contenedor = document.getElementById('galeria-slides');
  const titulo = document.getElementById('titulo-galeria');

  // Limpia contenido anterior
  contenedor.innerHTML = '';

  // Pone título
  titulo.textContent = id.replace('galeria-', '').toUpperCase();

  // Carga todas las images y guarda el indice inicial
  indexInicial = 0;
  let contador = 0;

  for (let cat in imagenes) {
    imagenes[cat].forEach((img, i) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `<img src="${img}" alt="">`;
      contenedor.appendChild(slide);

      // si es la categoría pedida, guardamos el índice inicial
      if (cat === id && i === fotoIndex) {
        indexInicial = contador;
      }
      contador++;
    });
  }

  // Muestra la galería
  const galeria = document.getElementById('galeria-general');
  galeria.style.display = 'block';

  // Scroll suave
  galeria.scrollIntoView({ behavior: 'smooth' });

  // Destruye Swiper previo si existe
  if (swiperInstance) swiperInstance.destroy(true, true);

  // Inicializa Swiper
  swiperInstance = new Swiper('.mySwiper', {
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    initialSlide: indexInicial // 👈 importante para que arranque en la categoría elegida
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
  'galeria-sublimacion': ['img/sublimacion1.jpg', 'img/sublimacion2.jpg', 'img/sublimacion3.jpg'],
};


function cerrarGaleria() {
  const galeria = document.getElementById('galeria-general');
  galeria.style.display = 'none';
  if (swiperInstance) {
    swiperInstance.destroy(true, true);
    swiperInstance = null;
  }
}
