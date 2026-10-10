/* і. капча — официальный сайт. Общий скрипт. */
(function () {
  /* ── тема ── */
  var root = document.documentElement;
  var toggle = document.getElementById('themeToggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? '' : 'dark';
      root.setAttribute('data-theme', next || '');
      try { localStorage.setItem('cap-theme', next || 'light'); } catch (e) {}
    });
  }

  /* ── активный пункт меню ── */
  var here = location.pathname.split('/').pop() || 'official.html';
  document.querySelectorAll('.nav__links a[href]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === here || (here === '' && href === 'official.html')) a.classList.add('active');
  });

  /* ── копирование кода ── */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var block = btn.closest('.codeblock');
      var code = block && block.querySelector('pre code, pre');
      if (!code) return;
      var text = code.textContent;
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'скопировано';
        btn.disabled = true;
        setTimeout(function () { btn.textContent = old; btn.disabled = false; }, 1400);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  });
})();
