/* ==========================================================================
   BLESS CONCEPT LASH — SCRIPT CORRIGIDO (MENU + WHATSAPP + SERVIÇOS)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '5511942722631';

  // 1. Função universal para abrir o WhatsApp
  function redirectToWhatsApp(serviceName) {
    let message = '';
    
    if (!serviceName || serviceName === 'Geral' || serviceName.toLowerCase().includes('whatsapp')) {
      message = 'Olá! Gostaria de agendar um horário na Bless Concept Lash. Gostaria de saber os horários disponíveis. ✨';
    } else {
      message = `Olá! Gostaria de agendar o procedimento ${serviceName}. Poderia me informar os horários disponíveis? ✨`;
    }

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  }

  // 2. CONTROLE DO MENU MOBILE (Abertura / Fechamento garantidos)
  const menuToggle = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
  const mobileNav = document.getElementById('mobileNav') || document.querySelector('.mobile-nav');

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!mobileNav) return;
    
    const isOpen = mobileNav.classList.toggle('open');
    if (menuToggle) menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (!mobileNav) return;
    mobileNav.classList.remove('open');
    if (menuToggle) menuToggle.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
  }

  // Fecha o menu ao clicar em qualquer link interno
  document.querySelectorAll('.mobile-link, .mobile-nav a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 3. CAPTURA GLOBAL DE CLIQUES EM BOTÕES DE AGENDAMENTO
  document.addEventListener('click', (e) => {
    // A) Clique no botão "AGENDAR PELO WHATSAPP" ou no Hero/Header
    const btnAgendar = e.target.closest(
      '.booking-section .btn, .booking-card .btn, .booking-card button, .booking-card a, .js-whatsapp-trigger, .header-btn, .hero-actions .btn-subtle'
    );
    
    if (btnAgendar) {
      e.preventDefault();
      e.stopPropagation();
      redirectToWhatsApp('Geral');
      return;
    }

    // B) Clique no botão interno de um serviço específico
    const btnService = e.target.closest('.btn-book-service');
    if (btnService) {
      e.preventDefault();
      e.stopPropagation();
      const parentItem = btnService.closest('.service-item');
      const serviceName = parentItem ? parentItem.getAttribute('data-name') : 'Geral';
      redirectToWhatsApp(serviceName);
      return;
    }

    // C) Fechar o menu mobile ao tocar fora
    if (mobileNav && mobileNav.classList.contains('open')) {
      if (!mobileNav.contains(e.target) && (!menuToggle || !menuToggle.contains(e.target))) {
        closeMenu();
      }
    }
  });

  // 4. SANFONA INTERATIVA DE SERVIÇOS
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
    if (item.classList.contains('is-active')) {
      closeAllServices();
    } else {
      openService(item);
    }
  }

  serviceItems.forEach(item => {
    // Clique no item (para mobile e toque)
    item.addEventListener('click', (e) => {
      if (e.target.closest('.btn-book-service')) return; // Não fecha se clicou no botão
      if (!isHoverDevice) {
        toggleService(item);
      }
    });

    // Hover no Desktop
    if (isHoverDevice) {
      item.addEventListener('mouseenter', () => openService(item));
    }

    // Acessibilidade no teclado
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleService(item);
      }
    });
  });

  const listContainer = document.querySelector('.services-interactive-list');
  if (listContainer && isHoverDevice) {
    listContainer.addEventListener('mouseleave', closeAllServices);
  }

  // 5. HEADER COM EFEITO SCROLL
  const header = document.getElementById('header') || document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 6. ÍCONES LUCIDE (Execução segura)
  try {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (err) {}
});