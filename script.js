const ITEMS=[
  {title:"Insta Anonymous Viewer",category:"social",desc:"View profiles anonymously",size:"12MB",url:"https://a.xpshort.com/h4squadb", img:"insta.jpg"},
  {title:"PLAYit VIP",category:"media",desc:"Premium video player",size:"20MB",url:"https://a.xpshort.com/TteFAe", img:"playit.jpg"},
  {title:"LIGHTROOM PRO",category:"photo",desc:"Professional photo editor",size:"50MB",url:"https://a.xpshort.com/1UjkWv", img:"lightroom.jpg"},
  {title:"REMINI PRO",category:"photo",desc:"Enhance your photos",size:"15MB",url:"https://a.xpshort.com/9MdZ", img:"remini.jpg"},
  {title:"NETFLIX PRO",category:"media",desc:"Premium Netflix features",size:"10MB",url:"https://a.xpshort.com/Aoar", img:"netflix.jpg"},
  {title:"YOUTUBE PREMIUM",category:"media",desc:"Ad-free YouTube",size:"8MB",url:"https://a.xpshort.com/GWecRC", img:"youtube.jpg"},
  {title:"SONY-LIV PRO",category:"media",desc:"Premium SonyLiv features",size:"18MB",url:"https://a.xpshort.com/UZGCZ", img:"sonyliv.jpg"},
  {title:"PICSART PRO",category:"photo",desc:"Pro editing tools",size:"25MB",url:"https://a.xpshort.com/VVI56C", img:"picsart.jpg"},
  {title:"TRUECALLER GOLD",category:"utilities",desc:"Caller ID & spam blocker",size:"5MB",url:"https://a.xpshort.com/TwgRw", img:"truecaller.jpg"},
  {title:"PhonPe Spoof",category:"utilities",desc:"Payment simulation tool",size:"3MB",url:"https://a.xpshort.com/HaSk", img:"phonepe.jpg"},
  {title:"Amazon Pro",category:"utilities",desc:"Premium shopping tools",size:"10MB",url:"https://a.xpshort.com/r2zyCe", img:"amazon.jpg"},
  {title:"FF Panel",category:"utilities",desc:"Direct Headshot, Many more",size:"438MB",url:"https://xpshort.com/NDUr6", img:"ffpanel.jpg"}
];

const searchInput=document.getElementById('searchInput');
const cardsGrid=document.getElementById('cardsGrid');
const categoryFilter=document.getElementById('categoryFilter');
const resultsCount=document.getElementById('resultsCount');

/* Render cards */
function renderCards(items,container){
  container.innerHTML='';
  items.forEach(it=>{
    const card=document.createElement('div');
    card.className='card';
    card.innerHTML=`<img src="${it.img}" class="card-img" alt="${it.title}"><h3>${it.title}</h3><p>${it.desc}</p>`;
    card.addEventListener('click',()=>{showModal(it);});
    container.appendChild(card);
  });
  resultsCount.textContent=`${items.length} results`;
}
renderCards(ITEMS,cardsGrid);

/* Filters */
function applyFilters(){
  let filtered=[...ITEMS];
  if(categoryFilter.value!=='all') filtered=filtered.filter(it=>it.category===categoryFilter.value);
  const val=searchInput.value.toLowerCase();
  if(val) filtered=filtered.filter(it=>it.title.toLowerCase().includes(val));
  renderCards(filtered,cardsGrid);
}
categoryFilter.addEventListener('change',applyFilters);
searchInput.addEventListener('input',applyFilters);

/* Navigation */
document.querySelectorAll('.nav-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('is-active'));
    document.getElementById(btn.dataset.target).classList.add('active');
    btn.classList.add('is-active');
  });
});

/* Collection click */
document.querySelectorAll('.collection-card').forEach(cc=>{
  cc.addEventListener('click',()=>{
    const cat=cc.dataset.category;
    const filtered=ITEMS.filter(it=>it.category===cat);
    renderCards(filtered,document.getElementById('collectionCards'));
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('is-active'));
    document.querySelector('[data-target="collections"]').classList.add('is-active');
  });
});

/* Modal */
const modal=document.getElementById('modal');
const modalClose=document.getElementById('modalClose');
const modalTitle=document.getElementById('modalTitle');
const modalDesc=document.getElementById('modalDesc');
const modalSize=document.getElementById('modalSize');
const modalCat=document.getElementById('modalCat');
const modalImg=document.getElementById('modalImg');
const downloadBtn=document.getElementById('downloadBtn');

function showModal(it){
  modalTitle.textContent=it.title;
  modalDesc.textContent=it.desc;
  modalSize.textContent=it.size;
  modalCat.textContent=it.category;
  modalImg.src=it.img;
  downloadBtn.href=it.url;
  modal.style.display='flex';
}
modalClose.addEventListener('click',()=>{modal.style.display='none';});

/* Autocomplete */
let acList=document.createElement('ul');
acList.className='autocomplete-list';
searchInput.parentNode.appendChild(acList);
searchInput.addEventListener('input',()=>{
  const val=searchInput.value.trim().toLowerCase();
  acList.innerHTML='';
  if(!val){acList.style.display='none';return;}
  const matches=ITEMS.filter(it=>it.title.toLowerCase().includes(val));
  if(matches.length===0){acList.style.display='none';return;}
  matches.slice(0,6).forEach(it=>{
    const li=document.createElement('li');
    li.innerHTML=it.title.replace(new RegExp(`(${val})`,'gi'),`<mark>$1</mark>`);
    li.addEventListener('click',()=>{
      searchInput.value=it.title; acList.style.display='none'; showModal(it);
    });
    acList.appendChild(li);
  });
  acList.style.display='block';
});
document.addEventListener('click',e=>{if(e.target!==searchInput) acList.style.display='none';});

/* Footer year */
document.getElementById('year').textContent=new Date().getFullYear();
