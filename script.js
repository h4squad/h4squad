function showPage(id) {
  document.querySelectorAll('section').forEach(page => {
    page.classList.remove('active');
  });
  const section = document.getElementById(id);
  if (section) {
    section.classList.add('active');
  }
}
window.onload = () => {
  showPage('home');
};