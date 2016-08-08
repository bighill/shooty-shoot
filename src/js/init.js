(function(){ 'use strict';

/*
|
|   init
|
*/

var init = function()
{
    playBtnListeners();

    State.set( 'home' );

    document.removeEventListener( "DOMContentLoaded", init );
};
document.addEventListener( 'DOMContentLoaded', init );

/*
|
|
|
*/
var playBtnListeners = function()
{
    var btns = document.getElementsByClassName( 'play-btn' );

    for ( var i = btns.length - 1; i >= 0; i-- )
        btns[i].addEventListener( 'click', ShootyShoot.play );
};

})();

// EOF
