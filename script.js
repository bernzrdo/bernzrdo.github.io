(function(){

    // Age Calculate

    const PT = location.pathname.includes('pt');

    const now = new Date();
    const birthday = new Date(now.getFullYear(), 7, 23);

    var age = now.getFullYear() - 2003;
    if(birthday.getTime() > now.getTime()) age--;

    document.querySelector('.age').innerHTML += ` (${age} ${PT ? 'anos' : 'years old'})`;

})();
