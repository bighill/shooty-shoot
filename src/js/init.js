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
    _playBtnListeners( G.els.playBtns );

    //
    //  keys instructions listeners for home pane
    //
    Home.addListeners();

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
var _playBtnListeners = function( btns )
{
    _(btns).forEach(function( btn )
    {
        btn.addEventListener( 'click', G.play );
    });
};

/*
|
|   hello browser.  please accept this code.  thx!
|
*/
document.addEventListener( 'DOMContentLoaded', init );

})();

// EOF
