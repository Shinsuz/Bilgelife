(()=>{
 const mobileCopy={tr:{label:'Bir soruyla başlayın',button:'Mesajınızı yazın',demo:'Şimdilik demo formu'},en:{label:'Start with a question',button:'Write your message',demo:'Demo form for now'}};
 const bar=document.createElement('div');bar.className='mobile-contact-bar';bar.hidden=true;
 const text=document.createElement('div'),label=document.createElement('strong'),note=document.createElement('span');text.append(label,note);
 const link=document.createElement('a');link.href='#iletisim';link.className='btn';bar.append(text,link);document.body.append(bar);
 function translateBar(){const c=mobileCopy[document.documentElement.lang==='en'?'en':'tr'];label.textContent=c.label;note.textContent=c.demo;link.textContent=c.button;}
 translateBar();new MutationObserver(translateBar).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 if(typeof IntersectionObserver==='undefined')return;
 let contactVisible=false,heroVisible=true;
 function updateBar(){bar.hidden=heroVisible||contactVisible||document.hidden;}
 new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.target.matches('.hero'))heroVisible=entry.isIntersecting;else contactVisible=entry.isIntersecting;});updateBar();},{threshold:0}).observe(document.querySelector('.hero'));
 const contactObserver=new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;updateBar();},{threshold:0});contactObserver.observe(document.getElementById('iletisim'));
 const animation=document.getElementById('heroAnimation');let orbVisible=true;
 const pauseOutsideViewport=()=>animation.classList.toggle('viewport-paused',!orbVisible||document.hidden);
 new IntersectionObserver(entries=>{orbVisible=entries[0].isIntersecting;pauseOutsideViewport();},{rootMargin:'80px'}).observe(animation);
 document.addEventListener('visibilitychange',()=>{updateBar();pauseOutsideViewport();});
})();
