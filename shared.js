// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Custom cursor (desktop only)
if(window.matchMedia('(pointer:fine)').matches){
  const cursor=document.getElementById('cursor'),ring=document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cursor.style.left=(mx-5)+'px';
    cursor.style.top=(my-5)+'px';
  });
  (function animRing(){
    rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
    ring.style.left=(rx-18)+'px';ring.style.top=(ry-18)+'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a,button,.service-card,.process-item,.value-card,.info-block,.service-row,.timeline-row,.portfolio-step').forEach(el=>{
    el.addEventListener('mouseenter',()=>{cursor.style.transform='scale(2.5)';ring.style.transform='scale(1.5)';ring.style.opacity='0.8';});
    el.addEventListener('mouseleave',()=>{cursor.style.transform='scale(1)';ring.style.transform='scale(1)';ring.style.opacity='0.5';});
  });
}

// Nav scroll
window.addEventListener('scroll',()=>{document.getElementById('nav').classList.toggle('scrolled',window.scrollY>60);});

// Reveal on scroll + counter animation
const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      const num=e.target.querySelector('[data-target]');
      if(num&&!num.dataset.animated){
        num.dataset.animated=true;
        const target=parseInt(num.dataset.target);
        let count=0;
        const step=Math.max(1,Math.ceil(target/40));
        const suffix=target===100?'%':'+';
        const t=setInterval(()=>{
          count=Math.min(count+step,target);
          num.textContent=count+suffix;
          if(count>=target)clearInterval(t);
        },30);
      }
    }
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
