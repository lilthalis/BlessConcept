/* ==========================================================================
   BLESS CONCEPT LASH — SCRIPT PRINCIPAL & INTERATIVIDADE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '5511942722631';

  /* --------------------------------------------------------------------------
     1. FUNÇÃO UNIVERSAL DE ABERTURA DO WHATSAPP (iOS / Android / Desktop)
  -------------------------------------------------------------------------- */
  function openWhatsApp(serviceName) {
    let message = '';
    
    if (!serviceName || serviceName === 'Geral') {
      message = 'Olá! Gostaria de agendar um horário na Bless Concept Lash. Gostaria de saber os horários disponíveis. ✨';
    } else {
      message = `Olá! Gostaria de agendar o procedimento ${serviceName}. Poderia me informar os horários disponíveis? ✨`;
    }

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    
    // Abre diretamente garantindo que o Safari do iPhone não bloqueie
    window.location.href = url;
  }

  /* --------------------------------------------------------------------------
     2. GATILHOS DE AGENDAMENTO (Botões "Agendar", Hero e Contato)
  -------------------------------------------------------------------------- */
  const directTriggers = document.querySelectorAll('.js-whatsapp-trigger, .btn-subtle');
  directTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'Geral';
      openWhatsApp(service);
    });
  });

  /* --------------------------------------------------------------------------
     3. MENU MOBILE HAMBÚRGUER (Abre, fecha e fecha ao clicar em link)
  -------------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-nav a');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Fecha o menu se tocar fora dele
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. SANFONA INTERATIVA DE SERVIÇOS (Mobile Toque / Desktop Hover & Click)
  -------------------------------------------------------------------------- */
  const serviceItems = document.querySelectorAll('.service-item');
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

    // Configura o link de agendamento do botão dentro do procedimento
    if (bookBtn) {
      bookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Não fecha a sanfona ao clicar
        openWhatsApp(serviceName);
      });
    }

    // Clique / Toque no item de serviço
    item.addEventListener('click', (e) => {
      if (!isHoverDevice) {
        toggleService(item);
      }
    });

    // Desktop com mouse: abre ao passar o mouse
    if (isHoverDevice) {
      item.addEventListener('mouseenter', () => {
        openService(item);
      });
    }

    // Acessibilidade via Teclado
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleService(item);
      }
    });
  });

  // Fecha os serviços no desktop se o mouse sair da lista
  const servicesList = document.querySelector('.services-interactive-list');
  if (servicesList && isHoverDevice) {
    servicesList.addEventListener('mouseleave', () => {
      closeAllServices();
    });
  }

  /* --------------------------------------------------------------------------
     5. HEADER COM EFEITO DE SCROLL (Vidro escurecido ao rolar)
  -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* --------------------------------------------------------------------------
     6. INICIALIZAÇÃO SEGURA DE ÍCONES (Evita travar o script caso falhe)
  -------------------------------------------------------------------------- */
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (err) {
    console.warn('Lucide icons não carregado, fallback padrão ativo.');
  }
});