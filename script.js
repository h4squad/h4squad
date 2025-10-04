/* ===== data =====
   NOTE: img values are full paths relative to your site root.
   Put those image files into an "images" folder:
     images/netflix.jpg
     images/ffpanel.jpg
     images/default.jpg  (fallback)
*/
const ITEMS = [
  {title:"Insta Anonymous Viewer",category:"social",desc:"View profiles anonymously",size:"12MB",url:"https://a.xpshort.com/h4squadb",img:"insta.jpg"},
  {title:"PLAYit VIP",category:"media",desc:"Premium video player",size:"20MB",url:"https://a.xpshort.com/TteFAe",img:"playit.jpg"},
  {title:"LIGHTROOM PRO",category:"photo",desc:"Professional photo editor",size:"50MB",url:"https://a.xpshort.com/1UjkWv",img:"lightroom.jpg"},
  {title:"REMINI PRO",category:"photo",desc:"Enhance your photos",size:"15MB",url:"https://a.xpshort.com/9MdZ",img:"remini.jpg"},
  {title:"NETFLIX PRO",category:"media",desc:"Premium Netflix features",size:"10MB",url:"https://a.xpshort.com/Aoar",img:"netflix.jpg"},
  {title:"YOUTUBE PREMIUM",category:"media",desc:"Ad-free YouTube",size:"8MB",url:"https://a.xpshort.com/GWecRC",img:"youtube.jpg"},
  {title:"SONY-LIV PRO",category:"media",desc:"Premium SonyLiv features",size:"18MB",url:"https://a.xpshort.com/UZGCZ",img:"sonyliv.jpg"},
  {title:"PICSART PRO",category:"photo",desc:"Pro editing tools",size:"25MB",url:"https://a.xpshort.com/VVI56C",img:"picsart.jpg"},
  {title:"TRUECALLER GOLD",category:"utilities",desc:"Caller ID & spam blocker",size:"5MB",url:"https://a.xpshort.com/TwgRw",img:"truecaller.jpg"},
  {title:"PhonPe Spoof",category:"utilities",desc:"Payment simulation tool",size:"3MB",url:"https://a.xpshort.com/HaSk",img:"phonepe.jpg"},
  {title:"Amazon MTV",category:"utilities",desc:"Premium shopping tools",size:"10MB",url:"https://a.xpshort.com/r2zyCe",img:"amazon.jpg"},
  {title:"FF Panel",category:"utilities",desc:"Direct Headshot, Many more",size:"187MB",url:"https://xpshort.com/panelff",img:"ffpanel.jpg"},
  {title:"WhatsApp BAN Method",category:"utilities",desc:"BAN and UNBAN method",size:"5MB",url:"https://xpshort.com/PazkJJ",img:"ban.jpg"}
];

/* ===== DOM refs ===== */
const searchInput = document.getElementById('searchInput');
const cardsGrid = document.getElementById('cardsGrid');
const categoryFilter = document.getElementById('categoryFilter');
const resultsCount = document.getElementById('resultsCount');
const collectionCards = document.getElementById('collectionCards');
const showAllBtn = document.getElementById('showAll');

/* modal refs */
const modal = document.getElementById('modal');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalSize = document.getElementById('modalSize');
const modalCat = document.getElementById('modalCat');
const downloadBtn = document.getElementById('downloadBtn');

/* autocomplete list */
let acList = document.createElement('ul');
acList.className = 'autocomplete-list';
searchInput.parentNode.appendChild(acList);

/* ===== helpers ===== */
function renderCards(items, container){
  container.innerHTML = '';
  if(!items || items.length === 0){
    container.innerHTML = `<div style="padding:18px;color:var(--muted)">No items found.</div>`;
    resultsCount.textContent = `0 results`;
    return;
  }

  items.forEach(it => {
    const card = document.createElement('div');
    card.className = 'card';
    // image tag with fallback on error
    card.innerHTML = `
      <img src="${it.img || 'images/default.jpg'}" alt="${escapeHtml(it.title)}" class="card-img"
           onerror="this.onerror=null;this.src='images/default.jpg'">
      <h3>${escapeHtml(it.title)}</h3>
      <p>${escapeHtml(it.desc)}</p>
    `;
    card.addEventListener('click', () => showModal(it));
    container.appendChild(card);
  });

  resultsCount.textContent = `${items.length} results`;
}

/* sanitize */
function escapeHtml(text){
  return String(text).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
}

/* ===== filtering & search ===== */
function applyFilters(){
  let filtered = [...ITEMS];
  const cat = categoryFilter.value;
  const q = searchInput.value.trim().toLowerCase();

  if(cat !== 'all') filtered = filtered.filter(it => it.category === cat);
  if(q) filtered = filtered.filter(it => it.title.toLowerCase().includes(q) || it.desc.toLowerCase().includes(q));

  renderCards(filtered, cardsGrid);
}

/* ===== collections click ===== */
document.querySelectorAll('.collection-card').forEach(cc => {
  cc.addEventListener('click', () => {
    const cat = cc.dataset.category;
    const filtered = ITEMS.filter(it => it.category === cat);
    renderCards(filtered, collectionCards);
    // switch to collections tab
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('collections').classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('is-active'));
    document.querySelector('[data-target="collections"]').classList.add('is-active');
  });
});

/* ===== modal ===== */
function showModal(it){
  modalImg.src = it.img || 'images/default.jpg';
  modalImg.onerror = () => modalImg.src = 'images/default.jpg';
  modalTitle.textContent = it.title;
  modalDesc.textContent = it.desc;
  modalSize.textContent = it.size;
  modalCat.textContent = it.category;
  downloadBtn.href = it.url;
  modal.style.display = 'flex';
  modal.setAttribute('aria-hidden','false');
}
modalClose?.addEventListener('click', () => {
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden','true');
});
modal.addEventListener('click', (e) => {
  if(e.target === modal) { modal.style.display='none'; modal.setAttribute('aria-hidden','true'); }
});
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') { modal.style.display='none'; } });

/* ===== autocomplete ===== */
searchInput.addEventListener('input', () => {
  const val = searchInput.value.trim().toLowerCase();
  acList.innerHTML = '';
  if(!val){ acList.style.display = 'none'; applyFilters(); return; }

  const matches = ITEMS.filter(it => it.title.toLowerCase().includes(val));
  if(matches.length === 0){ acList.style.display = 'none'; applyFilters(); return; }

  matches.slice(0,8).forEach(it => {
    const li = document.createElement('li');
    // highlight match
    const regex = new RegExp(`(${escapeRegExp(val)})`, 'gi');
    li.innerHTML = it.title.replace(regex, '<mark>$1</mark>');
    li.addEventListener('click', () => {
      searchInput.value = it.title;
      acList.style.display = 'none';
      showModal(it);            // open modal immediately on click
    });
    acList.appendChild(li);
  });
  acList.style.display = 'block';
  applyFilters(); // live filter while typing
});
document.addEventListener('click', (e) => {
  if(e.target !== searchInput) acList.style.display = 'none';
});
function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* clear button */
document.getElementById('searchClear')?.addEventListener('click', () => {
  searchInput.value = '';
  applyFilters();
});

/* nav */
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('is-active'));
    document.getElementById(btn.dataset.target).classList.add('active');
    btn.classList.add('is-active');
  });
});

/* show all */
showAllBtn?.addEventListener('click', () => {
  searchInput.value = '';
  categoryFilter.value = 'all';
  renderCards(ITEMS, cardsGrid);
});

/* category filter */
categoryFilter.addEventListener('change', applyFilters);

/* initial render */
renderCards(ITEMS, cardsGrid);

/* footer year */
document.getElementById('year').textContent = new Date().getFullYear();
