(function () {
  var root = window.SITE_ROOT || './';
  var type = window.FOOTER_TYPE || 'simple';
  var snippet = type === 'full' ? 'footer-full.html' : 'footer-simple.html';
  fetch(root + 'snippets/' + snippet)
    .then(function (r) { return r.text(); })
    .then(function (html) {
      var processed = html.replace(/\{\{ROOT\}\}/g, root);
      var placeholder = document.getElementById('footer-placeholder');
      if (placeholder) placeholder.outerHTML = processed;
    })
    .catch(function (err) { console.warn('Footer snippet failed to load:', err); });
})();
