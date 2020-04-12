
// --- VARIABLES ---

// Content
var repos;
var user;

// Colors
var rgb;
var color;
var textColor;

// Loading time
var startTime = new Date();
var canStart = false;


// --- FUNCTIONS ---

// START: Display all content after everything is loaded
function start(){
    if(repos&&user&&canStart){

        // Hide content before displaying
        $('#profile,#projects').hide();

        // Render user info on page
        $('#pfp').attr('src',user.avatar_url);
        $('#name').text(user.name);
        $('#username').text('@'+user.login);

        // Render projects on page
        repos.forEach(function(p){
            if(p.name!='bernzrdo.github.io'){
                if(p.homepage==null){
                    p.homepage = p.html_url + '#readme';
                }
                $('#projects').append('<table url="'+p.homepage+'"><tr><td><img src="icons/'+p.name+'.png"></td><td><span class="title">'+p.name+'</span><span>'+p.description+'</span><span class="time">'+moment(p.created_at).fromNow()+'</span></td></table>');
            }
        });

        // Set correct colors
        $('#profile').css('background-color',color);
        $('#pfp').css('border','5px solid '+textColor);
        $('#name').parent().css('color',textColor);
        if(textColor=='white'){
            $('.social').css('filter','invert(1)');
        }
        $('#projects table').css('background-color',`rgba(${rgb[0]},${rgb[1]},${rgb[2]},.1)`);

        // Display content
        $('#loading').fadeOut();
        var headerSpace = setInterval(function(){
            $('#projects').css('margin-top',$('#profile').height());
            $('#headerSpace').height($('#projects').height());
        });
        $('#projects').fadeIn();
        $('#profile').slideDown(400,'swing',function(){
            clearInterval(headerSpace);
        });

    }
}

// ERROR: Create new element with the error message
function error(msg){
    $('body').prepend('<div id="newError" class="error"><b>ERRO:</b> '+msg+'</div>');
    $('#newError').slideUp(0);
    $('#newError').slideDown();
    $('#newError').removeAttr('id');
}


// --- MAIN ---
$(function(){
    
    // - REDIRECT TO NOW.SH -
    if(location.href.includes('bernzrdo.github.io')){
        location.replace('https://bernzrdo.now.sh/');
    }
    
    // - PAGE COLOR -
    
    // Get random hue
    var hue = Math.random();

    // Hue to RGB
    function hue2rgb(t){
        if(t < 0) t += 1;
        if(t > 1) t -= 1;
        if(t < 1/6) return t*6;
        if(t < 1/2) return 1;
        if(t < 2/3) return (2/3 - t) * 6;
        return 0;
    }
    rgb = [Math.round(hue2rgb(hue + 1/3) * 255), Math.round(hue2rgb(hue) * 255), Math.round(hue2rgb(hue - 1/3) * 255)];

    // RGB to hex
    color = '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);

    // Decide text color based on background
    textColor = (Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000) > 125) ? 'black' : 'white';

    // Set loading color
    $('#loading').css('background-color',color);

    // Draw favicon
    var canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(16, 16, 16, 0, 2 * Math.PI, false);
    context.fillStyle = color;
    context.fill();
    $('head').append('<link type="image/x-icon" rel="shortcut icon" href="'+canvas.toDataURL()+'">');


    // - GET PROJECT & USER INFO -

    // User Info
    $.ajax({
        url: 'https://api.github.com/users/bernzrdo',
        type: 'GET',
        success: function(d){
            user = d;
            document.title = user.name + ' (@' + user.login + ')';
            var img = new Image();
            img.src = d.avatar_url;
            img.onload = start;
        },
        error: function(d) {
            $('#loading').fadeOut();
            error('Falha ao obter informações sobre mim!');
        }
    });

    // Projects
    $.ajax({
        url: 'https://api.github.com/users/bernzrdo/repos',
        type: 'GET',
        success: function(d){ 
            repos = d;
            start();
        },
        error: function(d) {
            $('#loading').fadeOut();
            error('Falha ao obter projetos!');
        }
    });


    // - FAKE LOADING TIME -
    setTimeout(function(){
        canStart = true;
        start();
    },2000);



    // - CLOSE ERROR -
    $('body').on('click','.error',function(){
        $this = $(this);
        $this.slideUp(400,'swing',function(){
            $this.remove();
        });
    });


    // - SOCIAL BUTTONS -

    // Instagram
    $('#instagram').click(function(){
        window.open('https://instagram.com/bernzrdo','_blank');
    });

    // TikTok
    $('#tiktok').click(function(){
        window.open('https://tiktok.com/@bernzrdo','_blank');
    });

    // GitHub
    $('#github').click(function(){
        window.open('https://github.com/bernzrdo','_blank');
    });

    // E-Mail
    $('#email').click(function(){
        window.open('mailto:' + window.atob('YmVybmFyZG92czIwMDNAZ21haWwuY29t'),'_blank');
    });

    // - PROJECT CLICK -
    $('#projects').on('click','table',function(){
        window.open($(this).attr('url'),'_blank');
    });

});
