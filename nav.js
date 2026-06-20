// Scroll: adaugă clasa .scrolled pe navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Burger: toggle meniu mobil
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

burger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
});

// Închide meniul la click pe un link
mobileMenu.querySelectorAll('.navbar__mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  });
});
