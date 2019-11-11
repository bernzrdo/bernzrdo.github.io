
var winHeight = $(window).height(),scrollPos,wait,animation;

$(function(){
    
    transition();
    
    $(window).on("scroll",transition);
    
    $("#skills > div").each(function(i,el){
        $($(el).children()[0]).css("width",$(el).attr("level")*10+"%");
    });
    
    $("#email").click(function(){
        location.href="mailto:"+window.atob("YmVybmFyZG92czIwMDNAZ21haWwuY29t");
    });
    
    $("#github").click(function(){
        window.open("https://github.com/bernzrdo","_blank");
    });
    
    $("img").attr("draggable","false");
    
    $("#mode").click(function(){
        $("body").toggleClass("dark");
    });
    
});

function transition(){
    
    clearTimeout(wait);
    
    update();
    
    wait=setTimeout(function(){
        
        if(scrollPos<.5*winHeight){
            if(scrollPos!=0){
                animateScroll(0);
            }
        }else if(scrollPos<1.5*winHeight){
            if(scrollPos!=1*winHeight){
                animateScroll(1);
            }
        }else if(scrollPos<2.5*winHeight){
            if(scrollPos!=2*winHeight){
                animateScroll(2);
            }
        }else if(scrollPos<3.5*winHeight){
            if(scrollPos!=3*winHeight){
                animateScroll(3);
            }
        }
        
    },1000);
    
}

function update(){
    
    scrollPos = $(window).scrollTop();
    
    $("#intro").css("transform","translate(-50%,-50%) rotate("+(scrollPos*180)/winHeight+"deg)");
    $("#intro").css("opacity",1-(scrollPos/winHeight));
    
    $("#info").css("transform","translate(-50%,-50%) rotate("+((scrollPos-winHeight)*180)/winHeight+"deg)");
    if(scrollPos<winHeight){
        $("#info").css("opacity",scrollPos/winHeight);
    }else{
        $("#info").css("opacity",1-((scrollPos-winHeight)/winHeight));
    }
    
    $("#skills").css("transform","translate(-50%,-50%) rotate("+((scrollPos-2*winHeight)*180)/winHeight+"deg)");
    if(scrollPos<2*winHeight){
        $("#skills").css("opacity",(scrollPos-winHeight)/winHeight);
    }else{
        $("#skills").css("opacity",1-((scrollPos-2*winHeight)/winHeight));
    }
    
    $("#contacts").css("transform","translate(-50%,-50%) rotate("+((scrollPos-3*winHeight)*180)/winHeight+"deg)");
    if(scrollPos<3*winHeight){
        $("#contacts").css("opacity",(scrollPos-2*winHeight)/winHeight);
    }else{
        $("#contacts").css("opacity",1-((scrollPos-3*winHeight)/winHeight));
    }
    
    if($("#contacts").css("opacity")<=0){
        $("#contacts").hide();
    }else{
        $("#contacts").show();
    }
    
}

function animateScroll(pos){
    $(window).off("scroll");
    animation=setInterval(update);
    $('html, body').animate({
        scrollTop: pos*winHeight
    },500,function(){
        $(window).on("scroll",transition);
        clearInterval(animation);
    });
}