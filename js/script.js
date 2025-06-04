// js/script.js

// 1) Inietta l’anno corrente nel footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  const thumbWidth   = 400;
  const gallery      = document.querySelector('.portfolio-gallery');
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lightbox-img');
  const lbCap        = document.getElementById('lightbox-caption');

  // 2) Carica immagini dinamiche da localStorage
  const stored = localStorage.getItem('customImages');
  if (stored) {
    JSON.parse(stored).forEach(item => {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.dataset.category = item.category;
      const img = document.createElement('img');
      img.src         = item.dataURL;
      img.dataset.full= item.dataURL;
      img.alt         = item.filename;
      img.loading     = 'lazy';
      div.appendChild(img);
      gallery.appendChild(div);
    });
  }

  // 3) Seleziona di nuovo tutte le immagini ora in pagina
  const galleryImgs = document.querySelectorAll('.gallery-item img');
  const galleryItems= document.querySelectorAll('.gallery-item');

  // 4) Genera thumbnail via Canvas (per tutte le immagini)
  galleryImgs.forEach(img => {
    const fullSrc = img.src;
    img.dataset.full = fullSrc;
    const temp = new Image();
    temp.crossOrigin = 'anonymous';
    temp.src = fullSrc;
    temp.onload = () => {
      const canvas = document.createElement('canvas');
      const scale  = thumbWidth / temp.width;
      canvas.width  = thumbWidth;
      canvas.height = temp.height * scale;
      canvas.getContext('2d').drawImage(temp, 0, 0, canvas.width, canvas.height);
      img.src = canvas.toDataURL('image/jpeg', 0.7);
    };
  });

  // 5) Filtro per categoria
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      galleryItems.forEach(item => {
        item.style.display =
          (f === 'all' || item.dataset.category === f) ? 'block' : 'none';
      });
    });
  });

  // 6) Lightbox full-res con nome file
  galleryImgs.forEach(img => {
    img.addEventListener('click', () => {
      const fullSrc  = img.dataset.full;
      const fileName = fullSrc.split('/').pop();
      lightbox.style.display = 'flex';
      lbImg.src              = fullSrc;
      lbCap.textContent      = fileName;
    });
  });

  // Chiudi lightbox al click
  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lbImg.src              = '';
  });
});
