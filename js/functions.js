// token logic (igual que antes)
(function() {
  var token = document.cookie.match(/petcaria_token=([^;]+)/);
  if (token) {
    var now = Date.now();
    var expire = now + 60*24*60*60*1000; // 60 días
    sessionStorage.setItem('petcaria_token', JSON.stringify({
      value: token[1],
      expires: expire
    }));
  }
  var stored = sessionStorage.getItem('petcaria_token');
  if (stored) {
    var obj = JSON.parse(stored);
    if (Date.now() > obj.expires) {
      sessionStorage.removeItem('petcaria_token');
    }
  }
})();

// menú móvil
document.addEventListener('DOMContentLoaded', function() {
  const btn  = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');

  function closeMenu() {
    btn.classList.remove('active');
    menu.classList.remove('active');
  }

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    btn.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // clic fuera cierra
  document.addEventListener('click', function(e) {
    if (menu.classList.contains('active') &&
        !menu.contains(e.target) &&
        !btn.contains(e.target)) {
      closeMenu();
    }
  });

  // ESC cierra
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
});
