/* AABHA: নিচের গ্লাস ন্যাভিগেশন (Home / Shop / Deals / Bag / Account) + দাম কোথা থেকে আসছে তার চেক (?debug) */
(function(){
  function init(){
    if(document.getElementById('bn'))return;

    var css=
    '#bn{position:fixed;left:12px;right:12px;bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:56;max-width:560px;margin:0 auto;display:flex;justify-content:space-around;align-items:center;padding:6px 6px;border-radius:26px;backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)}'+
    '#bn a,#bn button{position:relative;flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px;border:0;background:none;color:var(--mut);font:800 10px var(--sans);letter-spacing:.06em;text-transform:uppercase;cursor:pointer;border-radius:18px;transition:color .3s,background .3s}'+
    '#bn svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}'+
    '#bn .on{color:var(--ac);background:var(--gl)}'+
    '#bn b{position:absolute;top:1px;left:calc(50% + 6px);min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;font:800 10px/17px var(--sans);text-align:center;letter-spacing:0}'+
    '#bn b[hidden]{display:none}'+
    '@media(max-width:899px){'+
      '#ob{bottom:calc(78px + env(safe-area-inset-bottom,0px))!important}'+
      '#toast{bottom:calc(220px + env(safe-area-inset-bottom,0px))!important}'+
      '#sf{bottom:calc(150px + env(safe-area-inset-bottom,0px))!important}'+
      '#mu{bottom:calc(150px + env(safe-area-inset-bottom,0px))!important}'+
      'footer{padding-bottom:210px!important}'+
    '}'+
    '@media(min-width:900px){#bn{display:none}}';
    var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

    function svg(p){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+p+'</svg>'}
    var I={
      home:svg('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>'),
      shop:svg('<path d="M6 7h12l1 13H5L6 7z"/><path d="M9 7a3 3 0 0 1 6 0"/>'),
      deals:svg('<path d="M3 12V4h8l10 10-8 8L3 12z"/><circle cx="7.5" cy="8.5" r="1.3"/>'),
      bag:svg('<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.4 12h11L21 7H6"/>'),
      acc:svg('<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c.8-4 3.8-6 7.5-6s6.7 2 7.5 6"/>')
    };

    if(window.BN&&!BN.Home)BN.Home='হোম';

    var nav=document.createElement('nav');
    nav.id='bn';nav.className='glass';nav.setAttribute('aria-label','Quick navigation');
    nav.innerHTML=
      '<a href="#top" data-t="top">'+I.home+'<span>Home</span></a>'+
      '<a href="#shop" data-t="shop">'+I.shop+'<span>Shop</span></a>'+
      '<a href="#outfits" data-t="outfits">'+I.deals+'<span>Deals</span></a>'+
      '<button type="button" data-t="bag" aria-label="Bag">'+I.bag+'<span>Bag</span><b id="bnb" hidden>0</b></button>'+
      '<a href="account/" data-t="acc">'+I.acc+'<span>Account</span></a>';
    document.body.appendChild(nav);

    nav.addEventListener('click',function(e){
      var t=e.target.closest('[data-t]');if(!t)return;
      if(t.dataset.t==='top'){e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}
      else if(t.dataset.t==='bag'){var hb=document.getElementById('hb');if(hb)hb.click()}
    });

    /* Bag-এর সংখ্যা হেডারের সংখ্যার সাথে মেলানো */
    var hn=document.getElementById('hn'),bnb=document.getElementById('bnb');
    function sync(){var n=hn?parseInt(hn.textContent,10)||0:0;bnb.textContent=n;bnb.hidden=!n}
    if(hn){new MutationObserver(sync).observe(hn,{childList:true,characterData:true,subtree:true})}
    sync();

    /* কোন সেকশনে আছি, সেটা হাইলাইট */
    function top(id){var e=document.getElementById(id);return e?e.getBoundingClientRect().top+window.scrollY:null}
    var tick=0;
    function act(){
      tick=0;
      var y=window.scrollY+window.innerHeight*.35,s=top('shop'),o=top('outfits'),oe=document.getElementById('outfits'),k='top';
      if(o!==null&&y>=o)k=(oe&&y>=o+oe.offsetHeight)?'':'outfits';
      else if(s!==null&&y>=s)k='shop';
      [].forEach.call(nav.querySelectorAll('[data-t]'),function(a){a.classList.toggle('on',a.dataset.t===k)});
    }
    window.addEventListener('scroll',function(){if(!tick)tick=requestAnimationFrame(act)},{passive:true});
    act();

    if(typeof applyLang==='function'&&typeof LANG!=='undefined'&&LANG==='bn')applyLang();

    /* ?debug=1 দিলে দেখাবে সাইট ডাটাবেস থেকে দাম নিচ্ছে নাকি বিল্ট-ইন লিস্ট থেকে */
    if(/[?&]debug/.test(location.search)){
      setTimeout(function(){
        try{
          var d=document.createElement('div'),live=(typeof ORD!=='undefined')&&ORD,x=null;
          if(typeof D!=='undefined')x=D.find(function(p){return p.n==='Festive Panjabi'})||D[0];
          d.style.cssText='position:fixed;top:82px;left:50%;transform:translateX(-50%);z-index:200;padding:7px 14px;border-radius:20px;font:700 12px sans-serif;color:#fff;white-space:nowrap;background:'+(live?'#2f7d4f':'#a33');
          d.textContent=live?('DB live · '+(x?x.n+' ৳'+x.p:'')):'BUILT-IN list (DB not used)';
          document.body.appendChild(d);
        }catch(err){}
      },3500);
    }
  }
  if(document.readyState==='complete')init();else window.addEventListener('load',init);
})();
