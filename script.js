document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Language Toggle State Management
  // =========================================================================
  const toggleLangBtn = document.getElementById('toggle-lang');
  
  // Load cached preference or default to English (body class empty = English)
  const cachedLang = localStorage.getItem('dy_portfolio_lang');
  if (cachedLang === 'id') {
    document.body.classList.add('lang-is-id');
  }

  function updateDynamicElements() {
    const isIndonesian = document.body.classList.contains('lang-is-id');
    
    // Dynamic Input Placeholders
    const namaInput = document.getElementById('namaLengkap');
    const bisnisInput = document.getElementById('namaBisnis');
    if (namaInput) {
      namaInput.placeholder = isIndonesian 
        ? namaInput.getAttribute('data-placeholder-id') 
        : namaInput.getAttribute('data-placeholder-en');
    }
    if (bisnisInput) {
      bisnisInput.placeholder = isIndonesian 
        ? bisnisInput.getAttribute('data-placeholder-id') 
        : bisnisInput.getAttribute('data-placeholder-en');
    }
    
    // Dynamic Select Options translation
    const budgetInput = document.getElementById('budgetIklan');
    if (budgetInput) {
      Array.from(budgetInput.options).forEach(opt => {
        opt.text = isIndonesian ? opt.getAttribute('data-id') : opt.getAttribute('data-en');
      });
    }
    
    // Dynamic WhatsApp Floating Action Button (FAB) link swap
    const whatsappFab = document.getElementById('whatsappFab');
    if (whatsappFab) {
      const fabText = isIndonesian
        ? 'Halo DYCollective, saya ingin berkonsultasi mengenai strategi Performance Marketing untuk bisnis saya.'
        : 'Hi DY Collective, I would like to schedule a strategy consultation for my business.';
      whatsappFab.href = `https://api.whatsapp.com/send?phone=6287787310526&text=${encodeURIComponent(fabText)}`;
    }
  }

  if (toggleLangBtn) {
    toggleLangBtn.addEventListener('click', () => {
      // Toggle class is handled by the inline V1.1-DY Offline tracking script block
      const isIndonesian = document.body.classList.contains('lang-is-id');
      localStorage.setItem('dy_portfolio_lang', isIndonesian ? 'id' : 'en');
      updateDynamicElements();
    });
  }

  // Initial trigger
  updateDynamicElements();


  // =========================================================================
  // 2. Sticky Header & Scroll Progress Indicator
  // =========================================================================
  const header = document.getElementById('mainHeader');
  const scrollProgress = document.getElementById('scrollProgress');
  const burgerMenu = document.getElementById('burgerMenu');
  const navLinks = document.getElementById('navLinks');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Header shadow on scroll
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll progress line
    if (scrollHeight > 0) {
      const percentage = (scrollTop / scrollHeight) * 100;
      scrollProgress.style.width = `${percentage}%`;
    }
  });

  // Mobile menu burger toggle
  burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close nav on nav link click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      burgerMenu.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });


  // =========================================================================
  // 3. Floating Back to Top Button
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });


  // =========================================================================
  // 4. Intersection Observer Scroll Reveal
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-element');
  const hiddenScrollElements = document.querySelectorAll('.hidden-scroll');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-scroll');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  hiddenScrollElements.forEach(el => {
    scrollObserver.observe(el);
  });


  // =========================================================================
  // 5. Dynamic Number Counters (Track Record Metrics)
  // =========================================================================
  const prestigeCard = document.querySelector('.prestige-card');
  let countersAnimated = false;

  const animateCounters = () => {
    const duration = 2000; // 2 seconds

    const omsetEN = document.getElementById('omsetValEN');
    const omsetID = document.getElementById('omsetValID');
    const roasEN = document.getElementById('roasValEN');
    const roasID = document.getElementById('roasValID');
    const leadEN = document.getElementById('leadValEN');
    const leadID = document.getElementById('leadValID');

    // 1. Revenue Counter: $0 -> $20,000+ / Mo (EN) | Rp 200 JT+/Bulan (ID)
    const omsetTarget = 200;
    let omsetStart = 0;
    const omsetStepTime = Math.max(Math.floor(duration / omsetTarget), 15);
    const omsetTimer = setInterval(() => {
      omsetStart += Math.ceil(omsetTarget / (duration / omsetStepTime));
      if (omsetStart >= omsetTarget) {
        if (omsetEN) omsetEN.textContent = `$20,000+ / Mo`;
        if (omsetID) omsetID.textContent = `Rp 200 JT+/Bulan`;
        clearInterval(omsetTimer);
      } else {
        if (omsetEN) omsetEN.textContent = `$${Math.round(omsetStart / 10)},000+ / Mo`;
        if (omsetID) omsetID.textContent = `Rp ${omsetStart} JT+/Bulan`;
      }
    }, omsetStepTime);

    // 2. ROAS Counter: 10x -> 20x ROAS (both)
    const roasTarget = 20;
    let roasStart = 10;
    const roasStepTime = Math.max(Math.floor(duration / (roasTarget - 10)), 50);
    const roasTimer = setInterval(() => {
      roasStart += 1;
      if (roasStart >= roasTarget) {
        const text = `10x - ${roasTarget}x ROAS`;
        if (roasEN) roasEN.textContent = text;
        if (roasID) roasID.textContent = text;
        clearInterval(roasTimer);
      } else {
        const text = `10x - ${roasStart}x ROAS`;
        if (roasEN) roasEN.textContent = text;
        if (roasID) roasID.textContent = text;
      }
    }, roasStepTime);

    // 3. Valid Leads / Quality Surge Counter: 10% -> 70% (EN) / 10% -> 60% (ID)
    const leadTargetEN = 70;
    const leadTargetID = 60;
    let leadStart = 10;
    const leadStepTime = Math.max(Math.floor(duration / 60), 20);
    const leadTimer = setInterval(() => {
      leadStart += 2;
      
      if (leadEN) {
        if (leadStart >= leadTargetEN) {
          leadEN.textContent = `70% Valid Leads`;
        } else {
          leadEN.textContent = `${leadStart}% Valid Leads`;
        }
      }
      
      if (leadID) {
        if (leadStart >= leadTargetID) {
          leadID.textContent = `+60% Quality Surge`;
        } else {
          leadID.textContent = `+${leadStart}% Quality Surge`;
        }
      }

      if (leadStart >= Math.max(leadTargetEN, leadTargetID)) {
        clearInterval(leadTimer);
      }
    }, leadStepTime);
  };

  // Observe track record card to run counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        animateCounters();
        countersAnimated = true;
      }
    });
  }, { threshold: 0.5 });

  if (prestigeCard) {
    counterObserver.observe(prestigeCard);
  }


  // =========================================================================
  // 6. Certificates Lightbox Gallery Modal
  // =========================================================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxSubtitle = document.getElementById('lightboxSubtitle');
  const lightboxClose = document.getElementById('lightboxClose');
  const certCards = document.querySelectorAll('.prestige-cert-card');

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgPath = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      const issuer = card.getAttribute('data-issuer');

      lightboxImg.src = imgPath;
      lightboxTitle.textContent = title;
      lightboxSubtitle.textContent = issuer;

      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Release scroll
  };

  lightboxClose.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });


  // =========================================================================
  // 7. Commercial Packages Click-to-WhatsApp Funnel
  // =========================================================================
  const pricingBtns = document.querySelectorAll('.pricing-cta');

  pricingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('btn-trigger-tracking')) {
        return; // Handled by offline tracking script block to avoid double-opening WhatsApp
      }
      const packageName = btn.getAttribute('data-package');
      
      if (!packageName) return;

      const isIndonesian = document.body.classList.contains('lang-is-id');
      let textMessage = '';
      if (isIndonesian) {
        textMessage = `Halo DYCollective, saya tertarik dengan paket *(${packageName})* dan ingin berkonsultasi mengenai strategi Performance Marketing bisnis saya.`;
      } else {
        textMessage = `Hi DY Collective, I am interested in the *(${packageName})* package and would like to schedule a Performance Marketing consultation.`;
      }
      
      window.open(`https://api.whatsapp.com/send?phone=6287787310526&text=${encodeURIComponent(textMessage)}`, '_blank');
    });
  });


  // =========================================================================
  // 8. Lead Consultation Form Click-to-WhatsApp Funnel
  // =========================================================================
  const whatsappForm = document.getElementById('whatsappForm');

  whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nama = document.getElementById('namaLengkap').value.trim();
    const bisnis = document.getElementById('namaBisnis').value.trim();
    const budget = document.getElementById('budgetIklan').value;

    const isIndonesian = document.body.classList.contains('lang-is-id');

    if (!nama || !bisnis || !budget) {
      alert(isIndonesian ? 'Mohon lengkapi seluruh formulir sebelum mengirim.' : 'Please complete the entire form before sending.');
      return;
    }

    let textMsg = '';
    if (isIndonesian) {
      textMsg = `Halo DYCollective, saya *(${nama})* dari *(${bisnis})* ingin konsultasi strategi Performance Marketing. Saat ini budget iklan saya di range *(${budget})*.`;
    } else {
      textMsg = `Hi DY Collective, I am *(${nama})* from *(${bisnis})* and would like to schedule a strategy consultation. Currently, my monthly ad budget is in the *(${budget})* range.`;
    }
    
    window.open(`https://api.whatsapp.com/send?phone=6287787310526&text=${encodeURIComponent(textMsg)}`);
  });

});
