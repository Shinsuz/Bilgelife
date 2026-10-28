const T={tr:{sv1:'Aile danışmanlığı',sv2:'Homeopati',sv4:'Aromaterapi',sv9:'EMDR'},en:{sv1:'Family counseling',sv2:'Homeopathy',sv4:'Aromatherapy',sv9:'EMDR'}};
function language(){return document.documentElement.lang==='en'?'en':'tr';}
const profileCopy={tr:{skip:'İçeriğe geç',back:'← Ana sayfaya dön',label:'HAMİDE’Yİ TANIYIN',intro:'Kişisel yolculuğu, görüşmelere yaklaşımı ve mesleki geçmişi. Bu sayfadaki biyografi ve eğitim bilgileri henüz tamamlanmadı; yer tutucular daha sonra gerçek bilgilerle güncellenecek.',contact:'Bir soru sorun',theme:'Koyu tema'},en:{skip:'Skip to content',back:'← Back to the homepage',label:'GET TO KNOW HAMIDE',intro:'Her personal journey, approach to sessions and professional background. Biography and training details on this page are not complete yet; placeholders will be replaced with actual information.',contact:'Ask a question',theme:'Dark theme'}};
function renderProfile(){const c=profileCopy[language()];document.querySelectorAll('[data-profile]').forEach(el=>el.textContent=c[el.dataset.profile]);document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language())));document.getElementById('profileTheme').setAttribute('aria-label',c.theme);document.getElementById('profileTheme').setAttribute('aria-checked',String(document.documentElement.dataset.theme==='dark'));document.querySelector('meta[name="theme-color"]').content=document.documentElement.dataset.theme==='dark'?'#180f20':'#e8d8bf';}
document.querySelectorAll('[data-lang]').forEach(button=>button.addEventListener('click',()=>{document.documentElement.lang=button.dataset.lang;try{localStorage.setItem('lang',button.dataset.lang);}catch{}renderProfile();}));
document.getElementById('profileTheme').addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=theme;try{localStorage.setItem('theme',theme);}catch{}renderProfile();});
document.getElementById('profileYear').textContent=new Date().getFullYear();renderProfile();

// Animate the real height, preserving native details semantics and keyboard clicks.
const expandingDetails=new WeakSet();
document.addEventListener('click',event=>{
 const summary=event.target.closest('summary');
 if(!summary||!summary.parentElement.matches('.qualification-card,.personal-background details'))return;
 const details=summary.parentElement;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches||!details.animate)return;
 event.preventDefault();
 if(expandingDetails.has(details))return;
 const nextOpen=!details.open,start=details.getBoundingClientRect().height;
 details.open=nextOpen;
 const end=details.getBoundingClientRect().height;
 details.open=true;
 expandingDetails.add(details);
 const oldOverflow=details.style.overflow;details.style.overflow='hidden';
 const animation=details.animate([{height:start+'px'},{height:end+'px'}],{duration:260,easing:'cubic-bezier(.2,.65,.3,1)'});
 const finish=()=>{details.open=nextOpen;details.style.overflow=oldOverflow;expandingDetails.delete(details);};
 animation.finished.then(finish,finish);
});
