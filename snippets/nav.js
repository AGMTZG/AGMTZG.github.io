(function () {
  var root = window.SITE_ROOT || './';
  var active = window.NAV_ACTIVE || 'home';

  fetch(root + 'snippets/nav.html')
    .then(function (r) { return r.text(); })
    .then(function (html) {
      var processed = html.replace(/\{\{ROOT\}\}/g, root);
      var placeholder = document.getElementById('nav-placeholder');
      placeholder.outerHTML = processed;

      // Mark active link
      var links = document.querySelectorAll('#nav-links a');
      links.forEach(function (a) {
        if (a.getAttribute('data-nav') === active) {
          a.classList.add('active');
        }
      });

      // Scrolled shadow on index (hash-based pages)
      var navbar = document.getElementById('site-nav');
      if (navbar) {
        window.addEventListener('scroll', function () {
          navbar.classList.toggle('scrolled', window.scrollY > 20);
        });
      }

      // Hamburger toggle
      var hamburger = document.getElementById('hamburger');
      var mobileMenu = document.getElementById('mobileMenu');
      if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', function () {
          hamburger.classList.toggle('open');
          mobileMenu.classList.toggle('open');
        });
        mobileMenu.querySelectorAll('a').forEach(function (a) {
          a.addEventListener('click', function () {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
          });
        });
      }
    })
    .catch(function (err) {
      console.warn('Nav snippet failed to load:', err);
    });
})();
