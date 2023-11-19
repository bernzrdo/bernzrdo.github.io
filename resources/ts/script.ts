
const $img: HTMLImageElement = document.querySelector('.profile .avatar img')!;

if($img.complete) $img.classList.remove('loading');
else $img.addEventListener('load', ()=>$img.classList.remove('loading'), { once: true });