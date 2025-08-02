function showPage(id) {
  const pages = document.querySelectorAll("section");
  pages.forEach(page => page.style.display = "none");
  document.getElementById(id).style.display = "block";
}
window.onload = () => {
  showPage('home');
};
