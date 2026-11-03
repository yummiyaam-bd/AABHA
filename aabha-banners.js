/* AABHA site banners: offer bar, slider, promo, popup.
   Use on the customer site:
   <div id="aabha-slider"></div>   (where the slider should appear)
   <div id="aabha-promo"></div>    (where promo banners should appear)
   <script src="aabha-banners.js" defer></script>
   Offer bar and popup need no placeholder. */
(function(){
var SB_URL="https://xjwuozdfuflfoqiuucik.supabase.co";
var SB_KEY="sb_publishable_vyOh8uTL-GUcuPD4PevQ5w_qIbNJ8fm";

function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function color(v,d){return /^#[0-9a-fA-F]{3,8}$/.test(v||'')?v:d}
function safeUrl(u){u=String(u||'').trim();if(!u)return'';if(/^\s*javascript:/i.test(u))return'';return u}
function imgUrl(u){u=String(u||'').trim();return /^(https?:)?\/\//i.test(u)||/^[\w\-\/\.]+$/.test(u)?u.replace(/'/g,'%27').replace(/"/g,'%22'):''}

function css(){
  if(document.getElementById('ab-css'))return;
  var s=document.createElement('style');s.id='ab-css';
  s.textContent=
  '.ab-bar{position:relative;z-index:50;text-align:center;font:600 13px/1.4 inherit;padding:9px 38px;overflow:hidden}'+
  '.ab-bar span{display:block}.ab-bar a{color:inherit;text-decoration:underline;font-weight:700;margin-left:8px}'+
  '.ab-bar .x{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:0;color:inherit;font-size:18px;cursor:pointer;opacity:.7}'+
  '.ab-sl{position:relative;overflow:hidden;border-radius:14px;margin:12px auto;max-width:1200px;touch-action:pan-y}'+
  '.ab-sl .tr{display:flex;transition:transform .5s ease}'+
  '.ab-sl .sd{flex:0 0 100%;aspect-ratio:16/7;min-height:170px}'+
  '.ab-dots{position:absolute;left:0;right:0;bottom:8px;display:flex;justify-content:center;gap:6px;z-index:3}'+
  '.ab-dots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.5);cursor:pointer}.ab-dots i.on{background:#fff}'+
  '.ab-prs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:12px auto;max-width:1200px}'+
  '.ab-pr{border-radius:14px;aspect-ratio:4/3}'+
  '.ab-btn{display:inline-block;background:#fff;color:#222;border-radius:20px;padding:7px 16px;font-size:13px;font-weight:700}'+
  '.ab-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:18px}'+
  '.ab-pop{position:relative;max-width:360px;width:100%;border-radius:18px;overflow:hidden;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.35)}'+
  '.ab-pop .im{aspect-ratio:16/9;background-size:cover;background-position:center}.ab-pop .tx{padding:18px}'+
  '.ab-pop h3{margin:0 0 6px}.ab-pop p{margin:0 0 12px;font-size:14px}'+
  '.ab-pop .x{position:absolute;right:8px;top:6px;width:30px;height:30px;border-radius:50%;border:0;background:rgba(0,0,0,.45);color:#fff;font-size:18px;cursor:pointer}'+
  '.abc{position:relative;overflow:hidden;background-color:var(--c,#1c1a17);background-image:var(--im,none);background-size:cover;background-position:center;color:var(--t,#fff);display:flex;align-items:flex-end;text-decoration:none}.abc .tx{position:relative;width:100%;padding:18px 20px}.abc h3{margin:0 0 4px;font-size:clamp(17px,3.2vw,28px);line-height:1.25}.abc p{margin:0 0 10px;font-size:clamp(12px,2vw,15px);opacity:.92}.abc .ab-btn{display:inline-block;background:#fff;color:#222;border-radius:20px;padding:7px 16px;font-size:13px;font-weight:700}.abc.st-classic .tx{background:linear-gradient(transparent,rgba(0,0,0,.6));padding-top:34px}.abc.st-tint .tx{background:linear-gradient(transparent,var(--c) 72%);padding-top:46px}.abc.st-tint .ab-btn,.abc.st-panel .ab-btn,.abc.st-ribbon .ab-btn{background:var(--t);color:var(--c)}.abc.st-panel .tx{width:auto;max-width:80%;margin:14px;border-radius:14px;background:var(--c)}.abc.st-split{align-items:center;background-image:none}.abc.st-split::after{content:\'\';position:absolute;top:0;right:0;bottom:0;width:50%;background:var(--im,none) center/cover;clip-path:polygon(16% 0,100% 0,100% 100%,0 100%)}.abc.st-split .tx{width:56%;z-index:1}.abc.st-ribbon .tx{width:auto;max-width:92%;margin:0 0 20px;background:var(--c);border-radius:0 40px 40px 0;padding:10px 26px 12px 18px}.abc.st-center{align-items:center;justify-content:center;text-align:center}.abc.st-center::before{content:\'\';position:absolute;inset:0;background:var(--c);opacity:.62}.abc.st-center .tx{width:auto;max-width:86%;z-index:1}.abc.st-center .ab-btn{background:transparent;border:2px solid var(--t);color:var(--t)}.abc.st-plain .tx{display:none}';
  document.head.appendChild(s);
}

function card(b,base){
  var l=safeUrl(b.link),el=document.createElement(l?'a':'div');if(l)el.href=l;
  var st=/^(classic|tint|panel|split|ribbon|center|plain)$/.test(b.style)?b.style:'classic',im=imgUrl(b.image_url);
  el.className=base+' abc st-'+st;
  el.style.setProperty('--c',color(b.bg_color,'#1c1a17'));
  el.style.setProperty('--t',color(b.text_color,'#fff'));
  el.style.setProperty('--im',im?"url('"+im+"')":'none');
  el.innerHTML='<div class="tx"><h3>'+esc(b.title)+'</h3>'+(b.subtitle?'<p>'+esc(b.subtitle)+'</p>':'')+(b.button_text?'<span class="ab-btn">'+esc(b.button_text)+'</span>':'')+'</div>';
  return el;
}

function bar(list){
  if(!list.length)return;
  try{if(sessionStorage.getItem('ab_bar_x'))return}catch(e){}
  var d=document.createElement('div');d.className='ab-bar';
  var i=0;
  function show(){
    var b=list[i%list.length];
    d.style.background=color(b.bg_color,'#b8715a');d.style.color=color(b.text_color,'#fff');
    var l=safeUrl(b.link);
    d.firstChild.innerHTML=esc(b.title)+(b.button_text&&l?'<a href="'+esc(l)+'">'+esc(b.button_text)+'</a>':'');
  }
  d.innerHTML='<span></span><button class="x" aria-label="close">×</button>';
  d.querySelector('.x').onclick=function(){d.remove();try{sessionStorage.setItem('ab_bar_x','1')}catch(e){}};
  show();document.body.insertBefore(d,document.body.firstChild);
  var hd=document.getElementById('hd');
  function pos(){if(!hd)return;var h=d.parentNode?Math.max(0,d.offsetHeight-(window.pageYOffset||0)):0;hd.style.top=h?'calc('+h+'px + 10px + env(safe-area-inset-top,0px))':''}
  pos();window.addEventListener('scroll',pos,{passive:true});window.addEventListener('resize',pos);
  d.querySelector('.x').addEventListener('click',function(){setTimeout(pos,0)});
  if(list.length>1)setInterval(function(){i++;show()},4000);
}

function slider(list){
  var host=document.getElementById('aabha-slider');if(!host||!list.length)return;
  var w=document.createElement('div');w.className='ab-sl';
  var tr=document.createElement('div');tr.className='tr';
  list.forEach(function(b){tr.appendChild(card(b,'sd'))});
  w.appendChild(tr);
  var n=list.length,i=0,t,dots;
  function go(k){i=(k+n)%n;tr.style.transform='translateX(-'+(i*100)+'%)';if(dots)[].forEach.call(dots.children,function(x,j){x.className=j===i?'on':''})}
  function auto(){clearInterval(t);if(n>1)t=setInterval(function(){go(i+1)},4500)}
  if(n>1){
    dots=document.createElement('div');dots.className='ab-dots';
    list.forEach(function(_,j){var x=document.createElement('i');x.onclick=function(){go(j);auto()};dots.appendChild(x)});
    w.appendChild(dots);
    var sx=null;
    w.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
    w.addEventListener('touchend',function(e){if(sx==null)return;var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>40){go(i+(dx<0?1:-1));auto()}sx=null});
  }
  host.innerHTML='';host.appendChild(w);go(0);auto();
}

function promo(list){
  var host=document.getElementById('aabha-promo');if(!host||!list.length)return;
  var g=document.createElement('div');g.className='ab-prs';
  list.forEach(function(b){g.appendChild(card(b,'ab-pr'))});
  host.innerHTML='';host.appendChild(g);
}

function hero(list){
  var b=list[0],img=document.getElementById('hph');
  if(!b){log('হিরো: এই ডাটাবেসে হিরো ব্যানার নেই');return}
  if(!img){log('হিরো: সাইটে #hph নেই');return}
  var u=imgUrl(b.image_url);if(!u){log('হিরো: ছবির লিংক ফাঁকা/অচল');return}
  log('হিরো: ছবি বসানো হচ্ছে '+u);
  var hf=img.parentNode;
  if(!document.getElementById('ab-hero-css')){var st=document.createElement('style');st.id='ab-hero-css';st.textContent='.hf.ab-hero{margin-bottom:72px}@media(min-width:900px){.hf.ab-hero{margin-bottom:0}}';document.head.appendChild(st)}
  hf.className+=' ab-hero';
  img.alt=b.title||'';
  img.style.cssText='opacity:1;-webkit-mask-image:none;mask-image:none;object-fit:cover;object-position:center';
  img.onerror=function(){log('হিরো: ছবি লোড হয়নি')};
  img.onload=function(){
    var r=img.naturalWidth/img.naturalHeight;if(!(r>0))return;log('হিরো: লোড হয়েছে '+img.naturalWidth+'x'+img.naturalHeight);
    if(r>=.72&&r<=.9)return; /* খিলান ছবি: সাইটের খিলান ফ্রেমেই বসবে */
    r=Math.max(.7,Math.min(1.9,r));
    hf.style.aspectRatio=String(r);hf.style.borderRadius='26px';hf.style.maxWidth='none';
  };
  img.src=u;
  [].forEach.call(hf.querySelectorAll('.chip,.cap'),function(e){e.style.display='none'});
  var l=safeUrl(b.link);
  if(l){hf.style.cursor='pointer';hf.onclick=function(){location.href=l}}
}

function popup(list){
  if(!list.length)return;
  var b=list[0],key='ab_pop_'+b.id;
  try{if(sessionStorage.getItem(key))return}catch(e){}
  setTimeout(function(){
    var l=safeUrl(b.link),im=imgUrl(b.image_url);
    var ov=document.createElement('div');ov.className='ab-ov';
    ov.innerHTML='<div class="ab-pop" style="background:'+color(b.bg_color,'#fff')+';color:'+color(b.text_color,'#222')+'"><button class="x" aria-label="close">×</button>'+(im?'<div class="im" style="background-image:url(\''+im+'\')"></div>':'')+'<div class="tx"><h3>'+esc(b.title)+'</h3>'+(b.subtitle?'<p>'+esc(b.subtitle)+'</p>':'')+(b.button_text&&l?'<a class="ab-btn" style="background:#222;color:#fff" href="'+esc(l)+'">'+esc(b.button_text)+'</a>':'')+'</div></div>';
    function close(){ov.remove();try{sessionStorage.setItem(key,'1')}catch(e){}}
    ov.querySelector('.x').onclick=close;
    ov.addEventListener('click',function(e){if(e.target===ov)close()});
    document.body.appendChild(ov);
  },3000);
}

var LOG=[];
function log(m){LOG.push(m);if(!/[?&]abdebug/.test(location.search))return;var d=document.getElementById('ab-dbg');if(!d){d=document.createElement('div');d.id='ab-dbg';d.style.cssText='position:fixed;left:6px;right:6px;bottom:6px;z-index:99999;background:rgba(0,0,0,.85);color:#9f9;font:11px/1.45 monospace;padding:8px;border-radius:8px;max-height:42vh;overflow:auto;white-space:pre-wrap';document.body.appendChild(d)}d.textContent='aabha-banners v3\n'+LOG.join('\n')}
function live(rows){var n=Date.now();return rows.filter(function(b){var s=b.starts_at?Date.parse(b.starts_at):0,e=b.ends_at?Date.parse(b.ends_at):Infinity;return !(s>n||e<n)})}
function apply(rows){
  css();
  function of(k){return rows.filter(function(b){return b.kind===k})}
  hero(of('hero'));bar(of('bar'));slider(of('slider'));promo(of('promo'));popup(of('popup'));
}
function run(list){
  var i=0;
  (function next(){
    if(i>=list.length){log('কোনো ডাটাবেসে সক্রিয় ব্যানার মেলেনি');return}
    var u=list[i++];
    u.c.from('site_banners').select('*').eq('active',true).order('position',{ascending:true}).then(function(r){
      if(r.error){log(u.n+': ERROR '+r.error.message+(r.error.code?' ('+r.error.code+')':''));return next()}
      var rows=live(r.data||[]),k={};rows.forEach(function(b){k[b.kind]=(k[b.kind]||0)+1});
      log(u.n+': '+rows.length+' ব্যানার '+JSON.stringify(k));
      if(!rows.length)return next();
      apply(rows);
    },function(e){log(u.n+': নেটওয়ার্ক সমস্যা '+e);next()});
  })();
}

function start(){
  log('স্ক্রিপ্ট চালু হয়েছে');
  var C=window.AABHA_CONFIG||{},lib=window.supabase,cand=[];
  log('config.js: '+(C.SUPABASE_URL?'আছে':'নেই')+' | supabase লাইব্রেরি: '+(lib&&lib.createClient?'আছে':'নেই')+' | #hph: '+(document.getElementById('hph')?'আছে':'নেই'));
  if(C.SUPABASE_URL&&C.SUPABASE_ANON_KEY)cand.push({n:'config.js প্রজেক্ট',url:C.SUPABASE_URL,key:C.SUPABASE_ANON_KEY});
  if(!cand.length||cand[0].url!==SB_URL)cand.push({n:'অ্যাডমিন প্রজেক্ট',url:SB_URL,key:SB_KEY});
  function go(L){run(cand.map(function(x){return{n:x.n+' ('+x.url.replace(/^https?:\/\//,'').split('.')[0]+')',c:L.createClient(x.url,x.key)}}))}
  if(lib&&lib.createClient){go(lib);return}
  var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload=function(){go(window.supabase)};
  s.onerror=function(){log('supabase লাইব্রেরি লোড হয়নি')};
  document.head.appendChild(s);
}
window.addEventListener('error',function(e){log('JS ERROR: '+e.message+' ('+String(e.filename||'').split('/').pop()+':'+e.lineno+')')});
function safeStart(){try{start()}catch(e){log('start ERROR: '+e.message)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',safeStart);else safeStart();
})();
