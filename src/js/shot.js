(function(){ 'use strict';

var Shot = function()
{
    this.data  = [];
    this.accel = null;
};

Shot.prototype.init = function( z )
{
    this.accel = z * 0.01;
};

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

Shot.prototype.animate = function()
{
    this.movement();
    this.processState();
};

Shot.prototype.movement = function()
{
    if ( !this.data[0] )
        return false;

    this.data = this.data.map( _move );
    this.data = this.data.map( _isMiss );
};

var _move = function( i )
{
    i.y = i.y - i.accel;

    return i;
};

var _isMiss = function( i )
{
    if ( i.y < 0 )
        i.state = 'miss';

    return i;
};

Shot.prototype.processState = function()
{
    if ( !this.data[0] )
        return false;

    for ( var i = this.data.length - 1; i >= 0; i-- )
        processStateEach( this.data[i], this.data );
};

var processStateEach = function( i, data )
{
    if (
        i.state == 'miss' ||
        i.state == 'hit'
    )
        data.splice( i, 1 );
};

Shot.prototype.hit = function( i )
{
    this.data[i].state = 'hit';
};

window.Shot = Shot;
})();

// EOF
