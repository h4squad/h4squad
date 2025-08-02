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

  // Adsterra native banner ad injection
  const adDiv = document.createElement('div');
  adDiv.id = 'adsterra-banner';
  adDiv.style = 'margin: 20px auto; text-align: center;';
  document.body.appendChild(adDiv);

  const atOptions = {
    'key': '27228034',
    'format': 'iframe',
    'height': 50,
    'width': 320,
    'params': {}
  };

  const adScript = document.createElement('script');
  adScript.type = 'text/javascript';
  adScript.src = `https://www.profitabledisplaynetwork.com/${atOptions.key}/invoke.js`;
  adDiv.appendChild(adScript);
};
