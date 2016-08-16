(function(){ 'use strict';

/*
|
|   shot
|
*/

var Shot = function()
{
    this.data  = [];
    this.accel = null;
};

/*
|
|   init
|
*/
Shot.prototype.init = function( z )
{
    this.accel = z * 0.01;
};

/*
|
|   launch new shot
|
*/
Shot.prototype.launch = function( d )
{
    var s = {
        x       : d.x,
        y       : d.y - d.r,
        state   : 'active',
        accel   : this.accel,
    };

    this.data.push( s );
};

/*
|
|   animate shots
|
*/
Shot.prototype.animate = function()
{
    this.movement();
    this.processState();
};

/*
|
|   process shot movement
|
*/
Shot.prototype.movement = function()
{
    if ( !this.data[0] )
        return false;

    this.data = this.data.map( _move );
    this.data = this.data.map( _isMiss );
};

/*
|
|   process shot state
|
*/
Shot.prototype.processState = function()
{
    if ( !this.data[0] )
        return false;

    for ( var i = this.data.length - 1; i >= 0; i-- )
        processStateEach( this.data[i], this.data );
};

/*
|
|   set a shots state as 'hit'
|
*/
Shot.prototype.hit = function( i )
{
    this.data[i].state = 'hit';
};

/*
|
|   helper function used in Shot.prototype.movement()
|
*/
var _move = function( i )
{
    i.y = i.y - i.accel;

    return i;
};

/*
|
|   helper function used in Shot.prototype.movement()
|
*/
var _isMiss = function( i )
{
    if ( i.y < 0 )
        i.state = 'miss';

    return i;
};

/*
|
|   helper function used in Shot.prototype.processState()
|
*/
var processStateEach = function( i, data )
{
    if (
        i.state == 'miss' ||
        i.state == 'hit'
    )
        data.splice( i, 1 );
};

window.Shot = Shot;
})();

// EOF
