(function(){ 'use strict';

/*
|
|   init
|
*/

var init = function()
{
    touchScreen();

    playBtnListeners();

    State.set( 'home' );

    document.removeEventListener( "DOMContentLoaded", init );
};
document.addEventListener( 'DOMContentLoaded', init );

/*
|
|   enable play buttons
|
*/
var playBtnListeners = function()
{
    var btns = document.getElementsByClassName( 'play-btn' );

    for ( var i = btns.length - 1; i >= 0; i-- )
        btns[i].addEventListener( 'click', ShootyShoot.play );
};

/*
|
|   touch screen notification
|
*/
var touchScreen = function()
{
    if ( isTouchScreen() )
        alert( 'looks like you have a touch screen device.  this game will probably not work for you.  a regular keyboard is needed.' );
};

/*
|
|   check for touch screen device
|
*/
var isTouchScreen = function()
{
    return (
        ('ontouchstart' in window)      ||
        (navigator.MaxTouchPoints > 0)  ||
        (navigator.msMaxTouchPoints > 0)
    );
};

})();

// EOF
