// The page remains fully usable without JavaScript.
const navLinks = [...document.querySelectorAll('.section-nav a')];
function updateNavigation() {
  const activeHash = location.hash && location.hash !== '#top' ? location.hash : '#about';
  navLinks.forEach(link => {
    if (link.hash === activeHash) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}
window.addEventListener('hashchange', updateNavigation);
updateNavigation();
