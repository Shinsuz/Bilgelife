// Entrance effects run once per element; content stays visible if animation is unavailable.
(()=>{
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 if(typeof IntersectionObserver==='undefined'||typeof Element.prototype.animate!=='function')return;
 const seen=new WeakSet(),running=new Set();
 const selector='.identity-card,.personal-copy,.approach-strip,.services li,.step,.faq-intro,.faq-content,.contact-layout>div,.referral-strip';
 function play(element,frames,options){if(preference.matches)return;const animation=element.animate(frames,options);running.add(animation);animation.finished.then(()=>running.delete(animation),()=>running.delete(animation));}
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(!entry.isIntersecting)return;observer.unobserve(entry.target);const element=entry.target;if(preference.matches)return;const siblings=[...element.parentElement.children];const index=siblings.indexOf(element);const stagger=element.matches('.services li,.step')?Math.min(index%3*65,130):0;play(element,[{opacity:0,translate:'0 18px'},{opacity:1,translate:'0 0'}],{duration:620,delay:stagger,easing:'cubic-bezier(.2,.65,.3,1)',fill:'backwards'});});},{threshold:.08,rootMargin:'0px 0px -24px 0px'});
 function register(root){if(root.nodeType!==1)return;const nodes=[...(root.matches(selector)?[root]:[]),...root.querySelectorAll(selector)];nodes.forEach(element=>{if(seen.has(element))return;seen.add(element);observer.observe(element);});}
 register(document.querySelector('main'));
 const additions=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(register)));
 additions.observe(document.querySelector('main'),{childList:true,subtree:true});
 document.addEventListener('focusin',event=>{const target=event.target.closest(selector);if(target){observer.unobserve(target);target.getAnimations().forEach(animation=>animation.cancel());}});
 document.querySelectorAll('dialog').forEach(dialog=>{
  new MutationObserver(()=>{if(dialog.open)play(dialog,[{opacity:0,translate:'0 12px',scale:'.985'},{opacity:1,translate:'0 0',scale:'1'}],{duration:230,easing:'cubic-bezier(.2,.65,.3,1)'});}).observe(dialog,{attributes:true,attributeFilter:['open']});
 });
 document.querySelector('#sorular').addEventListener('toggle',event=>{if(event.target.tagName==='DETAILS'&&event.target.open){const answer=event.target.querySelector('p');if(answer)play(answer,[{opacity:0,translate:'0 -5px'},{opacity:1,translate:'0 0'}],{duration:240,easing:'ease-out'});}},{capture:true});
 preference.addEventListener('change',()=>{if(preference.matches){running.forEach(animation=>animation.cancel());running.clear();}});
})();
