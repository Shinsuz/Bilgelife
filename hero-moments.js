// Gentle encouragement, without promising a treatment outcome.
const heroMoments={
 tr:{note:'Bütün yanıtları bilmek zorunda değilsiniz. İlk adımı atmanız yeterli.',lines:[
  'Her yolculuk, küçük bir ilk adımla başlar.',
  'Bütün yolu görmek zorunda değilsiniz. Bir adım yeter.',
  'Kendinize bir şans vermek de bir başlangıçtır.',
  'Bazen cesaret, bir soruyu dile getirmektir.',
  'Kendi hızınızda. Kendiniz için.',
  'Bugün, kendinize biraz daha alan açabilirsiniz.',
  'Nereden başlayacağınızı birlikte konuşabiliriz.',
  'Destek istemek için her şeyi anlatabilmeniz gerekmez.',
  'Küçük adımlar da sizin için anlam taşıyabilir.',
  'Yeni bir başlangıç için kusursuz bir an gerekmez.'
 ],invitation:'İlk adımı birlikte konuşalım'},
 en:{note:'You do not need all the answers yet. One first step is enough.',lines:[
  'Every journey begins with a small first step.',
  'You do not need to see the whole path. One step is enough.',
  'Giving yourself a chance is a beginning, too.',
  'Sometimes courage is putting a question into words.',
  'At your own pace. For yourself.',
  'Today, you can make a little more space for yourself.',
  'We can talk about where to begin, together.',
  'You do not need to explain everything to ask for support.',
  'Even small steps can hold meaning for you.',
  'A new beginning does not need a perfect moment.'
 ],invitation:'Let’s talk about your first step'}
};
const encouragement=document.createElement('p');encouragement.className='hero-encouragement';
document.querySelector('.hero .role').after(encouragement);
const momentCaption=document.querySelector('.orb-caption');momentCaption.removeAttribute('data-i18n');momentCaption.classList.add('moment-caption');
// Keep the changing text outside the decorative scene and its aria-hidden region.
document.querySelector('.orb-scene').after(momentCaption);
const accessibleMoment=document.createElement('span');accessibleMoment.className='screen-reader-only';
const visualMoments=document.createElement('span');visualMoments.className='moment-lines';visualMoments.setAttribute('aria-hidden','true');
momentCaption.replaceChildren(accessibleMoment,visualMoments);
const firstStepLink=document.createElement('a');firstStepLink.href='#iletisim';firstStepLink.className='moment-invitation';
document.getElementById('heroAnimation').append(firstStepLink);
function renderHeroMoments(){const c=heroMoments[document.documentElement.lang==='en'?'en':'tr'];encouragement.textContent=c.note;accessibleMoment.textContent=c.lines[0];visualMoments.style.setProperty('--moment-duration',c.lines.length*8+'s');visualMoments.replaceChildren(...c.lines.map((line,i)=>{const span=document.createElement('span');span.textContent=line;span.style.setProperty('--moment-delay',i*8+'s');return span;}));firstStepLink.textContent=c.invitation;}
new MutationObserver(renderHeroMoments).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});renderHeroMoments();
