const PRODUCTS = [
  {id:'ride-car',name:'Happy Ride Car',category:'Ride Ons',age:'1–4 Years',price:1299,old:1699,rating:4.8,reviews:120,tag:'Bestseller',image:'assets/images/products/happy_ride_car.png',gallery:'assets/images/galleries/ride-car.png',sku:'PJ-RC-001',desc:'A sturdy little ride built for big first adventures. Smooth steering, supportive seating and a smile children instantly love.',color:'#ff5a66'},
  {id:'rings',name:'Rainbow Stacking Rings',category:'Educational',age:'6+ Months',price:499,old:699,rating:4.7,reviews:98,tag:'Top Rated',image:'assets/images/products/rainbow_stacking_rings.png',gallery:'assets/images/galleries/rings.png',sku:'PJ-ED-014',desc:'Chunky, easy-grip rings that turn colour, size and coordination into joyful early learning.',color:'#ffbd2e'},
  {id:'teddy',name:'Soft Teddy Bear',category:'Soft Toys',age:'All Ages',price:699,old:999,rating:4.9,reviews:210,tag:'Most Loved',image:'assets/images/products/soft_teddy_bear.png',gallery:'assets/images/galleries/teddy.png',sku:'PJ-ST-008',desc:'Cloud-soft fur, a friendly face and a classic bow—made for cuddles, comfort and forever friendship.',color:'#b77a52'},
  {id:'monster',name:'RC Monster Truck',category:'Remote Control',age:'6+ Years',price:1499,old:1999,rating:4.6,reviews:86,tag:'New',image:'assets/images/products/rc_monster_truck.png',gallery:'assets/images/galleries/monster.png',sku:'PJ-RC-029',desc:'Big tyres, responsive steering and rugged suspension bring off-road excitement to every race.',color:'#ff792e'},
  {id:'blocks',name:'Building Blocks Set',category:'Educational',age:'6+ Years',price:799,old:1049,rating:4.8,reviews:145,tag:'STEM Pick',image:'assets/images/products/building_blocks_set.png',gallery:'assets/images/galleries/blocks.png',sku:'PJ-ED-031',desc:'Bright, durable blocks that make open-ended building, problem solving and imagination click together.',color:'#3378ee'},
  {id:'dino',name:'Dinosaur Toy Set',category:'Action Figures',age:'3+ Years',price:999,old:1399,rating:4.7,reviews:102,tag:'Popular',image:'assets/images/products/dinosaur_toy_set.png',gallery:'assets/images/galleries/dino.png',sku:'PJ-AF-018',desc:'Four friendly prehistoric favourites with tactile detail for roaring stories and curious explorers.',color:'#55aa62'},
  {id:'truck',name:'Construction Truck Set',category:'Vehicle Toys',age:'3+ Years',price:899,old:1199,rating:4.5,reviews:74,tag:'25% Off',image:'assets/images/products/construction_truck_set.png',gallery:'assets/images/galleries/truck.png',sku:'PJ-VT-022',desc:'A chunky working dumper with oversized wheels, ready for sandpit jobs and building-site stories.',color:'#f6b51f'},
  {id:'bike',name:'Mini Sports Bike',category:'Ride Ons',age:'3+ Years',price:1499,old:1999,rating:4.6,reviews:68,tag:'Fast Seller',image:'assets/images/products/mini_sports_bike.png',gallery:'assets/images/galleries/bike.png',sku:'PJ-RO-026',desc:'Sporty looks meet stable training wheels in a confidence-building first motorcycle for young riders.',color:'#ef334e'},
  {id:'kitchen',name:'Kitchen Play Set',category:'Pretend Play',age:'3+ Years',price:1799,old:2499,rating:4.8,reviews:91,tag:'28% Off',image:'assets/images/products/kitchen_play_set.png',gallery:'assets/images/galleries/kitchen.png',sku:'PJ-PP-011',desc:'A beautifully detailed mini kitchen that serves hours of role play, creativity and make-believe meals.',color:'#f49ab1'}
];

const icons = {
  user:'<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  heart:'<svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21.2l7.8-7.8 1.1-1.1a5.5 5.5 0 0 0-.1-7.7z"/></svg>',
  cart:'<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 3h2l2.5 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
  search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  arrow:'<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  close:'<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>'
};

const money = n => '\u20B9' + Number(n).toLocaleString('en-IN');
const getCart = () => JSON.parse(localStorage.getItem('playjoy-cart') || '{}');
const saveCart = cart => { localStorage.setItem('playjoy-cart', JSON.stringify(cart)); updateBadges(); renderCartDrawer(); };
const cartCount = () => Object.values(getCart()).reduce((a,b)=>a+b,0);
const cartTotal = () => Object.entries(getCart()).reduce((sum,[id,q]) => sum + (PRODUCTS.find(p=>p.id===id)?.price || 0)*q,0);

function addProduct(id, qty=1, open=true){
  const cart=getCart(); cart[id]=(cart[id]||0)+Number(qty); saveCart(cart);
  toast(`${PRODUCTS.find(p=>p.id===id)?.name || 'Toy'} added to your joy bag`);
  burst(document.querySelector(`[data-add="${id}"]`));
  if(open) setTimeout(openCart,180);
}
function changeCart(id,delta){const c=getCart();c[id]=Math.max(0,(c[id]||0)+delta);if(!c[id])delete c[id];saveCart(c)}
function removeCart(id){const c=getCart();delete c[id];saveCart(c)}
function updateBadges(){document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=cartCount())}

function productCard(p){
  const off=Math.round((1-p.price/p.old)*100);
  return `<article class="product-card reveal tilt" style="--toy:${p.color}" data-category="${p.category}">
    <div class="card-shine"></div><span class="tag">${p.tag}</span>
    <button class="heart" aria-label="Save ${p.name}" onclick="toggleWish(this)">${icons.heart}</button>
    <a href="product_details.html?id=${p.id}" class="product-image"><span class="blob"></span><img src="${p.image}" alt="${p.name}" loading="lazy"></a>
    <div class="product-copy"><div class="eyebrow">${p.category} · ${p.age}</div><h3><a href="product_details.html?id=${p.id}">${p.name}</a></h3>
    <div class="rating"><span>★★★★★</span> ${p.rating} <small>(${p.reviews})</small></div>
    <div class="price-row"><b>${money(p.price)}</b><s>${money(p.old)}</s><em>${off}% off</em></div>
    <button class="btn btn-primary add-btn" data-add="${p.id}" onclick="addProduct('${p.id}')">${icons.cart}<span>Add to cart</span></button></div>
  </article>`;
}

function siteHeader(active=''){
  return `<div class="announcement"><div class="container"><span><i></i> Made with joy in India</span><span class="announcement-center">Free delivery over ${money(999)} · Safe, non-toxic, durable</span><a href="get_a_sample.html">B2B partnership ${icons.arrow}</a></div></div>
  <header class="header"><div class="container head-main">
    <button class="mobile-toggle" aria-label="Open menu" onclick="document.querySelector('.nav').classList.toggle('open')"><span></span><span></span></button>
    <a class="logo" href="index.html" aria-label="PlayJoy home"><b class="l1">P</b><b class="l2">l</b><b class="l3">a</b><b class="l4">y</b><b class="l5">J</b><b class="l6">o</b><b class="l7">y</b><small>Small toys. Big smiles.</small></a>
    <div class="search"><input id="globalSearch" placeholder="Search happy things…" aria-label="Search products"><button onclick="goSearch()">${icons.search}</button></div>
    <div class="head-actions"><a href="account.html" aria-label="Account">${icons.user}<span>Account</span></a><a href="shop.html" aria-label="Wishlist">${icons.heart}<span>Wishlist</span></a><button class="cart-trigger" onclick="openCart()" aria-label="Open cart">${icons.cart}<span>Cart</span><b data-cart-count>0</b></button></div>
  </div><nav class="container nav"><a class="${active==='shop'?'active':''}" href="shop.html">Shop all</a><a href="shop.html?category=Educational">Learn & create</a><a href="shop.html?category=Ride%20Ons">Ride ons</a><a href="shop.html?category=Soft%20Toys">Soft friends</a><a href="shop.html?sort=rating">Best sellers</a><a class="nav-pill ${active==='b2b'?'active':''}" href="get_a_sample.html">Get a sample</a><a class="${active==='about'?'active':''}" href="about.html">Our story</a></nav></header>`;
}

function siteFooter(){
  return `<section class="promise"><div class="container promise-grid"><div><span>01</span><b>Child-safe always</b><small>BIS compliant materials</small></div><div><span>02</span><b>Made for real play</b><small>Durability tested</small></div><div><span>03</span><b>Delivery, India-wide</b><small>Tracked to your door</small></div><div><span>04</span><b>Easy, human help</b><small>We are here for you</small></div></div></section>
  <footer class="footer"><div class="footer-orb orb-one"></div><div class="footer-orb orb-two"></div><div class="container footer-top"><div class="footer-intro"><a class="logo light" href="index.html"><b class="l1">P</b><b class="l2">l</b><b class="l3">a</b><b class="l4">y</b><b class="l5">J</b><b class="l6">o</b><b class="l7">y</b><small>Small toys. Big smiles.</small></a><h2>Let’s make<br>play wonderful.</h2><p>Original toys, thoughtful design and a little everyday magic.</p></div><div><h4>Discover</h4><a href="shop.html">All toys</a><a href="shop.html?sort=rating">Best sellers</a><a href="shop.html?category=Educational">Educational</a><a href="shop.html?category=Ride%20Ons">Ride ons</a></div><div><h4>PlayJoy</h4><a href="about.html">Our story</a><a href="contact.html">Contact us</a><a href="contact.html#faq">Help & FAQs</a><a href="account.html">My account</a></div><div><h4>For business</h4><a href="get_a_sample.html">Get a sample</a><a href="get_a_sample.html">Bulk enquiry</a><a href="get_a_sample.html">Become a distributor</a><div class="newsletter"><input placeholder="Email for happy news"><button aria-label="Subscribe">${icons.arrow}</button></div></div></div><div class="container footer-bottom"><span>© 2026 PlayJoy. Designed for brighter tomorrows.</span><span>Instagram · YouTube · LinkedIn</span></div></footer>`;
}

function cartDrawer(){return `<div class="drawer-backdrop" onclick="closeCart()"></div><aside class="cart-drawer" aria-label="Shopping cart"><div class="drawer-head"><div><small>YOUR JOY BAG</small><h2>Cart <span data-cart-count>0</span></h2></div><button onclick="closeCart()">${icons.close}</button></div><div class="drawer-items" id="drawerItems"></div><div class="drawer-foot"><div class="drawer-total"><span>Subtotal</span><b id="drawerTotal">${money(0)}</b></div><small>Taxes included. Shipping calculated at checkout.</small><a class="btn btn-primary btn-block" href="checkout.html">Checkout securely ${icons.arrow}</a><a class="drawer-view" href="cart.html">View full cart</a></div></aside>`}
function renderCartDrawer(){const root=document.querySelector('#drawerItems');if(!root)return;const entries=Object.entries(getCart());root.innerHTML=entries.length?entries.map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);if(!p)return'';return `<div class="drawer-item"><a href="product_details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a><div><small>${p.category}</small><h3>${p.name}</h3><b>${money(p.price)}</b><div class="mini-qty"><button onclick="changeCart('${id}',-1)">−</button><span>${q}</span><button onclick="changeCart('${id}',1)">+</button></div></div><button class="remove-x" onclick="removeCart('${id}')">${icons.close}</button></div>`}).join(''):`<div class="drawer-empty"><div class="empty-ball">◯</div><h3>Your joy bag is empty</h3><p>There is always room for a little more wonder.</p><a class="btn btn-dark" href="shop.html">Explore toys</a></div>`;document.querySelector('#drawerTotal').textContent=money(cartTotal())}
function openCart(){document.body.classList.add('cart-open');renderCartDrawer()}
function closeCart(){document.body.classList.remove('cart-open')}
function toggleWish(btn){btn.classList.toggle('active');toast(btn.classList.contains('active')?'Saved to your wishlist':'Removed from wishlist')}
function goSearch(){const q=document.querySelector('#globalSearch')?.value.trim();location.href='shop.html'+(q?'?q='+encodeURIComponent(q):'')}
function toast(message){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.innerHTML=`<b>✓</b><span>${message}</span>`;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}
function burst(el){if(!el)return;for(let i=0;i<7;i++){const s=document.createElement('i');s.className='spark';s.style.cssText=`--x:${(Math.random()-.5)*90}px;--y:${-20-Math.random()*60}px;--c:${['#ff3974','#ffc62f','#3aa7ff','#50c78d'][i%4]}`;el.appendChild(s);setTimeout(()=>s.remove(),800)}}

function initMotion(){
  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.09});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
    document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',`${-y*9}deg`);card.style.setProperty('--ry',`${x*11}deg`);card.style.setProperty('--mx',`${x*100+50}%`);card.style.setProperty('--my',`${y*100+50}%`)});card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')})});
    document.querySelectorAll('.magnetic').forEach(btn=>{btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});btn.addEventListener('pointerleave',()=>btn.style.transform='')});
  }
}
function initShell(){document.querySelectorAll('[data-site-header]').forEach(x=>x.innerHTML=siteHeader(x.dataset.siteHeader));document.querySelectorAll('[data-site-footer]').forEach(x=>x.innerHTML=siteFooter());document.body.insertAdjacentHTML('beforeend',cartDrawer());updateBadges();renderCartDrawer();document.querySelector('#globalSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')goSearch()});initMotion();initFloatingButtons()}
function initFloatingButtons(){
  // WhatsApp floating button
  const waBtn = document.createElement('a');
  waBtn.href = 'https://wa.me/919999999999?text=Hi%20PlayJoy!%20I%27m%20interested%20in%20your%20toys.';
  waBtn.target = '_blank';
  waBtn.rel = 'noopener noreferrer';
  waBtn.className = 'fab-whatsapp';
  waBtn.setAttribute('aria-label','Chat on WhatsApp');
  waBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg><span class="wa-tooltip">Chat with us!</span>`;
  document.body.appendChild(waBtn);

  // Back-to-top button
  const topBtn = document.createElement('button');
  topBtn.className = 'fab-top';
  topBtn.setAttribute('aria-label','Scroll to top');
  topBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
  topBtn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
  document.body.appendChild(topBtn);

  // Show/hide back-to-top on scroll
  let ticking = false;
  window.addEventListener('scroll',()=>{
    if(!ticking){window.requestAnimationFrame(()=>{topBtn.classList.toggle('visible',window.scrollY>400);ticking=false});ticking=true}
  });
}
document.addEventListener('DOMContentLoaded',initShell);
