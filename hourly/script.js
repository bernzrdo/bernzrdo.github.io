$(()=>{

    const music = new Audio();
    music.loop = true;

    // Load weather images
    var img = new Image();
    img.src = 'rainy.png';
    img.onload = ()=>img.src = 'snowy.png';

    // Unmute
    var started = false;
    $(document).one('click',()=>{
        started = true;
        $('#info.off, #island').removeClass('off');
        $('#unmute').addClass('off');
        setInterval(updateClock,1e3);
        updateClock();
    });

    // Clock
    function updateClock(){
        const now = new Date();

        var hours = now.getHours();
        var minutes = now.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        $('#clock').text(`${hours}:${minutes} ${ampm}`);

        $('#progress > div').width((now.getMinutes() + now.getSeconds() / 60) * $('#progress').width() / 60);
        
        if(musicHour != now.getHours()) play();
    }

    // Weather
    var weather = 'sunny';
    var changeTimeout;
    $('#weather').click(()=>{
        $('#weather').removeClass(weather);
        switch(weather){
            case 'sunny':weather='rainy';break;
            case 'rainy':weather='snowy';break;
            case 'snowy':weather='sunny';break;
        }
        $('#weather').addClass(weather);
        clearTimeout(changeTimeout);
        changeTimeout = setTimeout(()=>{
            var time = music.currentTime;
            music.src = `music/${musicHour}_${weather}.mp3`;
            music.currentTime = time;
            music.play();
        },1e3);
    });

    // Play
    var musicHour;
    function play(){
        musicHour = new Date().getHours();
        music.src = `music/${musicHour}_${weather}.mp3`;
        music.currentTime = 0;
        music.play();
    }

    // Fade info
    $(document).mousemove(e=>{
        if(!started) return;
        if((e.pageX+1 == innerWidth || e.pageY+1 == innerHeight) && window.innerWidth == screen.width && window.innerHeight == screen.height) $('#info').addClass('off');
        else $('#info.off').removeClass('off');
    });

});