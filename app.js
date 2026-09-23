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
function updateBadges(){
  const count = cartCount();
  document.querySelectorAll('[data-cart-count], #cart-counter').forEach(el => el.textContent = count);
}

function siteHeader(active=''){
  return `
  <!-- TOP ANNOUNCEMENT TICKER BAR -->
  <div class="announcement-bar" data-purpose="top-announcement-bar">
    <div class="announcement-container">
      <div class="announcement-left">
        <span>India's Trusted Toy Manufacturer</span>
        <span class="announcement-sep">|</span>
        <span>Pan India Delivery</span>
        <span class="announcement-sep">|</span>
        <span>B2B &amp; B2C Both</span>
        <span class="announcement-sep">|</span>
        <span class="announcement-highlight">Safe, Non-Toxic, Durable</span>
      </div>
      <div class="announcement-right">
        <a class="announcement-link" href="get_a_sample.html" onclick="if(window.openSampleModal){event.preventDefault();openSampleModal()}">Become a Distributor</a>
        <span class="announcement-sep">|</span>
        <a class="announcement-link" href="contact.html#faq">Track Order</a>
        <span class="announcement-sep">|</span>
        <a class="announcement-link" href="contact.html">Help</a>
      </div>
    </div>
  </div>

  <!-- MAIN HEADER (ROW 1 + ROW 2) -->
  <header class="main-header" id="siteMainHeader">
    <div class="header-main-row">
      <!-- Mobile Menu Toggle Button -->
      <button class="mobile-nav-toggle" aria-label="Toggle navigation" onclick="document.querySelector('.category-nav').classList.toggle('mobile-open')">
        <span></span><span></span><span></span>
      </button>

      <!-- Brand Logo -->
      <a class="brand-logo-wrap" href="index.html" aria-label="PlayJoy Home">
        <div class="brand-logo-text">
          <span class="logo-p">P</span><span class="logo-l">l</span><span class="logo-a">a</span><span class="logo-y">y</span><span class="logo-j">J</span><span class="logo-o">o</span><span class="logo-y2">y</span>
        </div>
        <span class="brand-tagline">Small Toys, Big Smiles</span>
      </a>

      <!-- Center Search Bar -->
      <div class="header-search-wrap">
        <form class="header-search-form" onsubmit="event.preventDefault();goSearch();">
          <input class="header-search-input" id="globalSearch" type="text" placeholder="Search for toys, games, ride-ons and more..." aria-label="Search toys">
          <button class="header-search-btn" type="submit" aria-label="Submit search">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </button>
        </form>
      </div>

      <!-- Right Header Actions -->
      <div class="header-actions-wrap">
        <!-- Account / Login -->
        <a class="header-action-item" href="account.html">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span class="action-label">Login / Register</span>
        </a>

        <!-- Wishlist -->
        <a class="header-action-item" href="shop.html?wishlist=1">
          <div class="header-icon-badge-wrap">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
          <span class="action-label">Wishlist</span>
        </a>

        <!-- Cart -->
        <button class="header-action-item cart-action-btn" onclick="openCart()" aria-label="Open cart">
          <div class="header-icon-badge-wrap">
            <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span class="header-count-badge cart-badge" data-cart-count id="cart-counter">0</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Category Secondary Navbar (Row 2) -->
    <nav class="category-nav" aria-label="Category Navigation">
      <div class="category-nav-container">
        <!-- All Categories Dropdown -->
        <div class="cat-nav-item has-dropdown">
          <a class="cat-nav-link" href="shop.html">
            <span>All Categories</span>
            <svg class="cat-caret" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="cat-dropdown-menu">
            <a href="shop.html?category=Ride%20Ons">🚗 Ride On Toys</a>
            <a href="shop.html?category=Educational">🧩 Educational &amp; STEM</a>
            <a href="shop.html?category=Soft%20Toys">🧸 Soft &amp; Plush Friends</a>
            <a href="shop.html?category=Remote%20Control">⚡ Remote Control Toys</a>
            <a href="shop.html?category=Action%20Figures">🦸 Action Figures</a>
            <a href="shop.html?category=Vehicle%20Toys">🚛 Construction &amp; Vehicles</a>
            <a href="shop.html?category=Pretend%20Play">🍳 Pretend Play Sets</a>
          </div>
        </div>

        <!-- By Age Dropdown -->
        <div class="cat-nav-item has-dropdown">
          <a class="cat-nav-link" href="shop.html">
            <span>By Age</span>
            <svg class="cat-caret" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="cat-dropdown-menu">
            <a href="shop.html?age=0-12m">👶 0 – 12 Months</a>
            <a href="shop.html?age=1-3y">🧒 1 – 3 Years</a>
            <a href="shop.html?age=3-5y">👦 3 – 5 Years</a>
            <a href="shop.html?age=6plus">🎒 6+ Years</a>
          </div>
        </div>

        <a class="cat-nav-link" href="shop.html?filter=brands">Brands</a>
        <a class="cat-nav-link" href="shop.html?filter=new">New Arrivals</a>
        <a class="cat-nav-link cat-nav-highlight ${active==='bestsellers'?'active':''}" href="shop.html?sort=rating">Best Sellers</a>
        <a class="cat-nav-link" href="shop.html?category=Ride%20Ons">Ride Ons</a>
        <a class="cat-nav-link" href="shop.html?category=Outdoor">Outdoor Toys</a>
        <a class="cat-nav-link" href="shop.html?category=Educational">Educational Toys</a>

        <a class="cat-nav-link cat-nav-b2b" href="get_a_sample.html" onclick="if(window.openSampleModal){event.preventDefault();openSampleModal()}">
          <span>Bulk Enquiry</span>
        </a>
      </div>
    </nav>
  </header>`;
}

function siteFooter(){
  return `<section class="promise"><div class="container promise-grid"><div><span>01</span><b>Child-safe always</b><small>BIS compliant materials</small></div><div><span>02</span><b>Made for real play</b><small>Durability tested</small></div><div><span>03</span><b>Delivery, India-wide</b><small>Tracked to your door</small></div><div><span>04</span><b>Easy, human help</b><small>We are here for you</small></div></div></section>
  <footer class="footer"><div class="footer-orb orb-one"></div><div class="footer-orb orb-two"></div><div class="container footer-top"><div class="footer-intro"><a class="logo light" href="index.html"><b class="l1">P</b><b class="l2">l</b><b class="l3">a</b><b class="l4">y</b><b class="l5">J</b><b class="l6">o</b><b class="l7">y</b><small>Small toys. Big smiles.</small></a><h2>Let’s make<br>play wonderful.</h2><p>Original toys, thoughtful design and a little everyday magic.</p></div><div><h4>Discover</h4><a href="shop.html">All toys</a><a href="shop.html?sort=rating">Best sellers</a><a href="shop.html?category=Educational">Educational</a><a href="shop.html?category=Ride%20Ons">Ride ons</a></div><div><h4>PlayJoy</h4><a href="about.html">Our story</a><a href="contact.html">Contact us</a><a href="contact.html#faq">Help & FAQs</a><a href="account.html">My account</a></div><div><h4>For business</h4><a href="get_a_sample.html" onclick="if(window.openSampleModal){event.preventDefault();openSampleModal()}">Get a sample</a><a href="get_a_sample.html" onclick="if(window.openSampleModal){event.preventDefault();openSampleModal()}">Bulk enquiry</a><a href="get_a_sample.html" onclick="if(window.openSampleModal){event.preventDefault();openSampleModal()}">Become a distributor</a><div class="newsletter"><input placeholder="Email for happy news"><button aria-label="Subscribe">${icons.arrow}</button></div></div></div><div class="container footer-bottom"><span>© 2026 PlayJoy. Designed for brighter tomorrows.</span><span>Instagram · YouTube · LinkedIn</span></div></footer>`;
}

function cartDrawer(){return `<div class="drawer-backdrop" onclick="closeCart()"></div><aside class="cart-drawer" aria-label="Shopping cart"><div class="drawer-head"><div><small>YOUR JOY BAG</small><h2>Cart <span data-cart-count>0</span></h2></div><button onclick="closeCart()">${icons.close}</button></div><div class="drawer-items" id="drawerItems"></div><div class="drawer-foot"><div class="drawer-total"><span>Subtotal</span><b id="drawerTotal">${money(0)}</b></div><small>Taxes included. Shipping calculated at checkout.</small><a class="btn btn-primary btn-block" href="checkout.html">Checkout securely ${icons.arrow}</a><a class="drawer-view" href="cart.html">View full cart</a></div></aside>`}
function renderCartDrawer(){const root=document.querySelector('#drawerItems');if(!root)return;const entries=Object.entries(getCart());root.innerHTML=entries.length?entries.map(([id,q])=>{const p=PRODUCTS.find(x=>x.id===id);if(!p)return'';return `<div class="drawer-item"><a href="product_details.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a><div><small>${p.category}</small><h3>${p.name}</h3><b>${money(p.price)}</b><div class="mini-qty"><button onclick="changeCart('${id}',-1)">−</button><span>${q}</span><button onclick="changeCart('${id}',1)">+</button></div></div><button class="remove-x" onclick="removeCart('${id}')">${icons.close}</button></div>`}).join(''):`<div class="drawer-empty"><div class="empty-ball">◯</div><h3>Your joy bag is empty</h3><p>There is always room for a little more wonder.</p><a class="btn btn-dark" href="shop.html">Explore toys</a></div>`;document.querySelector('#drawerTotal').textContent=money(cartTotal())}
function openCart(){document.body.classList.add('cart-open');renderCartDrawer()}
function closeCart(){document.body.classList.remove('cart-open')}
function toggleWish(btn){btn.classList.toggle('active');toast(btn.classList.contains('active')?'Saved to your wishlist':'Removed from wishlist')}
function goSearch(){const q=document.querySelector('#globalSearch')?.value.trim();location.href='shop.html'+(q?'?q='+encodeURIComponent(q):'')}
function toast(message){let t=document.querySelector('.toast');if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}t.innerHTML=`<b>✓</b><span>${message}</span>`;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}
function burst(el){if(!el)return;for(let i=0;i<7;i++){const s=document.createElement('i');s.className='spark';s.style.cssText=`--x:${(Math.random()-.5)*90}px;--y:${-20-Math.random()*60}px;--c:${['#ff3974','#ffc62f','#3aa7ff','#50c78d'][i%4]}`;el.appendChild(s);setTimeout(()=>s.remove(),800)}}

/* ============================================================
   GLOBAL B2B SAMPLE MODAL (MATCHING USER IMAGES 1 & 2)
   ============================================================ */
function sampleModalHTML() {
  return `
  <div class="b2b-modal-backdrop" id="globalSampleModalBackdrop" onclick="if(event.target===this)closeSampleModal()">
    <div class="b2b-modal-card" id="modalSampleCard">
      <!-- LEFT SIDEBAR -->
      <aside class="b2b-sidebar" id="modalSidebar">
        <!-- Step 1 Sidebar Content (Matching Image 1) -->
        <div class="b2b-sb-step1" id="mSidebarStep1">
          <div>
            <div class="b2b-sb-box-art">
              <img src="assets/images/modal/sample-premium-v2.png" alt="PlayJoy Toy Box">
            </div>
            <h2 class="b2b-sb-heading">Partner with Us</h2>
            <p class="b2b-sb-sub">Quality Toys for a Brighter Tomorrow</p>
            <ul class="b2b-sb-checklist">
              <li>
                <span class="b2b-sb-check-icon"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span>
                <span>Trusted by Wholesalers &amp; Distributors</span>
              </li>
              <li>
                <span class="b2b-sb-check-icon"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span>
                <span>Wide Range of Products</span>
              </li>
              <li>
                <span class="b2b-sb-check-icon"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span>
                <span>Competitive Pricing</span>
              </li>
              <li>
                <span class="b2b-sb-check-icon"><svg viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg></span>
                <span>Pan India &amp; International Shipping</span>
              </li>
            </ul>
          </div>
          <div class="b2b-sb-bubble">
            “ Let's create smiles together! ” 💕
          </div>
        </div>

        <!-- Step 2 Sidebar Content (Matching Image 2) -->
        <div class="b2b-sb-step2" id="mSidebarStep2">
          <div>
            <div class="b2b-sb-brand-row">
              <span class="b2b-sb-logo-txt"><b class="c1">Play</b><b class="c2">Joy</b></span>
              <span class="b2b-sb-tag">B2B Partner</span>
            </div>
            <p class="b2b-sb-tagline">Toys for a Brighter Tomorrow</p>
            <h2 class="b2b-sb-title2">Partner<br>with a Trusted<br>Toy Manufacturer</h2>
            <p class="b2b-sb-sub2">High-quality toys. Better margins.<br>Stronger partnerships.</p>
            <div class="b2b-sb-feature-list">
              <div class="b2b-sb-feature-item">
                <span class="b2b-sb-feat-icon pink"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20"/><path d="M6 20V10l6 4V4l6 4v12"/></svg></span>
                <span>Direct from Manufacturer</span>
              </div>
              <div class="b2b-sb-feature-item">
                <span class="b2b-sb-feat-icon teal"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/><circle cx="7" cy="7" r="2"/></svg></span>
                <span>Competitive B2B Pricing</span>
              </div>
              <div class="b2b-sb-feature-item">
                <span class="b2b-sb-feat-icon yellow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span>
                <span>Wide Product Range</span>
              </div>
              <div class="b2b-sb-feature-item">
                <span class="b2b-sb-feat-icon purple"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13" rx="1"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></span>
                <span>Pan India &amp; International Supply</span>
              </div>
              <div class="b2b-sb-feature-item">
                <span class="b2b-sb-feat-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg></span>
                <span>Dedicated B2B Support</span>
              </div>
            </div>
          </div>
          <div class="b2b-sb-bottom-art">
            <div class="b2b-sb-bottom-toys">
              <img src="assets/images/modal/sample-premium-v2.png" alt="PlayJoy Toys">
            </div>
            <div class="b2b-sb-slogan">
              Great Toys<br>Build Greater<br>Relationships <span style="color:#ef4444">♡</span>
            </div>
          </div>
        </div>
      </aside>

      <!-- RIGHT CONTENT AREA -->
      <section class="b2b-content-wrap">
        <!-- Header -->
        <div class="b2b-header-bar">
          <div class="b2b-header-left">
            <div class="b2b-box-icon" id="mBoxIconStep2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <div class="b2b-header-text">
              <h1>Get a Sample</h1>
              <p id="mHeaderSub">Tell us a few details and our B2B team will get in touch with you shortly.</p>
            </div>
          </div>
          <div class="b2b-header-right">
            <button type="button" class="b2b-close-btn" onclick="closeSampleModal()" title="Close"><svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
            <div class="b2b-grow-slogan" id="mGrowSlogan">Let's Grow Together</div>
          </div>
        </div>

        <!-- Stepper -->
        <div class="b2b-stepper-wrap">
          <div class="b2b-stepper">
            <div class="b2b-stepper-line"></div>
            <div class="b2b-stepper-line-fill" id="mStepperLineFill"></div>

            <div class="b2b-step-node" onclick="modalGoToStep(1)">
              <div class="b2b-step-badge active" id="mBadgeStep1">1</div>
              <span class="b2b-step-label active" id="mLabelStep1">Your Details</span>
            </div>

            <div class="b2b-step-node" onclick="modalGoToStep(2)">
              <div class="b2b-step-badge" id="mBadgeStep2">2</div>
              <span class="b2b-step-label" id="mLabelStep2">Business &amp; Requirement</span>
            </div>
          </div>
        </div>

        <!-- Scrollable Form Container -->
        <div class="b2b-form-scroll">
          <form id="modalB2BForm" novalidate onsubmit="event.preventDefault()">
            <!-- STEP 1: CONTACT DETAILS -->
            <div id="mStep1Container">
              <h2 class="b2b-section-title">Your Contact Details</h2>
              <p class="b2b-section-desc">These details will help us get in touch with you.</p>

              <div class="b2b-form-grid">
                <div class="b2b-input-group">
                  <label class="b2b-label" for="mFullName">Full Name <span class="req">*</span></label>
                  <input class="b2b-input" id="mFullName" name="fullName" type="text" placeholder="Enter your full name" required>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mEmailAddress">Email Address <span class="req">*</span></label>
                  <input class="b2b-input" id="mEmailAddress" name="emailAddress" type="email" placeholder="Enter your email address" required>
                </div>

                <div class="b2b-input-group b2b-col-full">
                  <label class="b2b-label" for="mPhoneNumber">Mobile Number <span class="req">*</span></label>
                  <div class="b2b-phone-row">
                    <select class="b2b-select b2b-country-select" id="mCountryCode" name="countryCode">
                      <option value="+91" selected>+91 ▾</option>
                      <option value="+1">+1 (USA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (UAE)</option>
                    </select>
                    <input class="b2b-input b2b-phone-input" id="mPhoneNumber" name="phoneNumber" type="tel" inputmode="numeric" placeholder="Enter your mobile number" required>
                  </div>
                  <span class="b2b-input-hint">We'll send sample dispatch tracking updates to this WhatsApp/Phone number.</span>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mCityName">City <span class="req">*</span></label>
                  <input class="b2b-input" id="mCityName" name="cityName" type="text" placeholder="Enter your city" required>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mStateSelect">State <span class="req">*</span></label>
                  <select class="b2b-select" id="mStateSelect" name="stateSelect" required>
                    <option value="" disabled selected>Select state</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div class="b2b-privacy-box">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <span>Your contact information is confidential and will strictly be used for sample coordination.</span>
              </div>
            </div>

            <!-- STEP 2: BUSINESS & REQUIREMENT DETAILS -->
            <div id="mStep2Container" style="display:none;">
              <h2 class="b2b-section-title">Business &amp; Requirement Details</h2>
              <p class="b2b-section-desc">Help us understand your business and requirements so we can assist you better.</p>

              <div class="b2b-form-grid">
                <div class="b2b-input-group">
                  <label class="b2b-label" for="mBusinessName">Business / Store Name <span class="req">*</span></label>
                  <input class="b2b-input" id="mBusinessName" name="businessName" type="text" placeholder="Enter business name" required>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mWebsiteLink">Website / Instagram / Marketplace Link (if any)</label>
                  <input class="b2b-input" id="mWebsiteLink" name="websiteLink" type="url" placeholder="https://">
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mBusinessType">Business Type <span class="req">*</span></label>
                  <select class="b2b-select" id="mBusinessType" name="businessType" required>
                    <option value="" disabled selected>Select business type</option>
                    <option value="Toy Retailer / Toy Store">Toy Retailer / Toy Store</option>
                    <option value="Wholesaler / Stockist">Wholesaler / Stockist</option>
                    <option value="E-commerce Brand / Marketplace Seller">E-commerce Brand / Marketplace Seller</option>
                    <option value="Preschool / School / Educational Chain">Preschool / School / Educational Chain</option>
                    <option value="Corporate Gifting / Event Planner">Corporate Gifting / Event Planner</option>
                    <option value="Distributor / Super Stockist">Distributor / Super Stockist</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mProductInterested">Products Interested In <span class="req">*</span></label>
                  <input class="b2b-input" id="mProductInterested" name="productInterested" type="text" placeholder="e.g. Teddy Bear (Soft Toy), Ride Ons..." value="Teddy Bear (Soft Toy)" required>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mGstin">GSTIN (if any)</label>
                  <input class="b2b-input" id="mGstin" name="gstin" type="text" placeholder="Enter GSTIN" style="text-transform:uppercase">
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mExpectedQuantity">Expected Monthly Purchase Quantity <span class="req">*</span></label>
                  <select class="b2b-select" id="mExpectedQuantity" name="expectedQuantity" required>
                    <option value="" disabled selected>Select quantity range</option>
                    <option value="50 - 200 units / month">50 - 200 units / month</option>
                    <option value="200 - 500 units / month">200 - 500 units / month</option>
                    <option value="500 - 2,000 units / month">500 - 2,000 units / month</option>
                    <option value="2,000+ units / month (Master Bulk)">2,000+ units / month (Master Bulk)</option>
                  </select>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mBusinessAddress">Business Address <span class="req">*</span></label>
                  <textarea class="b2b-textarea" id="mBusinessAddress" name="businessAddress" rows="3" placeholder="Enter your complete business address" required></textarea>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label" for="mPurchasePurpose">Purchase Purpose <span class="req">*</span></label>
                  <select class="b2b-select" id="mPurchasePurpose" name="purchasePurpose" required>
                    <option value="" disabled selected>Select purpose</option>
                    <option value="Reselling in Retail Store">Reselling in Retail Store</option>
                    <option value="Online Marketplace Selling (Amazon, Flipkart, etc.)">Online Marketplace Selling (Amazon, Flipkart, etc.)</option>
                    <option value="Corporate Gifting / Client Merchandise">Corporate Gifting / Client Merchandise</option>
                    <option value="Institutional / Daycare Use">Institutional / Daycare Use</option>
                    <option value="Wholesale Distribution">Wholesale Distribution</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label">Upload Business Card (if any)</label>
                  <label class="b2b-upload-box" id="mUploadDropzone">
                    <input type="file" id="mBusinessCardInput" name="businessCard" accept=".pdf,.jpg,.jpeg,.png" hidden>
                    <div class="b2b-upload-icon-circle">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    </div>
                    <span class="b2b-upload-main-txt" id="mUploadStatusText">Click to upload or drag and drop</span>
                    <span class="b2b-upload-sub-txt">PDF, JPG, PNG (Max 5 MB)</span>
                  </label>
                </div>

                <div class="b2b-input-group">
                  <label class="b2b-label">Areas You Sell In <span class="req">*</span></label>
                  <div class="b2b-areas-grid">
                    <label class="b2b-check-pill">
                      <input type="checkbox" name="mSalesArea" value="Local (City)" checked>
                      <span>Local (City)</span>
                    </label>
                    <label class="b2b-check-pill">
                      <input type="checkbox" name="mSalesArea" value="State">
                      <span>State</span>
                    </label>
                    <label class="b2b-check-pill">
                      <input type="checkbox" name="mSalesArea" value="Pan India">
                      <span>Pan India</span>
                    </label>
                    <label class="b2b-check-pill">
                      <input type="checkbox" name="mSalesArea" value="Export / International">
                      <span>Export / International</span>
                    </label>
                  </div>
                </div>

                <div class="b2b-input-group b2b-col-full">
                  <label class="b2b-label" for="mAdditionalMessage">Additional Message (if any)</label>
                  <textarea class="b2b-textarea" id="mAdditionalMessage" name="additionalMessage" rows="3" placeholder="Tell us about your specific requirement..."></textarea>
                </div>
              </div>
            </div>

            <!-- STEP 3: SUCCESS STATE -->
            <div class="b2b-success-container" id="mStepSuccessContainer">
              <div class="b2b-success-icon">✓</div>
              <h2 class="b2b-success-title">Sample Request Submitted!</h2>
              <p class="b2b-success-sub">Thank you for partnering with <strong style="color:#2563eb">PlayJoy</strong>. We have generated your sample tracking reference:</p>
              <div class="b2b-req-badge">REQUEST ID: <span id="mSampleRequestId">PJ-SMP-88392</span></div>
              <p class="b2b-success-sub">Our B2B Key Account Specialist will contact you within <strong>1–2 business days</strong> with sample shipping details and wholesale pricing lists.</p>
              <div style="margin-top:20px">
                <button type="button" class="btn btn-primary" onclick="closeSampleModal()">Close &amp; Continue Browsing →</button>
              </div>
            </div>
          </form>
        </div>

        <!-- Actions Bar -->
        <div class="b2b-action-bar" id="mB2BActionBar">
          <div class="b2b-action-left">
            <button type="button" class="b2b-btn-back" id="mBtnBack" onclick="modalGoToStep(1)">
              <svg viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span>Back</span>
            </button>
            <span class="b2b-turnaround-text">
              <svg viewBox="0 0 24 24" style="width:13px;height:13px;display:inline-block;vertical-align:middle;margin-right:3px;stroke:#2563eb"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Our B2B team will contact you within 1–2 business days.
            </span>
          </div>

          <div>
            <button type="button" class="b2b-btn-submit" id="mBtnNextStep" onclick="modalValidateAndGoToStep2()">
              <span>Next: Business &amp; Requirement</span>
              <svg viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>

            <button type="button" class="b2b-btn-submit" id="mBtnSubmitForm" style="display:none;" onclick="modalSubmitSampleRequest()">
              <span>Submit Request</span>
              <svg viewBox="0 0 24 24" style="width:14px;height:14px"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>`;
}

let modalStep = 1;

window.openSampleModal = function(productName = '') {
  let modal = document.getElementById('globalSampleModalBackdrop');
  if (!modal) {
    document.body.insertAdjacentHTML('beforeend', sampleModalHTML());
    modal = document.getElementById('globalSampleModalBackdrop');
    initModalEventListeners();
  }
  if (productName) {
    const pInput = document.getElementById('mProductInterested');
    if (pInput) pInput.value = productName;
  }
  modalGoToStep(1);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeSampleModal = function() {
  const modal = document.getElementById('globalSampleModalBackdrop');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
};

function modalGoToStep(step) {
  if (step === 2 && modalStep === 1) {
    if (!modalValidateStep1()) return;
  }
  modalStep = step;

  const step1Cont = document.getElementById('mStep1Container');
  const step2Cont = document.getElementById('mStep2Container');
  const successCont = document.getElementById('mStepSuccessContainer');
  const sbStep1 = document.getElementById('mSidebarStep1');
  const sbStep2 = document.getElementById('mSidebarStep2');
  const boxIcon = document.getElementById('mBoxIconStep2');
  const growSlogan = document.getElementById('mGrowSlogan');
  const headerSub = document.getElementById('mHeaderSub');
  const lineFill = document.getElementById('mStepperLineFill');
  const badge1 = document.getElementById('mBadgeStep1');
  const label1 = document.getElementById('mLabelStep1');
  const badge2 = document.getElementById('mBadgeStep2');
  const label2 = document.getElementById('mLabelStep2');
  const btnBack = document.getElementById('mBtnBack');
  const btnNext = document.getElementById('mBtnNextStep');
  const btnSubmit = document.getElementById('mBtnSubmitForm');
  const actionBar = document.getElementById('mB2BActionBar');

  if (!step1Cont) return;

  successCont.classList.remove('active');
  actionBar.style.display = 'flex';

  if (step === 1) {
    step1Cont.style.display = 'block';
    step2Cont.style.display = 'none';

    sbStep1.style.display = 'flex';
    sbStep2.style.display = 'none';

    boxIcon.style.display = 'none';
    growSlogan.style.display = 'none';
    headerSub.textContent = 'Tell us a few details and our B2B team will get in touch with you shortly.';

    lineFill.classList.remove('step2');

    badge1.className = 'b2b-step-badge active';
    badge1.innerHTML = '1';
    label1.className = 'b2b-step-label active';

    badge2.className = 'b2b-step-badge';
    badge2.innerHTML = '2';
    label2.className = 'b2b-step-label';

    btnBack.style.display = 'none';
    btnNext.style.display = 'inline-flex';
    btnSubmit.style.display = 'none';
  } else if (step === 2) {
    step1Cont.style.display = 'none';
    step2Cont.style.display = 'block';

    sbStep1.style.display = 'none';
    sbStep2.style.display = 'flex';

    boxIcon.style.display = 'grid';
    growSlogan.style.display = 'block';
    headerSub.textContent = 'Partner with us and experience our quality. Share your business details and our B2B team will get in touch with you shortly.';

    lineFill.classList.add('step2');

    badge1.className = 'b2b-step-badge done';
    badge1.innerHTML = '✓';
    label1.className = 'b2b-step-label';

    badge2.className = 'b2b-step-badge active';
    badge2.innerHTML = '2';
    label2.className = 'b2b-step-label active';

    btnBack.style.display = 'inline-flex';
    btnNext.style.display = 'none';
    btnSubmit.style.display = 'inline-flex';
  }
}

function modalValidateStep1() {
  const name = document.getElementById('mFullName');
  const email = document.getElementById('mEmailAddress');
  const phone = document.getElementById('mPhoneNumber');
  const city = document.getElementById('mCityName');
  const state = document.getElementById('mStateSelect');

  let isValid = true;
  [name, email, phone, city, state].forEach(el => {
    if (!el || !el.value.trim() || (el.type === 'email' && !el.checkValidity())) {
      if (el) el.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      if (el) el.style.borderColor = '#cbd5e1';
    }
  });

  if (!isValid) {
    toast('Please fill all required contact details (*)');
  }
  return isValid;
}

function modalValidateAndGoToStep2() {
  if (modalValidateStep1()) {
    modalGoToStep(2);
  }
}

function modalValidateStep2() {
  const bName = document.getElementById('mBusinessName');
  const bType = document.getElementById('mBusinessType');
  const pInterest = document.getElementById('mProductInterested');
  const expQty = document.getElementById('mExpectedQuantity');
  const bAddr = document.getElementById('mBusinessAddress');
  const purpose = document.getElementById('mPurchasePurpose');

  let isValid = true;
  [bName, bType, pInterest, expQty, bAddr, purpose].forEach(el => {
    if (!el || !el.value.trim()) {
      if (el) el.style.borderColor = '#ef4444';
      isValid = false;
    } else {
      if (el) el.style.borderColor = '#cbd5e1';
    }
  });

  const checkedAreas = document.querySelectorAll('input[name="mSalesArea"]:checked');
  if (checkedAreas.length === 0) {
    isValid = false;
    toast('Please select at least one sales area');
    return false;
  }

  if (!isValid) {
    toast('Please complete all required business details (*)');
  }
  return isValid;
}

function modalSubmitSampleRequest() {
  if (!modalValidateStep2()) return;

  const form = document.getElementById('modalB2BForm');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  data.salesAreas = Array.from(document.querySelectorAll('input[name="mSalesArea"]:checked')).map(el => el.value);

  const reqId = 'PJ-SMP-' + Math.floor(10000 + Math.random() * 90000);
  data.requestId = reqId;
  data.submittedAt = new Date().toISOString();

  // Save to localStorage
  const existing = JSON.parse(localStorage.getItem('playjoy-sample-requests') || '[]');
  existing.push(data);
  localStorage.setItem('playjoy-sample-requests', JSON.stringify(existing));

  // Show success screen
  document.getElementById('mStep1Container').style.display = 'none';
  document.getElementById('mStep2Container').style.display = 'none';
  document.getElementById('mB2BActionBar').style.display = 'none';
  document.getElementById('mSampleRequestId').textContent = reqId;
  document.getElementById('mStepSuccessContainer').classList.add('active');

  triggerConfetti();
}

function initModalEventListeners() {
  document.getElementById('mBusinessCardInput')?.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      document.getElementById('mUploadStatusText').textContent = '✓ ' + file.name;
      document.getElementById('mUploadStatusText').style.color = '#10b981';
    }
  });

  document.addEventListener('input', e => {
    if (e.target.matches('.b2b-input, .b2b-select, .b2b-textarea')) {
      e.target.style.borderColor = '#cbd5e1';
    }
  });
}

function triggerConfetti() {
  const colors = ['#ee1766', '#ffc736', '#2579e8', '#57ce9a', '#9333ea'];
  for (let i = 0; i < 50; i++) {
    const c = document.createElement('i');
    c.style.cssText = `position:fixed;z-index:99999;width:${6 + Math.random()*8}px;height:${6 + Math.random()*8}px;background:${colors[i%colors.length]};left:${25 + Math.random()*50}%;top:45%;border-radius:${i%2?'50%':'2px'};pointer-events:none;transition:transform ${1.2 + Math.random()}s cubic-bezier(.1,.8,.2,1),opacity 1.5s`;
    document.body.appendChild(c);
    requestAnimationFrame(() => {
      c.style.transform = `translate(${(Math.random() - 0.5) * 800}px, ${100 + Math.random() * 500}px) rotate(${Math.random() * 720}deg)`;
      c.style.opacity = '0';
    });
    setTimeout(() => c.remove(), 2200);
  }
}

function initMotion(){
  const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.09});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
    document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',`${-y*9}deg`);card.style.setProperty('--ry',`${x*11}deg`);card.style.setProperty('--mx',`${x*100+50}%`);card.style.setProperty('--my',`${y*100+50}%`)});card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')})});
    document.querySelectorAll('.magnetic').forEach(btn=>{btn.addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`});btn.addEventListener('pointerleave',()=>btn.style.transform='')});

    // Hero section award-level interactive parallax
    const heroSection = document.querySelector('.hero-section-v2');
    if (heroSection) {
      const doodle1 = document.getElementById('doodleBadge1');
      const doodle2 = document.getElementById('doodleBadge2');
      const photoCard = document.getElementById('heroPhotoCard');
      
      heroSection.addEventListener('pointermove', e => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        if (doodle1) doodle1.style.transform = `translate(${x * -22}px, ${y * -22}px) rotate(${-6 + x * 6}deg)`;
        if (doodle2) doodle2.style.transform = `translate(${x * 25}px, ${y * 25}px) rotate(${8 + y * 6}deg)`;
        if (photoCard) {
          photoCard.style.setProperty('--rx', `${-y * 10}deg`);
          photoCard.style.setProperty('--ry', `${x * 12}deg`);
        }
      });

      heroSection.addEventListener('pointerleave', () => {
        if (doodle1) doodle1.style.transform = '';
        if (doodle2) doodle2.style.transform = '';
        if (photoCard) {
          photoCard.style.setProperty('--rx', '0deg');
          photoCard.style.setProperty('--ry', '0deg');
        }
      });
    }
  }
}
function initShell(){
  document.querySelectorAll('[data-site-header]').forEach(x=>x.innerHTML=siteHeader(x.dataset.siteHeader));
  document.querySelectorAll('[data-site-footer]').forEach(x=>x.innerHTML=siteFooter());
  document.body.insertAdjacentHTML('beforeend',cartDrawer());
  if (!document.querySelector('.sample-page')) {
    document.body.insertAdjacentHTML('beforeend', sampleModalHTML());
    initModalEventListeners();
  }
  updateBadges();
  renderCartDrawer();
  document.querySelector('#globalSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')goSearch()});
  initMotion();
  initFloatingButtons();
}
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
