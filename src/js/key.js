(function(){ 'use strict';

var key = {

    listen : function()
    {
        window.addEventListener( 'keydown', key.keyDown );
        window.addEventListener( 'keyup', key.keyUp );
    }
};

key.keyDown = function( ev )
{
    //
    //  left key
    //
    if ( ev.keyCode == 37 )
        ShootyShoot.keyLeft( true );

    //
    // right key
    //
    if ( ev.keyCode == 39 )
        ShootyShoot.keyRight( true );

    //
    // ctrl & space keys
    //
    if ( ev.keyCode == 17 || ev.keyCode == 32 )
        ShootyShoot.keyShoot( true );
};

key.keyUp = function( ev )
{
    //
    //  left key
    //
    if ( ev.keyCode == 37 )
        ShootyShoot.keyLeft( false );

    //
    // right key
    //
    if ( ev.keyCode == 39 )
        ShootyShoot.keyRight( false );

    //
    // ctrl & space keys
    //
    if ( ev.keyCode == 17 || ev.keyCode == 32 )
        ShootyShoot.keyShoot( false );
};

window.key = key;
})();

// EOF
