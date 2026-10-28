const practitionerLink=document.createElement('a');practitionerLink.href='hamide.html';practitionerLink.className='btn practitioner-link';
document.querySelector('.personal-copy').append(practitionerLink);
function updatePractitionerLink(){practitionerLink.textContent=document.documentElement.lang==='en'?'Get to know Hamide':'Hamide’yi tanıyın';}
new MutationObserver(updatePractitionerLink).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});updatePractitionerLink();
