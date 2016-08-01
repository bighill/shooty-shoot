(function(){ 'use strict';

/*
|
|   shot
|
|   ...our shots/projectiles that will hurled at enemies
|
*/

var Shot = {
    data : [],
};

/*
|
|   launch
|
|   ...initialize a shot
|
*/
Shot.launch = function( x, y )
{
    var shot = {
        x : x,
        y : y,
        state : 'active',
    };

    this.data.push( shot );

    //
    //  notifiy score board
    //
    Score.shot();
};

/*
|
|   draw
|
|   ...draw current shots
|
*/
Shot.draw = function( ctx )
{
    if ( !this.data[0] )
        return false;

    for ( var i = this.data.length - 1; i >= 0; i-- )
        _drawEach( this.data[i], i, this.data, ctx );
};

/*
|
|   draw each
|
|   ...analyze current state of each shot and draw appropriately
|
*/
var _drawEach = function( shot, i, data, ctx )
{
    shot.y     = shot.y - ( G.z * 0.01 );
    shot.state = _isMiss( shot );

    if ( shot.state == 'active' )
        _drawShot( ctx, shot );

    else if ( shot.state == 'miss' )
        _deactivate( i, data );

    else if ( shot.state == 'hit' )
        _deactivate( i, data );

    else
        _deactivate( i, data );
};

/*
|
|   is miss
|
|   ...look for misses
|
*/
var _isMiss = function( shot )
{
    if ( shot.y < 0 )
        return 'miss';

    return shot.state;
};

/*
|
|   draw shot
|
|   ...draw shot on the canvas
|
*/
var _drawShot = function( ctx, shot )
{
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect( shot.x, shot.y, 5, 5 );
    ctx.fill();
};

/*
|
|   deactivate
|
|   ...shot goes away when either hits or misses enemies
|
*/
var _deactivate = function( i, data )
{
    data.splice( i, 1 );
};

/*
|
|   a gift for window
|
*/
window.Shot = Shot;

})();

// EOF
