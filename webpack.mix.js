const mix = require('laravel-mix');
const fs = require('fs');

function getFiles(dir){

    let res = [];

    for(let item of fs.readdirSync(dir)){
        if(item.startsWith('_')) continue;
        
        if(fs.statSync(`${dir}/${item}`).isDirectory()){
            res = res.concat(getFiles(`${dir}/${item}`));
        }else{
            res.push(`${dir}/${item}`);
        }

    }

    return res;
}

mix.disableSuccessNotifications();

for(let scss of getFiles('resources/scss'))
    mix.sass(scss, scss.replace('resources/scss/', 'docs/css/').replace('.scss', '.css'));

for(let js of getFiles('resources/js'))
    mix.js(js, js.replace('resources/js/', 'docs/js/'));
