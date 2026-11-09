// The page content remains available without JavaScript.
const themeToggle = document.querySelector('.theme-toggle');
function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute('aria-checked', String(theme === 'dark'));
  document.querySelector('meta[name="theme-color"]').setAttribute('content',
    getComputedStyle(document.documentElement).getPropertyValue('--color-paper').trim());
}
setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('color-theme', theme); } catch {}
});

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

const emailContact = document.querySelector('.email-contact');
const emailToggle = emailContact.querySelector('.email-toggle');
const emailPopover = document.querySelector('#email-popover');
let emailPinned = false;

function showEmail(open) {
  emailPopover.hidden = !open;
  emailToggle.setAttribute('aria-expanded', String(open));
}

emailContact.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') showEmail(true);
});
emailContact.addEventListener('pointerleave', () => {
  if (!emailPinned) showEmail(false);
});
emailToggle.addEventListener('focus', () => {
  if (emailToggle.matches(':focus-visible')) showEmail(true);
});
emailContact.addEventListener('focusout', event => {
  if (!emailPinned && !emailContact.contains(event.relatedTarget)) showEmail(false);
});
emailToggle.addEventListener('click', () => {
  emailPinned = !emailPinned;
  showEmail(emailPinned);
});
document.addEventListener('pointerdown', event => {
  if (!emailContact.contains(event.target)) {
    emailPinned = false;
    showEmail(false);
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    emailPinned = false;
    showEmail(false);
  }
});
