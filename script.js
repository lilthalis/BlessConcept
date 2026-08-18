/**
 * BLESS CONCEPT LASH — JAVASCRIPT LOGIC
 * Minimalist luxury experience, modal selection & dynamic WhatsApp integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Constantes de Configuração
  const WHATSAPP_PHONE = '5511942722631';
  
  // Elementos do DOM
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  // Modal Elements
  const serviceModal = document.getElementById('serviceModal');
  const modalNumber = document.getElementById('modalNumber');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalConfirmBtn = document.getElementById('modalConfirmBtn');
  const modalBackBtn = document.getElementById('modalBackBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  
  // Variável para armazenar o serviço atualmente selecionado na modal
  let currentSelectedService = '';

  /* --------------------------------------------------------------------------
     1. GERADOR DE LINK DO WHATSAPP
  -------------------------------------------------------------------------- */
  function generateWhatsAppUrl(serviceName) {
    let message = '';
    
    if (!serviceName || serviceName === 'Geral') {
      message = 'Olá! Gostaria de agendar um horário na Bless Concept Lash. Gostaria de saber os horários disponíveis. ✨';
    } else {
      message = `Olá! Gostaria de agendar um horário para o procedimento ${serviceName} na Bless Concept Lash. Gostaria de verificar os horários disponíveis. ✨`;
    }

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
  }

  /* --------------------------------------------------------------------------
     2. GATILHOS DIRETOS DE AGENDAMENTO (HEADER / HERO / CTA)
  -------------------------------------------------------------------------- */
  const directTriggers = document.querySelectorAll('.js-whatsapp-trigger');
  directTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || 'Geral';
      const url = generateWhatsAppUrl(service);
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });

  /* --------------------------------------------------------------------------
     3. SISTEMA DE MODAL EDITORIAL PARA SERVIÇOS
  -------------------------------------------------------------------------- */
  const serviceItems = document.querySelectorAll('.service-item');

  function openServiceModal(item) {
    const id = item.getAttribute('data-id');
    const name = item.getAttribute('data-name');
    const desc = item.getAttribute('data-desc');

    currentSelectedService = name;

    // Atualiza o conteúdo da Modal
    modalNumber.textContent = id;
    modalTitle.textContent = name.toUpperCase();
    modalDesc.textContent = desc;

    // Abre a modal
    serviceModal.classList.add('active');
    serviceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Impede o scroll de fundo
  }

  function closeServiceModal() {
    serviceModal.classList.remove('active');
    serviceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Click no card de serviço ou botão "Ver Procedimento"
  serviceItems.forEach(item => {
    item.addEventListener('click', (e) => {
      openServiceModal(item);
    });
  });

  // Confirmação no WhatsApp a partir da Modal
  if (modalConfirmBtn) {
    modalConfirmBtn.addEventListener('click', () => {
      const url = generateWhatsAppUrl(currentSelectedService);
      window.open(url, '_blank', 'noopener,noreferrer');
      closeServiceModal();
    });
  }

  // Botões de Fechar Modal
  if (modalBackBtn) modalBackBtn.addEventListener('click', closeServiceModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeServiceModal);

  // Fechar ao clicar no overlay escuro
  if (serviceModal) {
    serviceModal.addEventListener('click', (e) => {
      if (e.target === serviceModal) {
        closeServiceModal();
      }
    });
  }

  // Fechar com a tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && serviceModal.classList.contains('active')) {
      closeServiceModal();
    }
  });

  /* --------------------------------------------------------------------------
     4. HEADER SCROLL EFFECT
  -------------------------------------------------------------------------- */
  function handleHeaderScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* --------------------------------------------------------------------------
     5. MENU MOBILE
  -------------------------------------------------------------------------- */
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
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
  }

  /* --------------------------------------------------------------------------
     6. ANIMAÇÕES SUAVES DE SCROLL (INTERSECTION OBSERVER)
  -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Anima apenas uma vez
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback para navegadores legados
    revealElements.forEach(el => el.classList.add('active'));
  }
});