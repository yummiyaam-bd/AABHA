(function(){
const SB_URL="https://xjwuozdfuflfoqiuucik.supabase.co";
const SB_KEY="sb_publishable_vyOh8uTL-GUcuPD4PevQ5w_qIbNJ8fm";
const sb=supabase.createClient(SB_URL,SB_KEY);
const A=window.Admin={sb:sb};
const $=id=>document.getElementById(id);
A.$=$;
A.esc=t=>String(t==null?'':t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
A.css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
A.ic=n=>'<svg class="i"><use href="#i-'+n+'"/></svg>';
A.money=n=>'৳'+Number(n||0).toLocaleString('en-US');
A.fmtDate=t=>t?new Date(t).toLocaleString('en-GB',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}):'';
let tt;
A.toast=m=>{const e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2800)};
A.setBell=n=>{const e=$('notif-count');if(e)e.textContent=n};

const SPRITE='<svg width="0" height="0" style="position:absolute" aria-hidden="true">'
+'<symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></symbol>'
+'<symbol id="i-bag" viewBox="0 0 24 24"><path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></symbol>'
+'<symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16Z"/><path d="M10 20a2 2 0 0 0 4 0"/></symbol>'
+'<symbol id="i-box" viewBox="0 0 24 24"><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5v-9Z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/></symbol>'
+'<symbol id="i-trend" viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></symbol>'
+'<symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>'
+'<symbol id="i-alert" viewBox="0 0 24 24"><path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17.5v.01"/></symbol>'
+'<symbol id="i-out" viewBox="0 0 24 24"><path d="M9 4H5v16h4"/><path d="M16 8l4 4-4 4M20 12H9"/></symbol>'
+'<symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>'
+'<symbol id="i-refresh" viewBox="0 0 24 24"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 5v6h-6"/></symbol>'
+'<symbol id="i-truck" viewBox="0 0 24 24"><path d="M2 7h11v9H2z"/><path d="M13 10h4l4 3v3h-8"/><circle cx="6.5" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/></symbol>'
+'<symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 5 5L20 7"/></symbol>'
+'<symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6"/></symbol>'
+'<symbol id="i-tag" viewBox="0 0 24 24"><path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.3"/></symbol>'
+'<symbol id="i-wallet" viewBox="0 0 24 24"><path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M3 7l12-3v3M17 14h2"/></symbol>'
+'<symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></symbol>'
+'<symbol id="i-cart" viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.4 12h11L21 7H6"/></symbol>'
+'<symbol id="i-doc" viewBox="0 0 24 24"><path d="M6 3h9l4 4v14H6V3Z"/><path d="M15 3v4h4M9 12h7M9 16h7"/></symbol>'
+'<symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.6 3-5.5 6-5.5s5.4 1.9 6 5.5"/><path d="M16 5a3 3 0 0 1 0 6M18 14.8c1.8.6 3 2.3 3.3 5.2"/></symbol>'
+'<symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>'
+'<symbol id="i-edit" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="M13.5 6.5l4 4"/></symbol>'
+'<symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></symbol>'
+'<symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>'
+'<symbol id="i-chat" viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5Z"/></symbol>'
 +'</svg>';

/* [key, নাম, icon, ফাইল, দরকারি অনুমতি] */
const NAV=[
 ['index','Dashboard','grid','index.html',null],
 ['products','Products','tag','products.html','products'],
 ['stock','Stock','box','stock.html','products'],
 ['expenses','Expenses','wallet','expenses.html','expenses'],
 ['reports','Reports','chart','reports.html','reports'],
 ['carts','Abandoned Carts','cart','carts.html','reports'],
 ['audit','Audit Log','doc','audit.html','admin'],
 ['ai','AI Assistant','chat','ai.html','reports'],
 ['desc','Description','edit','desc.html','products'],
 ['staff','Staff','users','staff.html','admin']];

A.boot=async function(o){
  const {data:{user}}=await sb.auth.getUser();
  if(!user){location.replace('login.html');return}
  const perms=['orders','products','expenses','reports'];
  const rs=await Promise.all([sb.rpc('is_staff'),sb.rpc('is_admin')].concat(perms.map(p=>sb.rpc('has_perm',{p:p}))));
  if(rs[0].error||rs[0].data!==true){await sb.auth.signOut();alert('আপনার অনুমতি নেই!');location.replace('login.html');return}
  const P={admin:rs[1].data===true};
  perms.forEach((k,i)=>P[k]=rs[i+2].data===true);
  A.perm=P;A.user=user;

  /* যে পেজ ফাইল আছে সেটাই লিংক হবে, নাহলে "Soon" */
  const vis=NAV.filter(n=>!n[4]||P[n[4]]);
  const ok=await Promise.all(vis.map(n=>n[0]===o.key?true:fetch(n[3],{method:'HEAD',cache:'no-store'}).then(r=>r.ok).catch(()=>false)));
  const items=vis.map((n,i)=>ok[i]
    ?'<a href="'+n[3]+'" class="'+(n[0]===o.key?'active':'')+'">'+A.ic(n[2])+n[1]+'</a>'
    :'<span class="soon">'+A.ic(n[2])+n[1]+'<em>Soon</em></span>').join('');

  document.body.insertAdjacentHTML('afterbegin',SPRITE
   +'<div class="scrim" id="scrim"></div>'
   +'<aside class="sidebar"><div class="brand"><b>AABHA</b><small>Admin Studio</small></div><nav class="nav">'+items+'</nav>'
   +'<button class="logout" id="lo">'+A.ic('out')+'Sign Out</button></aside>');
  const main=document.createElement('div');main.className='main';
  main.innerHTML='<header class="topbar"><button class="ib menu-btn" id="mb" aria-label="Menu">'+A.ic('menu')+'</button>'
   +'<div class="ttl"><h1>'+A.esc(o.title)+'</h1><span>'+new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long'})+'</span></div>'
   +'<div class="chip">'+A.ic('user')+'<span>'+A.esc(user.email)+'</span></div>'
   +'<a class="ib" href="index.html#notif-section" aria-label="Notifications">'+A.ic('bell')+'<span class="dot" id="notif-count">0</span></a>'
   +'<button class="ib" id="rf" aria-label="Refresh">'+A.ic('refresh')+'</button></header>'
   +'<div class="content" id="content"></div>';
  document.body.appendChild(main);
  document.body.insertAdjacentHTML('beforeend','<div class="toast" id="toast"></div>');
  $('content').appendChild($('page'));

  $('mb').onclick=()=>document.body.classList.toggle('menu');
  $('scrim').onclick=()=>document.body.classList.remove('menu');
  $('lo').onclick=()=>sb.auth.signOut().then(()=>location.replace('login.html'));
  $('rf').onclick=()=>{if(A.onRefresh)A.onRefresh()};
  sb.from('notifications').select('id',{count:'exact',head:true}).eq('audience','staff').eq('read',false).then(r=>A.setBell(r.count||0));

  if(o.perm&&!P[o.perm]){$('page').innerHTML='<div class="panel"><div class="empty">এই পেজ দেখার অনুমতি আপনার নেই।</div></div>';return}
  if(o.ready)await o.ready(A);
};
})();
