if(location.host=='bernzrdo.github.io') location.href = 'https://bernzrdo.now.sh';
$(()=>{

    if(location.host=='bernzrdo.github.io') return;
    $('body').show();
    
    $('#me').click(function(){
        if($(this).hasClass('blur')){
            $('#reveal').fadeOut(300,'swing',()=>$('#reveal').remove());
            $(this).removeClass('blur');
            play();
            setTimeout(()=>$('#nowplaying').show(),300);
            setTimeout(()=>{
                $('#nowplaying').addClass('show');
                setTimeout(()=>$('#nowplaying').removeClass('show'),5e3);
            },350);
        }else open('https://github.com/bernzrdo');
    });

    $('#me').mouseleave(function(){
        if(!$(this).hasClass('blur')) $('#me').addClass('hover');
    });

    const music = new Audio();
    music.onended = play;
    music.ontimeupdate = ()=>$('#progress').width(music.currentTime*innerWidth/music.duration);

    var playlist = ['01 - K.K. Chorale','02 - K.K. March','03 - K.K. Waltz','04 - K.K. Swing','05 - K.K. Jazz','06 - K.K. Fusion','07 - K.K. Étude','08 - K.K. Lullaby','09 - K.K. Aria','10 - K.K. Samba','11 - K.K. Bossa','12 - K.K. Calypso','13 - K.K. Salsa','14 - K.K. Mambo','15 - K.K. Reggae','16 - K.K. Ska','17 - K.K. Tango','18 - K.K. Faire','19 - Aloha K.K.','20 - Lucky K.K.','21 - K.K. Condor','22 - K.K. Steppe','23 - Imperial K.K.','24 - K.K. Casbah','25 - K.K. Safari','26 - K.K. Folk','27 - K.K. Rock','28 - Rockin\' K.K.','29 - K.K. Ragtime','30 - K.K. Gumbo','31 - The K. Funk','32 - K.K. Blues','33 - Soulful K.K.','34 - K.K. Soul','35 - K.K. Cruisin\'','36 - K.K. Love Song','37 - K.K. D&B','38 - K.K. Technopop','39 - DJ K.K.','40 - Only Me','41 - K.K. Country','42 - Surfin\' K.K.','43 - K.K. Ballad','44 - Comrade K.K.','45 - K.K. Lament','46 - Go K.K. Rider','47 - K.K. Dirge','48 - K.K. Western','49 - Mr. K.K.','50 - Café K.K.','51 - K.K. Parade','52 - K.K. Mariachi','53 - K.K. Song','54 - I Love You','55 - Two Days Ago','56 - My Place','57 - Forest Life','58 - To the Edge','59 - Pondering','60 - K.K. Dixie','61 - K.K. Marathon','62 - King K.K.','63 - Mountain Song','64 - Marine Song 2001','65 - Neapolitan','66 - Steep Hill','67 - K.K. Rockabilly','68 - Agent K.K.','69 - K.K. Rally','70 - K.K. Metal','71 - Stale Cupcakes','72 - Spring Blossoms','73 - Wandering','74 - K.K. House','75 - K.K. Sonata','76 - Hypno K.K.','77 - K.K. Stroll','78 - K.K. Island','79 - Space K.K.','80 - K.K. Adventure','81 - K.K. Oasis','82 - K.K. Bazaar','83 - K.K. Milonga','84 - K.K. Groove','85 - K.K. Jongara','86 - K.K. Flamenco','87 - K.K. Moody','88 - Bubblegum K.K.','89 - K.K. Synth','90 - K.K. Disco','91 - K.K. Birthday','92 - Animal City','93 - Drivin\'','94 - Farewell','95 - Welcome Horizons'];
    playlist.sort(()=>Math.random()-.5);

    var i = 0,first = true;
    function play(){
        music.src = `music/${playlist[i]}.mp3`;
        music.currentTime = 0;
        music.play();
        $('#nowplaying span:first-child').text(playlist[i].substr(5));
        i++;
        if(i==95) i=0;
        if(first){
            first = false;
            return;
        }
        $('#nowplaying').addClass('show');
        setTimeout(()=>$('#nowplaying').removeClass('show'),5e3);
    }

});