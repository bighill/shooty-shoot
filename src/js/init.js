(function(){ 'use strict';

/*
|
|   get the party started
|
*/
var init = function()
{
    //
    //  if window is resized, just reload and start over
    //
    window.addEventListener( 'resize', U.reload );

    //
    //  button listeners
    //
    playBtnListeners( G.els.playBtns );

    //
    //  display home pane
    //
    State.set( 'home' );

    //
    //  init() is complete
    //  cleanup the DOMContentLoaded listener
    //
    document.removeEventListener( "DOMContentLoaded", init );
};

/*
|
|   listeners for buttons outside of the game
|
*/
var playBtnListeners = function( btns )
{
    for ( var i = btns.length - 1; i >= 0; i-- )
        btns[i].addEventListener( 'click', G.play );
};

/*
|
|   hello browser.  please accept this code.  thx!
|
*/
document.addEventListener( 'DOMContentLoaded', init );

})();

// EOF
