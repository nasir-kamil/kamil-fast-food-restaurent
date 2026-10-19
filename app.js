const pages=[["index","Home"],["menu","Menu"],["pizza","Pizza"],["burger-rolls","Burger & Rolls"],["noodles-momos","Noodles & Momos"],["special","Specials"],["drinks","Chilli & Drinks"],["order","Order"],["about","About"],["contact","Contact"]];
const cur=location.pathname.split('/').pop().replace('.html','')||'index';
let cart=JSON.parse(localStorage.getItem('kc')||'[]');
const save=()=>{localStorage.setItem('kc',JSON.stringify(cart));bar()};
function bar(){let b=document.getElementById('cartbar');if(!b)return;const n=cart.length;b.style.display=n?'block':'none';b.innerHTML=`🛒 ${n} item • ₹${cart.reduce((s,x)=>s+x.p,0)} — Order`}
function add(n,s,p){cart.push({n:n+(s?` (${s})`:''),p});save()}
function card(k,[n,h,f]){const lab=f?['Half','Full']:[''];const pr=f?[h,f]:[h];
return `<div class="card"><img src="images/${k}.jpg" alt="${n}" loading="lazy" onerror="this.outerHTML='<div class=img>${MENU[k].e}</div>'"><div class="in"><h3>${n}</h3><div class="price">${pr.map((x,i)=>`<span>${lab[i]} ₹${x}</span>`).join('')}</div><div class="add">${pr.map((x,i)=>`<button onclick="add('${n}','${lab[i]}',${x})">+ ${lab[i]||'Add'}</button>`).join('')}</div></div></div>`}
function section(k){return `<h2>${MENU[k].e} ${MENU[k].t}</h2><p style="margin-bottom:14px">${MENU[k].d}</p><div class="grid">${MENU[k].i.map(i=>card(k,i)).join('')}</div>`}
function layout(){
document.body.insertAdjacentHTML('afterbegin',`<div class="banner">🛵 Free Home Delivery • Min. Order ₹200 • 📞 7536071970</div><header><div class="nav"><a class="logo" href="index.html">KAMIL'S <span>Restaurant</span></a><button id="burger" aria-label="menu">☰</button><nav id="nav">${pages.map(p=>`<a href="${p[0]}.html" class="${p[0]==cur?'on':''}">${p[1]}</a>`).join('')}</nav></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><h3 style="color:#f5b700">KAMIL'S Restaurant</h3><p>${ADDR}</p><p>📞 <a href="tel:+917536071970">7536071970</a> • <a href="tel:+918958651415">8958651415</a></p><p><a href="https://wa.me/${PH}">WhatsApp</a> • <a href="https://wa.me/c/${PH}">WhatsApp Catalog</a> • <a href="https://instagram.com/kamilffoodresturent">Instagram</a></p><p style="margin-top:10px;font-size:.8rem">© ${new Date().getFullYear()} KAMIL'S Restaurant (Kamil Fast Food), Nahal, Ghaziabad</p></footer><a id="cartbar" href="order.html" style="display:none"></a>`);
document.getElementById('burger').onclick=()=>document.getElementById('nav').classList.toggle('open');bar();
const m=document.querySelector('main[data-cats]');if(m)m.innerHTML=`<div class="wrap">${m.dataset.cats.split(',').map(section).join('<br>')}</div>`}
function renderOrder(){const box=document.getElementById('cart');if(!box)return;
box.innerHTML=cart.length?cart.map((x,i)=>`<div class="row"><span>${x.n}</span><span>₹${x.p} <button class="btn" style="padding:2px 10px" onclick="cart.splice(${i},1);save();renderOrder()">✕</button></span></div>`).join('')+`<h3 style="margin-top:12px">Total: ₹${cart.reduce((s,x)=>s+x.p,0)}</h3>`:'<p>Cart empty. Menu se items add karein.</p>'}
function sendWA(){const t=cart.reduce((s,x)=>s+x.p,0);if(!cart.length)return alert('Cart empty hai');
const nm=document.getElementById('nm').value,ad=document.getElementById('ad').value;
if(!nm||!ad)return alert('Naam aur address likhein');
const msg=`*New Order - KAMIL'S Restaurant*%0A`+cart.map(x=>`• ${encodeURIComponent(x.n)} - ₹${x.p}`).join('%0A')+`%0A*Total: ₹${t}*%0AName: ${encodeURIComponent(nm)}%0AAddress: ${encodeURIComponent(ad)}`;
window.open(`https://wa.me/${PH}?text=${msg}`,'_blank')}
document.addEventListener('DOMContentLoaded',()=>{layout();renderOrder()});
