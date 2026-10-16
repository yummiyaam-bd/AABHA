/* AABHA customer support chat widget. index.html এ </body> এর আগে: <script src="chat-widget.js"></script> */
(function(){
  var FN_URL='https://xjwuozdfuflfoqiuucik.supabase.co/functions/v1/shop-chat';
  var WA='8801316161192'; /* ✏️ আসল WhatsApp নম্বর বসান (দেশের কোড সহ, + ছাড়া) */
  var MAX_MSGS=20, COOLDOWN=3000;

  var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]})};
  var fmt=function(t){return esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>')};
  var DOTS='<span class="acw-dots"><i></i><i></i><i></i></span>';
  var history=[], busy=false, last=0, count=0;
  try{count=+sessionStorage.getItem('acw_n')||0}catch(e){}

  var css='#acw-btn{position:fixed;left:14px;bottom:92px;z-index:9998;width:54px;height:54px;border-radius:50%;border:0;cursor:pointer;color:#fff;font-size:24px;background:linear-gradient(135deg,#e8b4a0,#b8715a);box-shadow:0 10px 28px rgba(0,0,0,.45)}'
  +'#acw-box{position:fixed;left:12px;bottom:156px;z-index:9999;width:min(370px,calc(100vw - 24px));height:min(520px,calc(100vh - 190px));display:none;flex-direction:column;background:#17121d;color:#f6efe9;border:1px solid rgba(255,255,255,.16);border-radius:22px;box-shadow:0 20px 50px rgba(0,0,0,.6);overflow:hidden;font-family:Manrope,system-ui,sans-serif}'
  +'#acw-box.on{display:flex}'
  +'.acw-h{display:flex;justify-content:space-between;align-items:center;padding:13px 16px;background:rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.1)}'
  +'.acw-h b{font:700 16px "Bodoni Moda",Georgia,serif;letter-spacing:.14em;color:#e8b4a0}'
  +'.acw-h button{background:none;border:0;color:inherit;font-size:20px;cursor:pointer}'
  +'.acw-m{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px}'
  +'.acw-b{max-width:88%;padding:10px 13px;border-radius:16px;font-size:14px;line-height:1.6;white-space:pre-wrap;word-break:break-word}'
  +'.acw-b.u{align-self:flex-end;background:linear-gradient(135deg,#e8b4a0,#b8715a);color:#fff;border-bottom-right-radius:4px}'
  +'.acw-b.a{align-self:flex-start;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-bottom-left-radius:4px}'
  +'.acw-b.e{color:#ff9aa8}'
  +'.acw-c{display:flex;gap:7px;overflow-x:auto;padding:0 14px 8px;scrollbar-width:none}'
  +'.acw-c button{flex:none;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);color:inherit;border-radius:18px;padding:6px 12px;font-size:12px;cursor:pointer;font-family:inherit}'
  +'.acw-n{font-size:11px;opacity:.6;padding:0 14px 6px}'
  +'.acw-f{display:flex;gap:8px;padding:10px 12px;border-top:1px solid rgba(255,255,255,.1)}'
  +'.acw-f input{flex:1;min-width:0;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.16);border-radius:20px;color:inherit;padding:10px 14px;font:inherit;font-size:14px;outline:none}'
  +'.acw-f button{flex:none;width:42px;height:42px;border-radius:50%;border:0;color:#fff;cursor:pointer;background:linear-gradient(135deg,#e8b4a0,#b8715a)}'
  +'.acw-f button:disabled{opacity:.5}'
  +'.acw-wa{display:block;text-align:center;font-size:12px;color:#9ddba3;padding:0 0 10px;text-decoration:none}'
  +'.acw-dots{display:inline-flex;gap:5px;align-items:center;height:20px}'
  +'.acw-dots i{width:8px;height:8px;border-radius:50%;background:#e8b4a0;display:block;animation:acwj 1.1s infinite ease-in-out}'
  +'.acw-dots i:nth-child(2){animation-delay:.18s}.acw-dots i:nth-child(3){animation-delay:.36s}'
  +'@keyframes acwj{0%,70%,100%{transform:translateY(0);opacity:.45}35%{transform:translateY(-7px);opacity:1}}';
  var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

  var wrap=document.createElement('div');
  wrap.innerHTML='<button id="acw-btn" type="button" aria-label="Chat">💬</button>'
  +'<div id="acw-box" role="dialog" aria-label="AABHA chat">'
  +'<div class="acw-h"><b>AABHA</b><button type="button" id="acw-x" aria-label="Close">✕</button></div>'
  +'<div class="acw-m" id="acw-m"><div class="acw-b a">আসসালামু আলাইকুম! 😊 সাইজ, স্টক, দাম বা ডেলিভারি নিয়ে যা জানতে চান, জিজ্ঞেস করুন।</div></div>'
  +'<div class="acw-c" id="acw-c"><button type="button">M সাইজ কি আছে?</button><button type="button">ডেলিভারি কত দিন লাগে?</button><button type="button">এক্সচেঞ্জ কীভাবে?</button><button type="button">কী দিয়ে পেমেন্ট করব?</button></div>'
  +'<div class="acw-n">দয়া করে নাম, ফোন বা ঠিকানা এখানে লিখবেন না।</div>'
  +'<div class="acw-f"><input id="acw-i" maxlength="300" placeholder="আপনার প্রশ্ন লিখুন..."><button type="button" id="acw-s" aria-label="Send">➤</button></div>'
  +'<a class="acw-wa" id="acw-wa" target="_blank" rel="noopener">উত্তর না পেলে WhatsApp এ লিখুন</a>'
  +'</div>';
  document.body.appendChild(wrap);

  var $=function(id){return document.getElementById(id)};
  $('acw-wa').href='https://wa.me/'+WA;
  $('acw-btn').onclick=function(){$('acw-box').classList.toggle('on')};
  $('acw-x').onclick=function(){$('acw-box').classList.remove('on')};

  function add(cls,html){var d=document.createElement('div');d.className='acw-b '+cls;d.innerHTML=html;$('acw-m').appendChild(d);$('acw-m').scrollTop=$('acw-m').scrollHeight;return d}

  async function ask(text){
    text=(text||'').trim();
    if(!text||busy)return;
    if(Date.now()-last<COOLDOWN){add('a e','একটু অপেক্ষা করে আবার লিখুন।');return}
    if(count>=MAX_MSGS){add('a e','অনেক মেসেজ হয়ে গেছে। বাকি কথা WhatsApp এ বলুন, আমরা সাহায্য করব।');return}
    busy=true;last=Date.now();count++;try{sessionStorage.setItem('acw_n',count)}catch(e){}
    $('acw-i').value='';$('acw-s').disabled=true;
    add('u',esc(text));
    var w=add('a',DOTS);
    try{
      var res=await fetch(FN_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:text.slice(0,300),history:history.slice(-6)})});
      if(!res.ok){var m='';try{var j=await res.json();m=j.error||''}catch(e){}throw new Error(m||'এখন উত্তর দিতে পারছি না, কিছুক্ষণ পর আবার চেষ্টা করুন।')}
      var rd=res.body.getReader(),dec=new TextDecoder(),ans='';
      while(true){var r=await rd.read();if(r.done)break;ans+=dec.decode(r.value,{stream:true});w.innerHTML=fmt(ans);$('acw-m').scrollTop=$('acw-m').scrollHeight}
      if(!ans.trim())throw new Error('উত্তর পাওয়া যায়নি, আবার চেষ্টা করুন।');
      history.push({role:'user',text:text},{role:'model',text:ans});
    }catch(err){w.className='acw-b a e';w.textContent=err.message||'সমস্যা হয়েছে, আবার চেষ্টা করুন।'}
    busy=false;$('acw-s').disabled=false;
  }

  $('acw-s').onclick=function(){ask($('acw-i').value)};
  $('acw-i').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();ask($('acw-i').value)}});
  $('acw-c').onclick=function(e){var b=e.target.closest('button');if(b)ask(b.textContent)};
})();
