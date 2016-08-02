(function(){ 'use strict';

/*
|
|   home
|
|   ...
|
*/

var Home = {

    //
    //
    //
    addListeners : function()
    {
        window.addEventListener( 'keydown', Home.keyDown );
        window.addEventListener( 'keyup', Home.keyUp );
        G.el.homePlayBtn.addEventListener( 'mouseover', Home.playHover );
        G.el.homePlayBtn.addEventListener( 'mouseout', Home.playUnHover );
    },

    //
    //
    //
    removeListeners : function()
    {
        window.removeEventListener( 'keydown', Home.keyDown );
        window.removeEventListener( 'keyup', Home.keyUp );
        G.el.homePlayBtn.removeEventListener( 'mouseover', Home.playHover );
        G.el.homePlayBtn.removeEventListener( 'mouseout', Home.playUnHover );
    },
};

/*
|
|   key press
|
*/
Home.keyDown = function( ev )
{
    //
    //  left key
    //
    if ( ev.keyCode == 37 )
        Home.keyInstructions( 'press', G.els.keyLeft );

    //
    // right key
    //
    if ( ev.keyCode == 39 )
        Home.keyInstructions( 'press', G.els.keyRight );

    //
    // ctrl & space keys
    //
    if ( ev.keyCode == 17 || ev.keyCode == 32 )
        Home.keyInstructions( 'press', G.els.keyShoot );
};

/*
|
|   key release
|
*/
Home.keyUp = function( ev )
{
    //
    //  left key
    //
    if ( ev.keyCode == 37 )
        Home.keyInstructions( 'release', G.els.keyLeft );

    //
    // right key
    //
    if ( ev.keyCode == 39 )
        Home.keyInstructions( 'release', G.els.keyRight );

    //
    // ctrl & space keys
    //
    if ( ev.keyCode == 17 || ev.keyCode == 32 )
        Home.keyInstructions( 'release', G.els.keyShoot );
};

/*
|
|
|
*/
Home.keyInstructions = function( action, els )
{
    if ( action == 'press' )
    {
        _(els).forEach(function( el )
        {
            el.classList.add( 'highlight' );
        });
    }
    else
    {
        _(els).forEach(function( el )
        {
            el.classList.remove( 'highlight' );
        });
    }
};

/*
|
|
|
*/
Home.playHover = function()
{
    G.el.homeH1.classList.add( 'home-h1-highlight' );
};

/*
|
|
|
*/
Home.playUnHover = function()
{
    G.el.homeH1.classList.remove( 'home-h1-highlight' );
};

/*
|
|   a gift for window
|
*/
window.Home = Home;    

})();

// EOF