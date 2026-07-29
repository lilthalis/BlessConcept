/**
 * FABI NEVES LASH STUDIO - INTERACTIVE ENGINE (2026)
 * Built with Pure Vanilla JavaScript & GSAP ScrollTrigger
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. INITIALIZE LUCIDE ICONS
    if (window.lucide) {
        lucide.createIcons();
    }

    // 2. NAVBAR SCROLL EFFECT & MOBILE MENU
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. LIGHTBOX FOR PHOTO GALLERY
    const galleryItems = document.querySelectorAll('[data-lightbox]');
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-lightbox');
            const caption = item.querySelector('.gallery-overlay span')?.textContent || '';

            lightboxImg.src = src;
            lightboxCaption.textContent = caption;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    // 4. GALLERY CATEGORY FILTERING
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryGridItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryGridItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // 5. VIDEO MODAL PLAYER
    const videoThumbs = document.querySelectorAll('.video-thumbnail');
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('modal-video-player');
    const videoModalClose = document.getElementById('video-modal-close');
    const videoModalOverlay = document.getElementById('video-modal-overlay');

    videoThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const videoSrc = thumb.getAttribute('data-video-src');
            if (videoSrc && videoPlayer) {
                videoPlayer.querySelector('source').src = videoSrc;
                videoPlayer.load();
                videoModal.classList.add('active');
                videoPlayer.play();
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeVideoModal = () => {
        if (videoModal) {
            videoModal.classList.remove('active');
            if (videoPlayer) videoPlayer.pause();
            document.body.style.overflow = '';
        }
    };

    if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
    if (videoModalOverlay) videoModalOverlay.addEventListener('click', closeVideoModal);

    // 6. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;

            // Build pre-filled WhatsApp message
            const waMsg = `Olá Fabi Neves Lash! Me chamo ${encodeURIComponent(name)}.%0A*Telefone:* ${encodeURIComponent(phone)}%0A*Serviço:* ${encodeURIComponent(service)}%0A*Mensagem:* ${encodeURIComponent(message)}`;
            
            formStatus.style.color = 'var(--accent-gold-hover)';
            formStatus.innerHTML = '<i data-lucide="check-circle"></i> Redirecionando para o WhatsApp...';
            if (window.lucide) lucide.createIcons();

            setTimeout(() => {
                window.open(`https://wa.me/5511990127604?text=${waMsg}`, '_blank');
                contactForm.reset();
                formStatus.innerHTML = '';
            }, 1000);
        });
    }

    // 7. GSAP SCROLLTRIGGER ANIMATIONS
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Fade-ups
        gsap.utils.toArray('.hero .fade-up').forEach((elem, index) => {
            gsap.to(elem, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: index * 0.15,
                ease: "power3.out"
            });
        });

        // Hero Image Scale
        gsap.to('.hero-visual.fade-scale', {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out"
        });

        // General Scroll Animations
        const fadeUpElems = document.querySelectorAll('.section-padding .fade-up');
        fadeUpElems.forEach(elem => {
            const delayAttr = elem.getAttribute('data-delay') || 0;
            gsap.fromTo(elem, 
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    delay: parseFloat(delayAttr),
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    }
                }
            );
        });

        const fadeLeftElems = document.querySelectorAll('.fade-left');
        fadeLeftElems.forEach(elem => {
            gsap.fromTo(elem,
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 80%"
                    }
                }
            );
        });

        const fadeRightElems = document.querySelectorAll('.fade-right');
        fadeRightElems.forEach(elem => {
            gsap.fromTo(elem,
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 80%"
                    }
                }
            );
        });
    }
});