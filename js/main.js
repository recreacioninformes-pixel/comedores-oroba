/* Comedores Oroba — interacciones */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu');

  /* Año del footer */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Header al hacer scroll */
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Menú móvil */
  function closeMenu() {
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menú' : 'Cerrar menú');
      nav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });
  }

  /* Fotos: si aún no existe el archivo, se muestra el marcador */
  document.querySelectorAll('.media img').forEach(function (img) {
    function missing() { img.classList.add('is-missing'); }
    if (img.complete && img.naturalWidth === 0) missing();
    img.addEventListener('error', missing);
  });

  /* Animación al desplazarse */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Enlace activo del menú */
  var links = document.querySelectorAll('.nav a[href^="#"]:not(.btn)');
  var sections = Array.prototype.map.call(links, function (a) { return document.querySelector(a.getAttribute('href')); });
  if ('IntersectionObserver' in window && sections.length) {
    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + entry.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { if (s) navIo.observe(s); });
  }

  /* Botones de servicio: preseleccionan el servicio en el formulario */
  var select = document.getElementById('servicio');
  document.querySelectorAll('[data-service]').forEach(function (a) {
    a.addEventListener('click', function () { if (select) select.value = a.getAttribute('data-service'); });
  });

  /* ---------- Formulario ---------- */
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var button = form.querySelector('button[type="submit"]');

  function setStatus(msg, type) {
    status.textContent = msg;
    status.className = 'form-status' + (type ? ' is-' + type : '');
  }

  function validate() {
    var ok = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      var valid = field.type === 'checkbox' ? field.checked : field.checkValidity() && field.value.trim() !== '';
      field.closest('.field').classList.toggle('has-error', !valid);
      field.setAttribute('aria-invalid', String(!valid));
      if (!valid) ok = false;
    });
    return ok;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) {
      setStatus('Revisa los campos marcados para continuar.', 'error');
      var first = form.querySelector('[aria-invalid="true"]');
      if (first) first.focus();
      return;
    }

    var endpoint = (form.getAttribute('data-endpoint') || '').trim();
    if (!endpoint) {
      // Sin integración no se finge un envío.
      setStatus('El formulario aún no está conectado a un servicio de recepción. Tu solicitud no se ha enviado.', 'error');
      return;
    }

    button.disabled = true;
    setStatus('Enviando…');

    fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        form.reset();
        setStatus('Gracias. Recibimos tu solicitud y te contactaremos.', 'ok');
      })
      .catch(function () {
        setStatus('No pudimos enviar tu solicitud. Intenta de nuevo más tarde.', 'error');
      })
      .finally(function () { button.disabled = false; });
  });

  form.addEventListener('input', function (e) {
    var field = e.target.closest('.field');
    if (field && field.classList.contains('has-error')) {
      var input = e.target;
      var valid = input.type === 'checkbox' ? input.checked : input.checkValidity();
      if (valid) { field.classList.remove('has-error'); input.removeAttribute('aria-invalid'); }
    }
  });
})();
