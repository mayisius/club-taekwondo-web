// --- TARJETAS EXPANDIBLES ---
document.querySelectorAll('.section-card').forEach(card => {
  const header = card.querySelector('.card-header');

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
      // Si se cierra manualmente, eliminar la flecha
      const arrow = card.querySelector('.close-arrow');
      if (arrow) arrow.remove();
    }
  });
});
