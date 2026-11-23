/* ===== CONFIG: Supabase (optional). Leave empty to run in demo mode (localStorage). ===== */
const SUPABASE_URL = "", SUPABASE_KEY = "";
const sb = (SUPABASE_URL && window.supabase) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

/* ===== DATA (edit prices/packages here) ===== */
const ID=["Player ID"], FB=["Konami Mail","Password","Whatsapp"], TK=["Username","Password","Whatsapp","Email or Number"];
const gen=(n,arr)=>arr.map(([a,b])=>[a+" "+n,b,1]);
const P=[
{id:"efootball-players-pack",n:"E-Football Players Pack",c:"trend",tags:["Safety Guaranteed","10 AM-12 PM"],f:FB,pk:[["Hamza Chaudhury Pack",120,1],["Luis Suárez Pack (Android)",130,1],["Luis Suárez Pack (iOS)",150,1],["Iker Casillas GK Pack (Android)",360,1],["Iker Casillas GK Pack (iOS)",400,1],["Luis + Iker (Android)",490,1],["Luis + Iker (iOS)",550,1]]},
{id:"pubg-mobile-topup",n:"PUBG Mobile Topup",c:"trend",tags:["Instant","Global"],f:ID,pk:gen("UC",[[60,90],[325,430],[660,1300],[1800,3400],[3850,6800]])},
{id:"tiktok-coin",n:"TikTok Coin",c:"trend",iap:1,tags:["Safe & Secure","5-60 Minutes"],f:TK,pk:[["70 Coin",185,1],["100 Coin",220,1],["140 Coin",260,1],["200 Coin",370,1],["350 Coin",650,1],["700 Coin",1200,1],["1000 Coin",1700,1],["2000 Coin",3400,1],["3500 Coin",6475,1],["7000 Coin",12950,1]]},
{id:"efootball-coin-event",n:"E-Football Coin Event",c:"trend",tags:["Instant"],f:FB,pk:gen("Coin",[[500,520],[1500,1190],[3000,2400]])},
{id:"pubg-prime-plus",n:"PUBG Prime Plus",c:"trend",tags:["5-30 Minutes","Global"],f:ID,pk:[["Prime (1 Month)",140,1],["Prime Plus (1 Month)",1250,1],["Prime (3 Months)",420,0],["Prime Plus (3 Months)",3660,0],["Prime (6 Months)",840,1],["Prime Plus (6 Months)",7320,1],["Prime (12 Months)",1680,1],["Prime Plus (12 Months)",14640,1]],inst:1},
{id:"apple-gift-card",n:"Apple Gift Card",c:"gift",tags:["Verified","Instant","US"],f:[],pk:[["$2 Gift Card",300,1],["$5 Gift Card",750,1],["$10 Gift Card",1500,1],["$15 Gift Card",1950,0],["$20 Gift Card",3000,1],["$25 Gift Card",3250,0],["$50 Gift Card",7500,1],["$100 Gift Card",15000,1]]},
{id:"pubg-mobile",n:"PUBG Mobile",c:"game",opt:3,tags:["Instant"],f:ID,pk:gen("UC",[[60,90],[325,430],[660,1300]])},
{id:"mobile-legends",n:"Mobile Legends",c:"game",tags:["Instant"],f:["User ID","Zone ID"],pk:gen("Diamonds",[[86,120],[172,240],[344,480]])},
{id:"free-fire-topup",n:"Free Fire Topup",c:"game",tags:["Instant"],f:ID,pk:gen("Diamonds",[[100,85],[310,260],[520,430]])},
{id:"valorant",n:"Valorant",c:"game",opt:1,tags:["Instant"],f:["Riot ID"],pk:gen("VP",[[475,500],[1000,1000]])},
{id:"blood-strike",n:"Blood Strike",c:"game",tags:["Instant"],f:ID,pk:gen("Gold",[[100,95],[300,280]])},
{id:"pubg-mobile-voucher",n:"PUBG Mobile Voucher",c:"gift",tags:["Instant"],f:[],pk:gen("UC",[[60,95],[325,440]])},
{id:"roblox-gift-cards",n:"Roblox Robux Gift Card",c:"gift",tags:["Instant"],f:[],pk:gen("Robux",[[400,560],[800,1100]])},
{id:"windows-retail-key",n:"Windows 10/11 Pro",c:"gift",tags:["Instant"],f:[],pk:[["Retail Key",650,1]]},
{id:"youtube-premium",n:"YouTube Premium",c:"sub",tags:["Verified"],f:["Email"],pk:[["1 Month",200,1],["3 Months",550,1]]},
{id:"netflix-subscription",n:"Netflix Subscription",c:"sub",tags:["Verified"],f:["Email"],pk:[["1 Month",400,1]]},
{id:"canva-pro",n:"Canva Pro",c:"sub",tags:["Verified"],f:["Email"],pk:[["1 Month",150,1],["1 Year",900,1]]},
{id:"capcut-pro",n:"CapCut Pro",c:"sub",tags:["Verified"],f:["Email"],pk:[["1 Month",300,1]]},
{id:"crunchyroll-subscription",n:"Crunchyroll Subscription",c:"sub",tags:["Verified"],f:["Email"],pk:[["1 Month",250,1]]},
{id:"spotify-premium",n:"Spotify Premium",c:"sub",tags:["Verified"],f:["Email"],pk:[["1 Month",180,1],["3 Months",500,1]]},
{id:"gemini-ai-pro",n:"Gemini AI Pro",c:"sub",tags:["Verified"],f:["Email"],pk:[["1 Month",400,1]]},
{id:"muse-ai-token",n:"Muse AI Token",c:"sub",tags:["Instant"],f:["Email"],pk:gen("Token",[[100,250],[500,1100]])},
{id:"e-football-coin",n:"E-Football Coin",c:"iap",opt:4,tags:["Instant"],f:FB,pk:gen("Coin",[[130,140],[550,520],[1100,1000]])},
{id:"call-of-duty",n:"Call of Duty",c:"iap",tags:["Instant"],f:ID,pk:gen("CP",[[80,100],[400,480]])},
{id:"telegram-premium",n:"Telegram Premium",c:"social",tags:["Verified"],f:["Username"],pk:[["3 Months",1500,1],["12 Months",4000,1]]},
{id:"telegram-star",n:"Telegram Star",c:"social",tags:["Instant"],f:["Username"],pk:gen("Stars",[[50,110],[100,210]])},
{id:"bigo-live",n:"Bigo Live",c:"social",tags:["Instant"],f:["Bigo ID"],pk:gen("Diamonds",[[100,150],[500,720]])}
];
const SECS=[["trend","Trending Now"],["game","Games"],["gift","Gift Cards"],["sub","Subscriptions"],["iap","In App Purchase"],["social","Social Media & Apps"]];

/* ===== STATE ===== */
const L=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},S=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
let user=L("ks_user",null),wallet=L("ks_wallet",0),orders=L("ks_orders",[]),promo=L("ks_promo",true),pin=L("ks_pin",String(10000+Math.floor(Math.random()*89999)));S("ks_pin",pin);
const $=s=>document.querySelector(s),app=$("#app"),tk=n=>"৳"+Number(n).toLocaleString("en-US");
const toast=m=>{const t=$("#toast");t.textContent=m;t.className="on";clearTimeout(toast.t);toast.t=setTimeout(()=>t.className="",2600)};
if(sb)sb.auth.getSession().then(({data})=>{if(data.session){user={email:data.session.user.email,name:data.session.user.email.split("@")[0]};S("ks_user",user);route()}});

/* ===== PIECES ===== */
const hdr=(back,title)=>back?`<div class="hdr"><div class="wrap"><a class="ib" href="${back}">←</a><b style="text-transform:uppercase">${title}</b></div></div>`:
`<div class="hdr"><div class="wrap"><a class="logo" href="#/"><b>ϟ</b>Nihal Store</a><button class="ib" onclick="document.querySelector('.sbar').style.display='block'">⌕</button>${user?`<a class="pill" href="#/wallet">▣ ${tk(wallet)}</a><a class="av" href="#/account">${user.name[0].toUpperCase()}</a>`:`<a class="pill" href="#/login">☺ লগইন</a>`}</div><div class="wrap sbar"><input placeholder="Search products..." oninput="doSearch(this.value)"></div></div>`;
const card=p=>`<a class="pc" href="#/p/${p.id}"><div class="im">${p.n.replace(/ /g,"<br>").slice(0,60)}${p.opt?`<i>${p.opt} options</i>`:""}</div><p>${p.n}</p></a>`;
const nav=r=>{const t=[["#/","Home","⌂"],["#/wallet","Wallet","▣"],["#/orders","Orders","🛍"],["#/codes","Codes","🎁"],["#/account","Account","☺"]];$("#nav").innerHTML=t.map(([h,n,i])=>`<a href="${h}" class="${h==="#"+r||(h==="#/"&&r==="/")?"on":""}"><span>${i}</span>${n}</a>`).join("")};
window.doSearch=q=>{q=q.toLowerCase();const g=$("#sx");if(!g)return;g.innerHTML=P.filter(p=>p.n.toLowerCase().includes(q)).map(card).join("")||"<p style='color:#8b93a3'>No results</p>";$("#secs").style.display=q?"none":"block";g.style.display=q?"grid":"none"};
const need=()=>{if(!user){toast("আগে লগইন করুন");location.hash="#/login";return false}return true};

/* ===== HERO SLIDESHOW (6-8 slides). Add img:"url" to use your own banner image ===== */
const SLIDES=[
{a:"24/7",as:"Automatic Delivery",b:"Instant<br>TOPUP",h:0},
{a:"PUBG<br>MOBILE",as:"UC Topup",b:"Best<br>PRICE",h:8},
{a:"E-FOOTBALL",as:"Coins & Players Pack",b:"Fast<br>DELIVERY",h:-8},
{a:"TIKTOK<br>COIN",as:"Safe & Secure",b:"5-60<br>MINUTES",h:12},
{a:"APPLE<br>GIFT CARD",as:"Verified • Instant",b:"$2 to<br>$100",h:-12},
{a:"SUBSCRIP-<br>TIONS",as:"Netflix • Spotify • YouTube",b:"Premium<br>ACCESS",h:5},
{a:"bKash",as:"Nagad • Rocket • Upay",b:"Secure<br>PAYMENTS",h:-5}
];
let slI=0,slT=null;
function slider(){return `<div class="slider" id="sl"><div class="trk">${SLIDES.map(x=>`<div class="sld" style="${x.img?`background-image:url(${x.img});background-size:cover`:`filter:hue-rotate(${x.h}deg)`}">${x.img?"":`<div>${x.a}<small>${x.as}</small></div><div>${x.b}</div>`}</div>`).join("")}</div><div class="dots">${SLIDES.map((_,i)=>`<button aria-label="Slide ${i+1}" onclick="goSl(${i})"></button>`).join("")}</div></div>`}
function goSl(i){const t=document.querySelector("#sl .trk");if(!t)return;slI=(i+SLIDES.length)%SLIDES.length;t.style.transform=`translateX(-${slI*100}%)`;document.querySelectorAll("#sl .dots button").forEach((d,k)=>d.className=k===slI?"on":"")}
function startSl(){clearInterval(slT);const el=document.querySelector("#sl");if(!el)return;goSl(0);const run=()=>{clearInterval(slT);slT=setInterval(()=>goSl(slI+1),3500)};run();
el.onmouseenter=()=>clearInterval(slT);el.onmouseleave=run;let x0=null;el.ontouchstart=e=>{x0=e.touches[0].clientX;clearInterval(slT)};el.ontouchend=e=>{if(x0!==null){const d=e.changedTouches[0].clientX-x0;if(Math.abs(d)>40)goSl(slI+(d<0?1:-1));x0=null}run()}}

/* ===== PAGES ===== */
const pages={
home(){const live=[["JA","jack son","PUBG MOBILE TOPUP","660 UC",1300,"ok"],["DU","Durjoy Sarker","E-FOOTBALL iOS","10000 Coin",10360,"pd"],["MD","Md Ferdaus Islam","TIKTOK COIN","200 Coin",370,"ok"],["SI","Siam Khan","E-FOOTBALL COIN EVENT","1500 Coin",1190,"ok"]];
return hdr()+`<div class="wrap">${slider()}
<div id="sx" class="grid" style="display:none"></div><div id="secs">${SECS.map(([k,t])=>`<h2 class="st">${t}</h2><div class="grid">${P.filter(p=>p.c===k).map(card).join("")}</div>`).join("")}</div>
<div class="card live"><h2 class="st" style="margin-top:0">Latest Orders</h2>${live.map(o=>`<div class="r"><div class="ini">${o[0]}</div><div class="m"><b>${o[1]}</b><span>${o[2]}</span><span>${o[3]}</span></div><div style="text-align:right"><b>${tk(o[4])}</b><br><span class="bd ${o[5]}">${o[5]==="ok"?"Completed":"Paid"}</span></div></div>`).join("")}</div>
<div class="card help"><h2 class="st" style="margin-top:0">Need Help?</h2><a href="https://wa.me/8801000000000"><div class="ib">☎</div><div><b>WhatsApp</b><span>24/7 Support</span></div></a><a href="https://t.me/"><div class="ib">➤</div><div><b>Telegram</b><span>Quick Response</span></div></a><a href="https://m.me/"><div class="ib">💬</div><div><b>Facebook</b><span>Messenger</span></div></a></div>
<h2 class="st">Why Top Up on Nihal Store?</h2><p style="text-align:center;color:#8b93a3;margin:-8px 0 24px">Thousands of gamers trust us every day for fast, safe, and affordable game top-ups.</p>
<div class="feat">${[["ϟ","Instant Auto Delivery","Your game credits are delivered directly to your account the moment payment is confirmed."],["▭","Convenient Payment Methods","Pay easily with bKash, Nagad, Rocket and more. Fast, secure, and available 24/7."],["⛨","100% Safe & Secure","Every transaction is fully encrypted and protected."],["%","Best Prices Guaranteed","The most competitive prices on game top-ups in Bangladesh."],["🎧","24/7 Support","Always ready to help via WhatsApp or Telegram."],["↻","Easy Process","Choose your package, pay and done. Takes less than a minute."]].map(f=>`<div><em>${f[0]}</em><b>${f[1]}</b><p>${f[2]}</p></div>`).join("")}</div></div>
<footer><div class="logo" style="justify-content:center;color:#fff"><b>ϟ</b>Nihal Store</div><p>Top Up & Play On</p><nav><a href="#/">About Us</a><a href="#/">Terms & Conditions</a><a href="#/">Privacy Policy</a><a href="#/">Refund Policy</a></nav><div class="pays"><i>bKash</i><i>Nagad</i><i>Rocket</i><i>Upay</i></div><p>Secure payments via KhPay</p><p style="margin-top:22px;font-size:14px">© 2026 Nihal Store. All rights reserved.</p></footer>`},

product(id){const p=P.find(x=>x.id===id);if(!p)return pages.home();const o={pkg:null,pay:"wallet"};window.__o=o;
window.pick=i=>{if(!p.pk[i][2])return;o.pkg=i;draw()};window.paySel=m=>{o.pay=m;draw()};
window.buy=()=>{if(!need())return;const f=[...document.querySelectorAll("[data-f]")],vals={};for(const x of f){if(!x.value.trim())return toast(x.dataset.f+" দিন");vals[x.dataset.f]=x.value}
const pk=p.pk[o.pkg];if(o.pay==="wallet"){if(wallet<pk[1])return toast("Wallet balance কম। Add Money করুন");wallet-=pk[1];S("ks_wallet",wallet)}else toast("KhPay (bKash/Nagad) gateway এখানে যুক্ত করুন");
orders.unshift({id:Date.now(),p:p.n,pk:pk[0],price:pk[1],st:"Active",d:new Date().toLocaleString()});S("ks_orders",orders);toast("অর্ডার সফল হয়েছে!");setTimeout(()=>location.hash="#/orders",900)};
function draw(){const pk=o.pkg!=null?p.pk[o.pkg]:null,tot=pk?pk[1]:0;let n=1;const s=t=>`<div class="step"><b>${n++}</b>${t}</div>`;
$("#pg").innerHTML=`<div class="pt"><div class="im">${p.n}</div><div><h1>${p.n}</h1><div class="tags">${p.tags.map(t=>`<span class="tg">${t}</span>`).join("")}</div></div></div>
${p.f.length?`<div class="card">${s("Account Info")}${p.f.map(f=>`<label>${f} <i>*</i></label><input class="in" data-f="${f}" ${/pass/i.test(f)?'type="password"':""} placeholder="Enter ${f}">`).join("")}${p.f.length===1&&/ID/.test(p.f[0])?`<button class="btn" onclick="toast('যাচাই করা হচ্ছে...')">✓ যাচাই করুন</button>`:""}</div>`:""}
<div class="card">${s("Select Package")}<div class="pk">${p.pk.map((k,i)=>`<div class="op ${o.pkg===i?"sel":""} ${k[2]?"":"off"}" onclick="pick(${i})"><h4>${k[0]}</h4><div class="p">${tk(k[1])}</div><small>${k[2]?"▣ In stock":"Out of Stock"}</small></div>`).join("")}</div></div>
<div class="card">${s("Payment Method")}<div class="pm"><div class="op ${o.pay==="wallet"?"sel":""}" onclick="paySel('wallet')"><em>▣</em><b>Wallet</b><br><small style="color:#8b93a3">${tk(wallet)}</small></div><div class="op ${o.pay==="instant"?"sel":""}" onclick="paySel('instant')"><em style="background:#f59e0b22">ϟ</em><b>Instant Pay</b><br><span class="bd pd">bKash</span> <span class="bd wt">Nagad</span></div></div></div>
<div class="card"><div class="row">Current Balance<b style="color:#fff">${tk(wallet)}</b></div><a class="lk" onclick="toast('Promo code এখনো যুক্ত হয়নি')">🏷 Have a promo code?</a><div class="row" style="border-top:1px solid var(--line);margin-top:14px">Subtotal<span>${tk(tot)}</span></div><div class="row t">Total<span>${tk(tot)}</span></div><button class="btn" ${pk?"":"disabled"} onclick="buy()">⛨ Buy Now</button></div>
<details class="card"><summary>ⓘ About this product</summary><p>${p.n} — instant and secure delivery to your account.</p></details><details class="card"><summary>▤ Rules & Conditions</summary><p>Please enter correct account information. Wrong information is not refundable. Delivery time may vary.</p></details>`}
setTimeout(draw);return hdr("#/",p.n)+`<div class="wrap" id="pg" style="max-width:760px"></div>`},

wallet(){if(!user)return need()||"";window.add=()=>{const v=+$("#amt").value;if(v<10)return toast("Minimum ৳10");if(!need())return;wallet+=v;S("ks_wallet",wallet);toast("DEMO: "+tk(v)+" যোগ হয়েছে (KhPay যুক্ত করুন)");route()};
return hdr("#/","Add Money")+`<div class="wrap" style="max-width:760px"><div class="card"><div style="display:flex;justify-content:space-between;color:#8b93a3">CURRENT BALANCE<span class="pill" style="height:36px;color:#fff;border-color:var(--line)">↺ History</span></div><h1 style="font-size:46px;margin-top:14px">▣ ${tk(wallet)}</h1></div>
<div class="card"><span style="color:#8b93a3">ENTER AMOUNT</span><input id="amt" type="number" class="in" style="height:64px;font-size:26px;margin-top:12px" placeholder="৳ 0"><p style="color:#8b93a3;margin-top:10px">Minimum ৳10</p><div class="amts">${[50,100,200,500,1000,2000].map(a=>`<button onclick="$('#amt').value=${a}">${tk(a)}</button>`).join("")}</div></div>
<div class="card"><span style="color:#8b93a3">▭ PAYMENT METHOD</span><div class="op sel" style="margin-top:14px"><b>KhPay</b><br><span class="tg">bKash</span> <span class="tg">Nagad</span> <span class="tg">Rocket</span></div></div><button class="btn" onclick="add()">▣ Add Money</button></div>`},

orders(){if(!user)return need()||"";const f=window.__f||"All";window.flt=x=>{window.__f=x;route()};const l=orders.filter(o=>f==="All"||(f==="Active"&&o.st==="Active")||(f==="Done"&&o.st==="Done")||(f==="Failed"&&o.st==="Failed"));
return hdr("#/","My Orders")+`<div class="wrap" style="max-width:760px"><div class="tabs">${["All","Active","Done","Failed"].map(x=>`<button class="${f===x?"on":""}" onclick="flt('${x}')">${x}</button>`).join("")}</div>${l.length?`<div class="card live">${l.map(o=>`<div class="r"><div class="m"><b>${o.p}</b><span>${o.pk}</span><span>${o.d}</span></div><div style="text-align:right"><b>${tk(o.price)}</b><br><span class="bd wt">${o.st}</span></div></div>`).join("")}</div>`:`<div class="empty"><em>🛍</em><h3>No orders found</h3><p>এখনো কোনো অর্ডার নেই</p><a class="btn" style="display:inline-grid;place-items:center" href="#/">Shop Now</a></div>`}</div>`},

codes(){if(!user)return need()||"";return hdr("#/","My Codes")+`<div class="wrap"><div class="empty"><em>🎁</em><h3>No codes yet</h3><p>কোনো কোড বা সাবস্ক্রিপশন নেই</p><p style="max-width:420px;margin:8px auto">Game top-ups are delivered directly to your account. Gift cards and subscriptions appear here.</p><a class="btn" style="display:inline-grid;place-items:center" href="#/">Browse Products</a></div></div>`},

account(){if(!user)return need()||"";window.save=()=>toast("Saved");window.tgl=()=>{promo=!promo;S("ks_promo",promo);route()};
window.out=async()=>{if(sb)await sb.auth.signOut();user=null;localStorage.removeItem("ks_user");location.hash="#/login"};
return hdr("#/","Account")+`<div class="wrap" style="max-width:760px"><div class="card pt"><div class="av" style="width:72px;height:72px;font-size:28px">${user.name[0].toUpperCase()}</div><div><h2>${user.name}</h2><span style="color:#8b93a3">${user.email}</span></div></div>
<div class="card"><span style="color:#8b93a3;font-size:13px">SUPPORT PIN</span><h2 style="letter-spacing:3px;margin-top:4px">#${pin}</h2></div>
<div class="card" style="display:flex;align-items:center;justify-content:space-between"><div><span style="color:#8b93a3;font-size:13px">WALLET BALANCE</span><h1>${tk(wallet)}</h1></div><a class="btn sm" style="display:grid;place-items:center" href="#/wallet">+ Add</a></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${[["#/orders","🛍 My Orders"],["#/codes","🔑 Subscriptions"],["#/codes","🎁 Gift Cards"],["#/wallet","▣ Add Money"],["#/wallet","◷ Transactions"]].map(a=>`<a class="acc" style="margin:0" href="${a[0]}">${a[1]}<span>›</span></a>`).join("")}</div>
<div class="card"><h3>Edit Profile</h3><label>✉ Email</label><input class="in" value="${user.email}" disabled><label>☎ Phone</label><div style="display:flex;gap:8px"><div class="in" style="width:80px;display:grid;place-items:center">+880</div><input class="in" placeholder="1712345678"></div><button class="btn" onclick="save()">Save Changes</button></div>
<div class="card"><h3>Email Preferences</h3><div style="display:flex;gap:14px;align-items:center;margin-top:16px"><div style="flex:1"><b>Receive promotional emails</b><p style="color:#8b93a3;font-size:14px">Sale announcements and new product launches. Order and delivery emails are always sent.</p></div><div class="sw ${promo?"":"off"}" onclick="tgl()"></div></div></div>
<button class="btn ol" onclick="out()">↪ Logout</button></div>`},

login(sign){window.go=async()=>{const e=$("#em").value.trim(),pw=$("#pw").value;if(!e||pw.length<6)return toast("সঠিক ইমেইল ও ন্যূনতম ৬ অক্ষরের পাসওয়ার্ড দিন");
if(sb){const r=sign?await sb.auth.signUp({email:e,password:pw}):await sb.auth.signInWithPassword({email:e,password:pw});if(r.error)return toast(r.error.message)}
user={email:e,name:e.split("@")[0]};S("ks_user",user);location.hash="#/"};
window.goog=async()=>{if(sb)await sb.auth.signInWithOAuth({provider:"google"});else{user={email:"demo@gmail.com",name:"demo"};S("ks_user",user);location.hash="#/"}};
return `<div class="wrap"><div class="card auth"><div class="logo" style="justify-content:center"><b>ϟ</b>Nihal Store</div><h1>${sign?"একাউন্ট তৈরি করুন":"স্বাগতম"}</h1><p class="sub">${sign?"নতুন একাউন্ট খুলুন":"আপনার একাউন্টে লগইন করুন"}</p><button class="g" onclick="goog()"><b style="color:#4285f4">G</b> Google দিয়ে লগইন করুন</button><div class="or">অথবা</div><label>ইমেইল</label><input id="em" class="in" type="email" placeholder="your@email.com"><label>পাসওয়ার্ড</label><input id="pw" class="in" type="password" placeholder="••••••••">${sign?"":`<p style="text-align:right;margin-top:12px"><a class="lk" onclick="toast('Reset link পাঠানো হবে (Supabase যুক্ত করুন)')">পাসওয়ার্ড ভুলে গেছেন?</a></p>`}<button class="btn" onclick="go()">${sign?"একাউন্ট তৈরি করুন":"লগইন করুন"}</button><p style="text-align:center;color:#8b93a3;margin-top:22px">${sign?"একাউন্ট আছে?":"একাউন্ট নেই?"} <a class="lk" href="#/${sign?"login":"signup"}">${sign?"লগইন করুন":"একাউন্ট তৈরি করুন"}</a></p></div></div>`}
};

/* ===== ROUTER ===== */
function route(){const r=location.hash.slice(1)||"/",[,a,b]=r.split("/");
app.innerHTML=a==="p"?pages.product(b):a==="login"?pages.login(0):a==="signup"?pages.login(1):a&&pages[a]?pages[a]():pages.home();
nav(r);clearInterval(slT);startSl();window.scrollTo(0,0)}
addEventListener("hashchange",route);route();