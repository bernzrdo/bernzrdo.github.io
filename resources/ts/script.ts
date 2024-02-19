
const $img: HTMLImageElement = document.querySelector('.profile .avatar img')!;

function loaded(){
    $img.classList.remove('loading');
}

if($img.complete) loaded()
else $img.addEventListener('load', loaded, { once: true });
