// assets/js/location.js

/**
 * Detecta la ubicación del usuario y devuelve país y estado.
 * @param {Function} callback Recibe un objeto { country, state }.
 */
function detectarUbicacion(callback) {
  if (!navigator.geolocation) {
    return callback({ country: '', state: '' });
  }

  navigator.geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(res => res.json())
        .then(data => {
          const addr = data.address || {};
          callback({
            country: addr.country || '',
            state: addr.state || addr.region || ''
          });
        })
        .catch(() => callback({ country: '', state: '' }));
    },
    // onError
    () => callback({ country: '', state: '' }),
    { enableHighAccuracy: true, timeout: 5000 }
  );
}

// En páginas donde lo uses, por ejemplo en header.php:
window.addEventListener('load', () => {
  detectarUbicacion(function(geo) {
    if (geo.country === 'México') {
      const select = document.getElementById('select-estado');
      let found = false;
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === geo.state) {
          select.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found) {
        select.value = '__cerca__';
      }
    }
  });
});
