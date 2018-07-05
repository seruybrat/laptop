(function () {

    const OUTPUT = document.querySelector('.monitor__front'),
          KEYS = document.querySelectorAll('.key'),
          TOUCHPAD = document.querySelector('.keyboard__touchpad');
    
    function insertText(e) {
        OUTPUT.innerHTML = e.target.innerHTML;
    }

    function keysAnimation() {
        OUTPUT.innerHTML = 'OMG 0_o';
        
        for(let i =0; i<KEYS.length; i++) {
            KEYS[i].style.animationDelay = Math.random()*2 + 's';
            KEYS[i].classList.toggle('active'); 
        }
    }

    // key click
    for(let i =0; i<KEYS.length; i++) {
        KEYS[i].addEventListener('click', insertText);
    }

    // touchpad click
    TOUCHPAD.addEventListener('click', keysAnimation);

})();