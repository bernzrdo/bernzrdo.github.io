const $ = require('jquery');

// ----- SCROLL -----

let lastActiveID;
let lastScrollY;
function scroll(){

    lastScrollY = scrollY;

    // Index

    $('.index').css('visibility', scrollY > innerHeight * .75 ? '' : 'hidden');

    let activeID = [...$('div[id]')].reverse().find(e=>e.getBoundingClientRect().y < innerHeight / 2).id;
    if(activeID == 'intro') activeID = 'timeline';
    if(lastActiveID != activeID){

        $('.index a.active').removeClass('active');
        let $active = $(`.index a[href="#${activeID}"]`);
        
        $active.addClass('active');
        
        $('.index').css({ transform: `translateY(-${$active.index() * $active.height()}px)` })

        lastActiveID = activeID;
    }

    // Intro

    $('#intro .hyperdrive').css({ marginTop: scrollY });

    $('#intro .greeting').css({
        marginTop: scrollY,
        opacity: 1 - Math.min(scrollY / innerHeight, 1)
    });

    $('#intro .hint').toggleClass('off', scrollY > 0);

    // Timeline

    for(let $item of $('#timeline > div')){
        $($item).toggleClass('off', $item.getBoundingClientRect().y > innerHeight);
    }

    // Contact

    let { width, height } = $('#contact .links')[0].getBoundingClientRect();
    $('#contact .frame').css({ width, height });

    let { height: frameHeight } = $('#contact .frame')[0].getBoundingClientRect();
    let { y: contactY } = $('#contact')[0].getBoundingClientRect();
    let progress = contactY / innerHeight;
    if(progress > 1) progress = 1;

    $('#contact .frame').css({
        transform: `translate(-50%, calc(-50% - ${progress * frameHeight}px)) scale(${1 - progress * .2})`,
        opacity: 1 - progress
    });

    for(let $item of $('#contact .links a')){
        $($item).toggleClass('off', $item.getBoundingClientRect().y > innerHeight * .75);
    }

}
addEventListener('scroll', scroll);
scroll();

// ----- RESIZE -----

function resize(){

    // Name Size

    const $h1 = $('#intro .greeting h1')[0];

    $h1.style.removeProperty('font-size');

    if($h1.scrollWidth == $h1.clientWidth) return;

    let size = 0;
    $h1.style.fontSize = '0px';
    
    while($h1.scrollWidth == $h1.clientWidth){
        $h1.style.fontSize = `${++size}px`;
    }
    
    $h1.style.fontSize = `${--size}px`;

    // Update scroll

    scroll();

}
addEventListener('resize', resize);
resize();

// ----- DIALOG -----

window.openDialog = $dialog=>{
    $($dialog).show();
    $dialog.showModal();
    $($dialog).removeClass('off');
}

$('dialog .close-btn').on('click', function(){ $(this).parents('dialog')[0].close() });

$('dialog').on('click', function(e){

    let { top, bottom, left, right } = this.getBoundingClientRect();

    if(
        e.clientX < left ||
        e.clientX > right ||
        e.clientY < top ||
        e.clientY > bottom
    ) this.close();

});

$('dialog').on('close', function(){

    if(this.returnValue == 'closed'){
        this.returnValue = '';
        return;
    }

    this.showModal();
    $(this).addClass('off');
    setTimeout(()=>{
        $(this).hide();
        this.close('closed');
    }, 500);

});

// ----- INDEX -----

const $index = $('.index');

if(!('ontouchstart' in window)){

    $index
        .on('mouseenter', ()=>$index.addClass('on'))
        .on('mouseleave', ()=>$index.removeClass('on'));

}else{

    $index.on('click', '.active', e=>{
        if($index.hasClass('on')) return;
        e.preventDefault();
        $index.addClass('on');
    });

    $(window).on('click', ()=>$index.removeClass('on'));
    $index.on('click', e=>e.stopPropagation());

}

$index.find('a').on('click', function(e){
    e.preventDefault();

    $index.removeClass('on');

    scrollTo({
        top: getScrollPos(this.hash),
        behavior: 'smooth'
    });

});

function getScrollPos(hash){

    if(hash == '#intro')
        return 0;

    let { y, height } = document.querySelector(hash).getBoundingClientRect();
    y += scrollY;

    if(hash == '#soft-skills')
        return y - innerHeight / 2 + height / 2;

    return y;
}

// ----- LANGUAGE -----

const $language = $('.language');

$language.find('.select').on('click', ()=>$language.toggleClass('open'));

$(window).on('click', ()=>$language.removeClass('open'));
$language.on('click', e=>e.stopPropagation());

// ----- AGE -----

(()=>{

    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let age = year - 2003;
    
    if(
        month < 8 ||
        (month == 8 && day < 23) 
    ) age--;

    $('.age').text(age);

})();

// ----- SOFT SKILLS -----

(()=>{

    const $softSkills = $('#soft-skills');
    
    // init

    let width = 
        $('.soft-skill')[0].getBoundingClientRect().width +
        parseFloat($softSkills.css('padding-left'));
    
    while($softSkills[0].scrollWidth < innerWidth + width){
        $('.soft-skill').clone().appendTo('#soft-skills');
    }

    // update

    $softSkills[0].scrollLeft = $softSkills[0].scrollWidth / 2 - innerWidth / 2;
    $softSkills.on('scroll', ()=>{

        if($softSkills[0].scrollLeft < 5){
            $('.soft-skill:last').prependTo('#soft-skills')
            $softSkills[0].scrollLeft += width;
        }

        if($softSkills[0].scrollLeft + innerWidth > $softSkills[0].scrollWidth - 5){
            $('.soft-skill:first').appendTo('#soft-skills')
            $softSkills[0].scrollLeft -= width;
        }

    });

    setInterval(()=>{
        if(!$softSkills.hasClass('grabbing'))
            $softSkills[0].scrollLeft++;
    }, 10);

    // grabbing
    
    let lastX;
    $softSkills.on('mousedown touchstart', e=>{

        $softSkills.addClass('grabbing');

        lastX = e.clientX ?? e.touches[0].clientX;

        $(document).on('mousemove touchmove', e=>{
            
            let x = e.clientX ?? e.touches[0].clientX;
            $softSkills[0].scrollLeft += lastX - x;
            lastX = x;

        });

        $(document).on('mouseup touchend touchcancel', ()=>{

            $softSkills.removeClass('grabbing');
            $(document).off('mousemove mouseup touchmove touchend touchcancel');

        });

    });

})();