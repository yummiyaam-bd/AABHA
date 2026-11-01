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
  '.ab-sl .sd{flex:0 0 100%;aspect-ratio:16/7;min-height:170px;background-size:cover;background-position:center;display:flex;align-items:flex-end;text-decoration:none}'+
  '.ab-sl .tx,.ab-pr .tx{width:100%;padding:18px 20px;background:linear-gradient(transparent,rgba(0,0,0,.55))}'+
  '.ab-sl h3,.ab-pr h3{margin:0 0 4px;font-size:clamp(17px,3.2vw,28px)}.ab-sl p,.ab-pr p{margin:0 0 10px;font-size:clamp(12px,2vw,15px);opacity:.92}'+
  '.ab-btn{display:inline-block;background:#fff;color:#222;border-radius:20px;padding:7px 16px;font-size:13px;font-weight:700}'+
  '.ab-dots{position:absolute;left:0;right:0;bottom:8px;display:flex;justify-content:center;gap:6px}'+
  '.ab-dots i{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.5);cursor:pointer}.ab-dots i.on{background:#fff}'+
  '.ab-prs{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin:12px auto;max-width:1200px}'+
  '.ab-pr{border-radius:14px;overflow:hidden;background-size:cover;background-position:center;aspect-ratio:4/3;display:flex;align-items:flex-end;text-decoration:none}'+
  '.ab-ov{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;display:flex;align-items:center;justify-content:center;padding:18px}'+
  '.ab-pop{position:relative;max-width:360px;width:100%;border-radius:18px;overflow:hidden;text-align:center;box-shadow:0 10px 40px rgba(0,0,0,.35)}'+
  '.ab-pop .im{aspect-ratio:16/9;background-size:cover;background-position:center}.ab-pop .tx{padding:18px}'+
  '.ab-pop h3{margin:0 0 6px}.ab-pop p{margin:0 0 12px;font-size:14px}'+
  '.ab-pop .x{position:absolute;right:8px;top:6px;width:30px;height:30px;border-radius:50%;border:0;background:rgba(0,0,0,.45);color:#fff;font-size:18px;cursor:pointer}';
  document.head.appendChild(s);
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
  if(list.length>1)setInterval(function(){i++;show()},4000);
}

function slider(list){
  var host=document.getElementById('aabha-slider');if(!host||!list.length)return;
  var w=document.createElement('div');w.className='ab-sl';
  var tr=document.createElement('div');tr.className='tr';
  list.forEach(function(b){
    var l=safeUrl(b.link),el=document.createElement(l?'a':'div');if(l)el.href=l;
    el.className='sd';
    var im=imgUrl(b.image_url);
    el.style.cssText='background-color:'+color(b.bg_color,'#1c1a17')+';color:'+color(b.text_color,'#fff')+(im?";background-image:url('"+im+"')":'');
    el.innerHTML='<div class="tx"><h3>'+esc(b.title)+'</h3>'+(b.subtitle?'<p>'+esc(b.subtitle)+'</p>':'')+(b.button_text?'<span class="ab-btn">'+esc(b.button_text)+'</span>':'')+'</div>';
    tr.appendChild(el);
  });
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
  list.forEach(function(b){
    var l=safeUrl(b.link),el=document.createElement(l?'a':'div');if(l)el.href=l;
    el.className='ab-pr';var im=imgUrl(b.image_url);
    el.style.cssText='background-color:'+color(b.bg_color,'#1c1a17')+';color:'+color(b.text_color,'#fff')+(im?";background-image:url('"+im+"')":'');
    el.innerHTML='<div class="tx"><h3>'+esc(b.title)+'</h3>'+(b.subtitle?'<p>'+esc(b.subtitle)+'</p>':'')+(b.button_text?'<span class="ab-btn">'+esc(b.button_text)+'</span>':'')+'</div>';
    g.appendChild(el);
  });
  host.innerHTML='';host.appendChild(g);
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

function run(sb){
  var now=new Date().toISOString();
  sb.from('site_banners').select('*').eq('active',true)
    .or('starts_at.is.null,starts_at.lte.'+now).or('ends_at.is.null,ends_at.gte.'+now)
    .order('position',{ascending:true}).then(function(r){
      if(r.error||!r.data)return;
      css();
      function of(k){return r.data.filter(function(b){return b.kind===k})}
      bar(of('bar'));slider(of('slider'));promo(of('promo'));popup(of('popup'));
    });
}

function start(){
  var lib=window.supabase;
  if(lib&&lib.createClient){run(window.__aabhaSb||lib.createClient(SB_URL,SB_KEY));return}
  var s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
  s.onload=function(){run(window.supabase.createClient(SB_URL,SB_KEY))};
  document.head.appendChild(s);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
