/* ==========================================================================
   BLESS CONCEPT LASH — MÓDULO EXCLUSIVO DE SERVIÇOS
   ========================================================================== */

(function initServicesAccordion() {
  const WHATSAPP_PHONE = '5511942722631';
  const serviceItems = document.querySelectorAll('.service-item');
  
  if (!serviceItems.length) return;

  // Detecta se o dispositivo suporta hover real (desktop com mouse)
  const isHoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Função para fechar todos os itens
  function closeAllServices() {
    serviceItems.forEach(item => {
      item.classList.remove('is-active');
      item.setAttribute('aria-expanded', 'false');
      const drawer = item.querySelector('.service-drawer');
      if (drawer) drawer.setAttribute('aria-hidden', 'true');
    });
  }

  // Função para abrir um serviço específico
  function openService(item) {
    closeAllServices();
    item.classList.add('is-active');
    item.setAttribute('aria-expanded', 'true');
    const drawer = item.querySelector('.service-drawer');
    if (drawer) drawer.setAttribute('aria-hidden', 'false');
  }

  // Função para alternar o estado de um serviço (mobile/click)
  function toggleService(item) {
    const isCurrentlyActive = item.classList.contains('is-active');
    if (isCurrentlyActive) {
      closeAllServices();
    } else {
      openService(item);
    }
  }

  // Configura cada item de serviço
  serviceItems.forEach(item => {
    const serviceName = item.getAttribute('data-name') || '';
    const bookBtn = item.querySelector('.btn-book-service');

    // 1. Configuração dinâmica do link do WhatsApp
    if (bookBtn) {
      const message = `Olá! Gostaria de agendar o procedimento ${serviceName}. Poderia me informar os horários disponíveis?`;
      const encodedMsg = encodeURIComponent(message);
      bookBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
      
      // Evita fechar a sanfona ao clicar no próprio botão de agendamento
      bookBtn.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // 2. Desktop (Hover suave)
    if (isHoverDevice) {
      item.addEventListener('mouseenter', () => {
        openService(item);
      });
    }

    // 3. Mobile / Toque / Clique
    item.addEventListener('click', (e) => {
      // Se estiver no desktop com hover, o click não precisa fechar acidentalmente
      if (!isHoverDevice) {
        toggleService(item);
      }
    });

    // 4. Acessibilidade via Teclado (Enter / Barra de Espaço)
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleService(item);
      }
    });
  });

  // Opcional: no Desktop, ao sair da lista de serviços com o mouse, pode retrair suavemente
  const listContainer = document.querySelector('.services-interactive-list');
  if (listContainer && isHoverDevice) {
    listContainer.addEventListener('mouseleave', () => {
      closeAllServices();
    });
  }
})();