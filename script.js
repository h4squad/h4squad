function showPage(id) {
  document.querySelectorAll('section').forEach(page => page.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}
window.onload = () => {
  showPage('home');
};
