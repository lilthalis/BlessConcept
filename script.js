/* ==========================================================================
   BLESS CONCEPT LASH — MÓDULO EXCLUSIVO DE SERVIÇOS
   ========================================================================== */
(function initServicesAccordion() {
  const WHATSAPP_PHONE = '5511942722631';
  const serviceItems = document.querySelectorAll('.service-item');
  
  if (!serviceItems.length) return;

  const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function closeAllServices() {
    serviceItems.forEach(item => {
      item.classList.remove('is-active');
      item.setAttribute('aria-expanded', 'false');
    });
  }

  function openService(item) {
    closeAllServices();
    item.classList.add('is-active');
    item.setAttribute('aria-expanded', 'true');
  }

  function toggleService(item) {
    const isCurrentlyActive = item.classList.contains('is-active');
    if (isCurrentlyActive) {
      closeAllServices();
    } else {
      openService(item);
    }
  }

  serviceItems.forEach(item => {
    const serviceName = item.getAttribute('data-name') || '';
    const bookBtn = item.querySelector('.btn-book-service');

    // Configuração do WhatsApp dinâmico
    if (bookBtn) {
      const message = `Olá! Gostaria de agendar o procedimento ${serviceName}. Poderia me informar os horários disponíveis?`;
      bookBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
      
      // Impede fechar ao clicar no botão
      bookBtn.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // No desktop com mouse: hover
    if (isHoverDevice) {
      item.addEventListener('mouseenter', () => {
        openService(item);
      });
    }

    // No celular / tablet / clique
    item.addEventListener('click', () => {
      if (!isHoverDevice) {
        toggleService(item);
      }
    });

    // Teclado (Acessibilidade)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleService(item);
      }
    });
  });

  // Retrai suavemente ao sair da lista no desktop
  const listContainer = document.querySelector('.services-interactive-list');
  if (listContainer && isHoverDevice) {
    listContainer.addEventListener('mouseleave', () => {
      closeAllServices();
    });
  }
})();