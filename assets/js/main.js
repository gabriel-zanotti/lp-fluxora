(() => {
  const body = document.body;
  if (!body) return;

  body.classList.add('has-js');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const setupButtonInteractions = () => {
    const buttons = Array.from(document.querySelectorAll('.btn'));
    if (!buttons.length) return;

    buttons.forEach((button) => {
      const resetTransform = () => {
        button.style.transform = '';
      };

      button.addEventListener('pointermove', (event) => {
        if (prefersReducedMotion) return;

        const rect = button.getBoundingClientRect();
        const localX = event.clientX - rect.left;
        const localY = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const moveX = clamp((localX - centerX) / 10, -5, 5);
        const moveY = clamp((localY - centerY) / 12, -4, 4);
        const rotateY = clamp((localX - centerX) / 14, -6, 6);
        const rotateX = clamp((centerY - localY) / 14, -6, 6);

        button.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });

      button.addEventListener('pointerleave', () => {
        button.classList.remove('is-pressed');
        resetTransform();
      });

      button.addEventListener('pointerdown', () => {
        button.classList.add('is-pressed');
      });

      button.addEventListener('pointerup', () => {
        button.classList.remove('is-pressed');
      });

      button.addEventListener('click', (event) => {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';

        const hasPointer = event.clientX !== 0 || event.clientY !== 0;
        const x = hasPointer ? event.clientX - rect.left : rect.width / 2;
        const y = hasPointer ? event.clientY - rect.top : rect.height / 2;

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        button.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  };

  const setupReveal = () => {
    const reveals = Array.from(document.querySelectorAll('.reveal'));
    if (!reveals.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.18 }
    );

    reveals.forEach((el) => observer.observe(el));
  };

  const setupProgressBar = () => {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;

    const update = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  };

  const setupActiveNav = () => {
    const page = body.dataset.page;
    if (!page) return;

    document.querySelectorAll('[data-nav-target]').forEach((link) => {
      if (link.getAttribute('data-nav-target') === page) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  };

  const setupDemoTabs = () => {
    const tabs = Array.from(document.querySelectorAll('[data-demo-tab]'));
    const panels = Array.from(document.querySelectorAll('[data-demo-panel]'));
    if (!tabs.length || !panels.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.demoTab;

        tabs.forEach((item) => item.classList.remove('is-active'));
        panels.forEach((panel) => panel.classList.remove('is-active'));

        tab.classList.add('is-active');
        const panel = panels.find((item) => item.dataset.demoPanel === target);
        if (panel) panel.classList.add('is-active');
      });
    });
  };

  const setupDemoForm = () => {
    const form = document.querySelector('.demo-form');
    const feedback = document.querySelector('.demo-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      feedback.textContent = 'Demo solicitada com sucesso. Nosso time entra em contato em ate 1 dia util.';
      form.reset();
    });
  };

  const setupFaq = () => {
    const triggers = Array.from(document.querySelectorAll('.faq-trigger'));
    if (!triggers.length) return;

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        const content = item ? item.querySelector('.faq-content') : null;
        if (!item || !content) return;

        const isOpen = item.classList.contains('is-open');
        document.querySelectorAll('.faq-item').forEach((faqItem) => {
          faqItem.classList.remove('is-open');
          const faqTrigger = faqItem.querySelector('.faq-trigger');
          const faqContent = faqItem.querySelector('.faq-content');
          if (faqTrigger) faqTrigger.setAttribute('aria-expanded', 'false');
          if (faqContent) faqContent.style.maxHeight = '0px';
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          content.style.maxHeight = `${content.scrollHeight}px`;
        }
      });
    });
  };

  const setupResourceFilter = () => {
    const chips = Array.from(document.querySelectorAll('[data-filter]'));
    const cards = Array.from(document.querySelectorAll('.resource-card[data-category]'));
    if (!chips.length || !cards.length) return;

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;

        chips.forEach((item) => item.classList.remove('is-active'));
        chip.classList.add('is-active');

        cards.forEach((card) => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  };

  const setupBillingSwitch = () => {
    const buttons = Array.from(document.querySelectorAll('[data-billing]'));
    const prices = Array.from(document.querySelectorAll('[data-price-monthly][data-price-yearly]'));
    if (!buttons.length || !prices.length) return;

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const billing = button.dataset.billing;

        buttons.forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');

        prices.forEach((price) => {
          price.textContent = billing === 'anual'
            ? price.dataset.priceYearly
            : price.dataset.priceMonthly;
        });
      });
    });
  };

  const setupCountUp = () => {
    const counters = Array.from(document.querySelectorAll('[data-count-to]'));
    if (!counters.length) return;

    const runCounter = (element) => {
      const to = Number(element.dataset.countTo || 0);
      const prefix = element.dataset.countPrefix || '';
      const suffix = element.dataset.countSuffix || '';
      const duration = prefersReducedMotion ? 0 : 1200;

      if (duration === 0) {
        element.textContent = `${prefix}${to}${suffix}`;
        return;
      }

      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.round(to * (1 - Math.pow(1 - progress, 3)));
        element.textContent = `${prefix}${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCounter);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          runCounter(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((counter) => observer.observe(counter));
  };

  const setupSmoothAnchors = () => {
    const anchors = Array.from(document.querySelectorAll('a[href*="#"]'));
    if (!anchors.length) return;

    const scrollToHash = (hash, smooth) => {
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;

      const header = document.querySelector('.topbar');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const offset = headerHeight + 18;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: smooth && !prefersReducedMotion ? 'smooth' : 'auto'
      });
    };

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        const href = anchor.getAttribute('href');
        if (!href) return;

        const url = new URL(href, window.location.href);
        const currentPath = `${window.location.origin}${window.location.pathname}`;
        const targetPath = `${url.origin}${url.pathname}`;
        if (targetPath !== currentPath) return;
        if (!url.hash || url.hash === '#') return;

        event.preventDefault();
        history.pushState(null, '', url.hash);
        scrollToHash(url.hash, true);
      });
    });

    if (window.location.hash) {
      window.setTimeout(() => {
        scrollToHash(window.location.hash, false);
      }, 40);
    }
  };

  setupButtonInteractions();
  setupReveal();
  setupProgressBar();
  setupActiveNav();
  setupDemoTabs();
  setupDemoForm();
  setupFaq();
  setupResourceFilter();
  setupBillingSwitch();
  setupCountUp();
  setupSmoothAnchors();
})();
