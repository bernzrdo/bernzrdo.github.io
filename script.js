
var repos = [];
var reposURL = {};
$(()=>{
    
    // Variables
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay();
    const version = `${month+day>823?year-2003:year-2004}.${((month+4)%12).toString().padStart(2,'0')}.${((day+8)%31).toString().padStart(2,'0')}`;
    const serial = `${Math.floor(Math.random()*65536).toString(16).toUpperCase()}-${Math.floor(Math.random()*65536).toString(16).toUpperCase()}`
    const $terminal = $('#terminal');
    var commandHistoryPos = 0;
    var commandHistory = [];

    // Get repositories
    $.get('https://api.github.com/users/bernzrdo/repos',r=>r.forEach(e=>{
        if(e.full_name!='bernzrdo/bernzrdo.github.io'){
            var id = e.full_name.replace('bernzrdo/','');
            repos.push(id);
            reposURL[id] = e.homepage?e.homepage:`${e.html_url}#readme`;
        }
    }));

    // Start terminal
    $terminal.html(`bernzrdo ${version}<br>Type 'help' to get help.<br><br>C:\\><input>`);
    $('input').focus();

    // Always focus to input
    $(document).click(()=>$('input').focus());

    // Auto-size input
    $(document).on('input','input',e=>{
        $('#widthtest').text(e.target.value.replace(/ /g,'&nbsp;'));
        $(e.target).width($('#widthtest').width())
    });

    // Command handling
    $(document).on('keydown','input',function(e){
        
        // History handling
        if(e.key=='ArrowUp'&&commandHistoryPos<commandHistory.length-1){
            commandHistoryPos++;
            $('input').val(commandHistory[commandHistoryPos]);
            $('input').trigger('input');
        }
        if(e.key=='ArrowDown'&&commandHistoryPos>0){
            commandHistoryPos--;
            $('input').val(commandHistory[commandHistoryPos]);
            $('input').trigger('input');
        }

        // Auto-complete
        if(e.key=='Tab'){
            e.preventDefault();
            var complete,value=$(this).val();
            repos.forEach(r=>{
                if(r.startsWith(value)&&!complete) complete = r;
            });
            if(complete) $(this).val(`${complete}.exe`);
            $(this).trigger('input');
        }

        // Ignore not hitting enter
        if(e.key!='Enter') return;

        // Get command
        var command = $(this).val().trim();
        var lc = command.toLowerCase();
        $(this).remove();
        $terminal.append(`${command}<br>`);

        // History handling
        commandHistory.shift()
        commandHistory.unshift('',command);
        commandHistoryPos = 0;
        
        // Default error message
        var result = `'${command.split(' ')[0]}' is not recognized as an internal or external command, operable program or batch file.<br><br>`;

        // Empty
        if(command=='') result = '';

        // CLS
        if(lc=='cls'||lc.startsWith('cls ')){
            $terminal.html('');
            result = '';
        }

        // CMD
        if(lc=='cmd'||lc.startsWith('cmd ')) result = `bernzrdo ${version}<br>Type 'help' to get help.<br><br>`;

        // COLOR
        if(lc=='color'||lc.startsWith('color ')){
            result = '<br>';
            if(lc=='color') $('#color').html('body{background-color:#000;color:#fff}input{color:#fff}');
            else if(lc.substr(6).length==2&&/[0-9A-Fa-f]{2}/g.test(lc.substr(6))) $('#color').html(`body{background-color:#${lc[6]}${lc[6]}${lc[6]};color:#${lc[7]}${lc[7]}${lc[7]}}input{color:#${lc[7]}${lc[7]}${lc[7]}}`);
            else result = 'Sets the console foreground and background colors.<br><br>COLOR [bg][fg]<br><br>  bg   Hex background color<br>  fg   Hex foreground color<br><br>    0 = Black       8 = Gray<br>    1 = Blue        9 = Light Blue<br>    2 = Green       A = Light Green<br>    3 = Aqua        B = Light Aqua<br>    4 = Red         C = Light Red<br>    5 = Purple      D = Light Purple<br>    6 = Yellow      E = Light Yellow<br>    7 = White       F = Bright White<br><br>If no argument is given, this command restores the color to default.<br><br>Example: "COLOR fc" produces light red on bright white<br><br>';
        }

        // DATE
        if(lc=='date'||lc.startsWith('date ')) result = `The current date is: ${new Date().toDateString()}<br><br>`

        // DIR
        if(lc=='dir'||lc.startsWith('dir ')){
            result = ` Volume in drive C is OS<br> Volume Serial Number is ${serial}<br><br> Directory of C:\\<br><br>`;
            result += `${now.toLocaleString().replace(',','')}           ${Math.floor(Math.random()*2e3).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',').padStart(5,' ')} me.bat`;
            repos.forEach(r=>{
                result += `<br>${now.toLocaleString().replace(',','')}           ${Math.floor(Math.random()*2e3).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',').padStart(5,' ')} ${r}.exe`;
            });
            result += `<br>               ${repos.length+1} File(s)      ${Math.floor(Math.random()*1e5).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',').padStart(6,' ')} bytes<br>               0 Dir(s)  ${Math.floor(Math.random()*1e9).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',').padStart(11,' ')} bytes free<br><br>`;
        }

        // ECHO
        if(lc=='echo') result = 'ECHO is on.<br><br>';
        if(lc.startsWith('echo ')) result = `${command.substr(5)}<br><br>`;

        // EXIT
        if(lc=='exit'||lc.startsWith('exit ')){
            $('#terminal').addClass('off');
            setTimeout(()=>{
                $('#nosignal').show();
                var canvas = $('#nosignal canvas')[0];
                var context = canvas.getContext('2d');
                var imageData = context.createImageData(canvas.width*1,canvas.height*1);
                (function loop(){
                    for(var i=0;i<imageData.data.length;i++) imageData.data[i] = (Math.random()*256)|0;
                    context.putImageData(imageData,0,0);
                    requestAnimationFrame(loop);
                })();
            },1e3);
            result = '';
        }

        // HELP
        if(lc=='help') result = 'For more information on a specific command, type HELP command-name<br>CLS     Clears the screen.<br>CMD     Starts a new instance of BERNZRDO.EXE.<br>COLOR   Sets the console foreground and background colors.<br>DATE    Displays the date.<br>DIR     Displays a list of files in a directory.<br>ECHO    Displays messages.<br>EXIT    Quits BERNZRDO.EXE.<br>HELP    Provides Help information for commands.<br>TIME    Displays the time.<br>TITLE   Sets the window title.<br>VER     Displays the current version.<br><br>For more information on tools see the command-line reference in the online help.<br><br>';
        if(lc.startsWith('help ')){
            result = 'This command is not supported by the help utility.';
            lc = lc.substr(5);
            if(lc=='cls') result = 'Clears the screen.<br><br>CLS<br><br>';
            if(lc=='cmd') result = 'Starts a new instance of BERNZRDO.EXE.<br><br>CMD<br><br>';
            if(lc=='color') result = 'Sets the console foreground and background colors.<br><br>COLOR [bg][fg]<br><br>  bg   Hex background color<br>  fg   Hex foreground color<br><br>    0 = Black       8 = Gray<br>    1 = Blue        9 = Light Blue<br>    2 = Green       A = Light Green<br>    3 = Aqua        B = Light Aqua<br>    4 = Red         C = Light Red<br>    5 = Purple      D = Light Purple<br>    6 = Yellow      E = Light Yellow<br>    7 = White       F = Bright White<br><br>If no argument is given, this command restores the color to default.<br><br>Example: "COLOR fc" produces light red on bright white<br><br>';
            if(lc=='date') result = 'Displays the date.<br><br>DATE<br><br>';
            if(lc=='dir') result = 'Displays a list of files in a directory.<br><br>DIR<br><br>';
            if(lc=='echo') result = 'Displays messages.<br><br>ECHO [message]<br><br>';
            if(lc=='exit') result = 'Quits BERNZRDO.EXE.<br><br>EXIT<br><br>';
            if(lc=='help') result = 'Provides Help information for commands.<br><br>HELP [command]<br><br>    command - displays help information on that command.<br><br>';
            if(lc=='time') result = 'Displays the time.<br><br>TIME<br><br>';
            if(lc=='title') result = 'Sets the window title.<br><br>TITLE [string]<br><br>  string       Specifies the title for the command prompt window.<br><br>';
            if(lc=='ver') result = 'Displays the current version.<br><br>VER<br><br>';
            lc = '';
        }

        // TIME
        if(lc=='time'||lc.startsWith('time ')) result = `The current time is: ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.${new Date().getMilliseconds()}<br><br>`;

        // TITLE
        if(lc=='title'||lc.startsWith('title ')){
            result = '<br>';
            if(lc.substr(6)) document.title = command.substr(6);
        }

        // VER
        if(lc=='ver'||lc.startsWith('ver ')) result = `bernzrdo ${version}<br><br>`;

        // me.bat
        if(lc.split(' ')[0]=='me.bat'||lc.split(' ')[0]=='me'){
            result = `<br>              * + ~ - ABOUT ME - ~ + *<br><br>   hi! my name is bernardo silva, i'm ${version.split('.')[0]} years old,<br>   and i LOVE to code and do web design. i know lots<br>   of languages but my favorite one is definitely<br>   JAVASCRIPT! thank you for vising my website! :)<br><br>      github : <a§href="https://github.com/bernzrdo"§target="_black">bernzrdo</a><br>   instagram : <a§href="https://instagram.com/bernzrdo"§target="_black">@bernzrdo</a><br>      e-mail : <a§href="mailto:bernardovs2003@gmail.com"§target="_blank">bernardovs2003@gmail.com</a><br><br>`
        }

        if(repos.includes(lc.replace('.exe','').split(' ')[0])){
            open(reposURL[lc.replace('.exe','').split(' ')[0]],'_blank');
            result = '<br>';
        }

        // Show result
        $terminal.append(`${result.replace(/ /g,'&nbsp;').replace(/§/g,' ')}C:\\><input>`);
        $('input').focus();

    });

});