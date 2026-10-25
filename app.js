document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});document.querySelectorAll('[data-group]').forEach(r=>r.hidden=b.dataset.filter!=='all'&&r.dataset.group!==b.dataset.filter)}));
function calc(){const c=document.getElementById('cac'),s=document.getElementById('subs');if(!c||!s)return;document.getElementById('cacVal').textContent=c.value;document.getElementById('subVal').textContent=s.value;document.getElementById('budget').textContent='$'+(+c.value*+s.value*4).toLocaleString('ru-RU')}document.querySelectorAll('input[type=range]').forEach(x=>x.addEventListener('input',calc));
async function downloadPNG(n,ev){const btn=ev.currentTarget,old=btn.textContent;btn.textContent='Подготовка…';try{const svg=document.getElementById('svg-data-'+n).textContent;const u=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));const im=new Image();im.src=u;await im.decode();const c=document.createElement('canvas');c.width=1080;c.height=1350;c.getContext('2d').drawImage(im,0,0);const b=await new Promise(r=>c.toBlob(r,'image/png'));const a=document.createElement('a');const url=URL.createObjectURL(b);a.href=url;a.download='jobescape-concept-'+n+'-1080x1350.png';a.click();URL.revokeObjectURL(u);setTimeout(()=>URL.revokeObjectURL(url),1000)}catch(e){alert('Не удалось создать PNG. Скачайте SVG.')}finally{btn.textContent=old}}
document.querySelectorAll('video').forEach(v=>v.addEventListener('play',()=>document.querySelectorAll('video').forEach(o=>{if(o!==v)o.pause()})));


// Clicking a heading cycles the alignment of that column without reordering rows.
document.querySelectorAll('.decision-table th[data-align-column]').forEach(header=>{
 const button=header.querySelector('button');
 const labels={left:'слева',center:'по центру',right:'справа'};
 const order=['left','center','right'];
 const paths={left:'M2 3h12M2 6h8M2 9h12M2 12h8',center:'M2 3h12M4 6h8M2 9h12M4 12h8',right:'M2 3h12M6 6h8M2 9h12M6 12h8'};
 button.addEventListener('click',()=>{
  const alignment=order[(order.indexOf(header.dataset.align)+1)%order.length];
  header.dataset.align=alignment;
  const table=header.closest('table');
  for(const row of table.rows){
   const cell=row.cells[header.cellIndex];
   if(cell){cell.style.textAlign=alignment;cell.dataset.columnAlignment=alignment;}
  }
  button.querySelector('path').setAttribute('d',paths[alignment]);
  const name=button.querySelector('.column-align-label').textContent;
  const next=order[(order.indexOf(alignment)+1)%order.length];
  button.setAttribute('aria-label',name+': выравнивание '+labels[alignment]+'. Нажмите для выравнивания '+labels[next]+'.');
  const status=document.getElementById('column-align-status');
  if(status)status.textContent=name+': выравнивание '+labels[alignment];
 });
});
