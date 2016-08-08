(function(){ 'use strict';

/*
|
|   shooter
|
*/

var Shooter = function()
{
    //
    //  data for the view
    //
    this.v = {

        x : null,
        y : null,
        r : null,

        defaultOpacity  : 0.5,
        shootOpacity    : 0.7,
        currentOpacity  : null,
    };

    //
    // multipliers
    //
    this.wMultp      = 0.05;
    this.moveMultp   = 0.01;

    //
    // actions
    //
    this.isMovingLeft    = false;
    this.isMovingRight   = false;
    this.isShooting    = false;
    this.delayShot   = false;
};

Shooter.prototype.init = function( z )
{
    this.v.r = z * this.wMultp;
    this.v.x = ( z / 2 );
    this.v.y = z - this.v.r - 1;

    this.v.currentOpacity = this.v.defaultOpacity;
};

Shooter.prototype.animate = function( z )
{
    var stall = this.isLeftRightStall();

    if ( this.isMovingLeft && !stall )
        this.moveLeft( z );

    if ( this.isMovingRight && !stall )
        this.moveRight( z );

    this.fadingOpacity();
};

Shooter.prototype.moveLeft = function( z )
{
    var x0  = this.v.x,
        r   = this.v.r,
        m   = this.moveMultp,
        x1  = x0 - ( z * m );

    if ( x1 - r >= 1 )
        this.v.x = x1;
};

Shooter.prototype.moveRight = function( z )
{
    var x0  = this.v.x,
        r   = this.v.r,
        m   = this.moveMultp,
        x1  = x0 + ( z * m );

    if ( x1 + r <= z - 1 )
        this.v.x = x1;
};

Shooter.prototype.isLeftRightStall = function()
{
    return this.isMovingLeft && this.isMovingRight;
};

Shooter.prototype.setShotOpacity = function()
{
    this.v.currentOpacity = this.v.shootOpacity;
};

Shooter.prototype.fadingOpacity = function()
{
    if ( this.v.currentOpacity > this.v.defaultOpacity )
        this.v.currentOpacity = this.v.currentOpacity - 0.01;
};



window.Shooter = Shooter;
})();

// EOF
