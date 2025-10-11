// --- TARJETAS EXPANDIBLES ---
document.querySelectorAll('.section-card').forEach(card => {
  const header = card.querySelector('.card-header');
  if (!header) return; // por seguridad

  header.addEventListener('click', () => {
    // Cerrar cualquier otra tarjeta activa y eliminar su flecha
    document.querySelectorAll('.section-card.active').forEach(openCard => {
      if (openCard !== card) {
        openCard.classList.remove('active');
        const arrow = openCard.querySelector('.close-arrow');
        if (arrow) arrow.remove();
      }
    });

    // Alternar la tarjeta clicada
    const isActive = card.classList.toggle('active');

    // Si se activa, añadir la flecha de cierre
    if (isActive) {
      const closeArrow = document.createElement('span');
      closeArrow.innerHTML = '⬅';
      closeArrow.className = 'close-arrow';
      closeArrow.style.position = 'absolute';
      closeArrow.style.top = '10px';
      closeArrow.style.left = '15px';
      closeArrow.style.cursor = 'pointer';
      closeArrow.style.fontSize = '1.5rem';
      closeArrow.style.color = '#333';
      closeArrow.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.remove('active');
        closeArrow.remove();
      });
      card.appendChild(closeArrow);
    } else {
      const arrow = card.querySelector('.close-arrow');
      if (arrow) arrow.remove();
    }
  });
});

// --- INTERACCIÓN DE ESTRELLAS / RESEÑAS ---
const stars = document.querySelectorAll('.stars span');
const averageRatingEl = document.getElementById('average-rating');
const reviewForm = document.getElementById('review-form');
const reviewText = document.getElementById('review-text');
const bubblesContainer = document.querySelector('.bubbles-container');
const toggleComments = document.getElementById('toggleComments');

if (stars.length && reviewForm && reviewText && bubblesContainer && toggleComments) {
  let ratings = [];
  let reviews = [];
  let currentRating = 0;

  stars.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = parseInt(star.getAttribute('data-value'));
      updateStars(currentRating);
    });
  });

  function updateStars(rating) {
    stars.forEach(s => s.classList.remove('active'));
    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('active');
    }
  }

  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    if (currentRating === 0) {
      alert("Por favor, selecciona una valoración con estrellas ⭐");
      return;
    }

    const text = reviewText.value.trim();
    if (text === "") return;

    reviews.push(text);
    ratings.push(currentRating);

    const average = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
    averageRatingEl.textContent = `Valoración media: ${average} ⭐`;

    showBubble(text);
    reviewText.value = "";
    updateStars(0);
    currentRating = 0;
  });

  function showBubble(text) {
    if (!toggleComments.checked) return;

    const bubble = document.createElement('div');
    bubble.className = 'comment-bubble';
    bubble.textContent = text;
    bubblesContainer.appendChild(bubble);

    setTimeout(() => bubble.remove(), 12000);
  }
}

let slideIndex = 0;
let slides, dots;
let autoSlideInterval;

function showSlides(n) {
  slides = document.querySelectorAll(".slide");
  dots = document.querySelectorAll(".dot");

  if (n >= slides.length) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length - 1; }

  slides.forEach(slide => slide.style.display = "none");
  dots.forEach(dot => dot.classList.remove("active"));

  slides[slideIndex].style.display = "block";
  dots[slideIndex].classList.add("active");
}

function plusSlides(n) {
  clearInterval(autoSlideInterval);
  slideIndex += n;
  showSlides(slideIndex);
  autoSlideInterval = setInterval(nextSlide, 6000);
}

function currentSlide(n) {
  clearInterval(autoSlideInterval);
  slideIndex = n - 1;
  showSlides(slideIndex);
  autoSlideInterval = setInterval(nextSlide, 6000);
}

function nextSlide() {
  slideIndex++;
  showSlides(slideIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
  autoSlideInterval = setInterval(nextSlide, 6000);
});
