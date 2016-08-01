(function(){ 'use strict';

/*
|
|   shooter
|
|   ...brrap brrap pew pew
|
*/

var Shooter = {

    //
    // multipliers
    //
    wMultp      : 0.05,
    moveMultp   : 0.01,

    //
    //  values set by this.init()
    //
    x : 0,
    y : 0,
    r : 0,

    //
    //  opacity
    //
    defaultOpacity  : 0.5,
    shootOpacity    : 0.7,
    currentOpacity  : 0.5,

    //
    // actions
    //
    moveLeft    : false,
    moveRight   : false,
    shooting    : false,
    delayShot   : false,
};

/*
|
|   init
|
|   ...set values and add listeners
|
*/
Shooter.init = function()
{
    var self = Shooter;

    self.r = G.z * self.wMultp;
    self.x = ( G.z / 2 );
    self.y = G.z - self.r - 1;

    window.addEventListener( 'keydown', self.keyPress );
    window.addEventListener( 'keyup', self.keyRelease );
};

/*
|
|   draw
|
|   ...analyze the state of things, adjust as needed, then draw
|
*/
Shooter.draw = function( ctx )
{
    //
    //  prepare to draw
    //
    ctx.beginPath();
    ctx.fillStyle = 'rgba( 126, 192, 238, '+this.currentOpacity+' )';

    //
    //  analyze actions
    //
    if ( this.moveLeft )
        this.left();

    if ( this.moveRight )
        this.right();

    if ( this.shooting )
        this.shoot( ctx );

    if ( this.currentOpacity > this.defaultOpacity )
        this.currentOpacity = this.currentOpacity - 0.01;

    //
    //  draw
    //
    ctx.arc( this.x, this.y, this.r, 0, 2 * Math.PI );
    ctx.fill();
};

/*
|
|   key press
|
*/
Shooter.keyPress = function( ev )
{
    //
    //  left key
    //
    if ( ev.keyCode == 37 )
        Shooter.moveLeft = true;

    //
    // right key
    //
    if ( ev.keyCode == 39 )
        Shooter.moveRight = true;

    //
    // ctrl & space keys
    //
    if ( ev.keyCode == 17 || ev.keyCode == 32 )
        Shooter.shooting = true;
};

/*
|
|   key release
|
*/
Shooter.keyRelease = function( ev )
{
    //
    //  left key
    //
    if ( ev.keyCode == 37 )
        Shooter.moveLeft = false;

    //
    // right key
    //
    if ( ev.keyCode == 39 )
        Shooter.moveRight = false;

    //
    // ctrl & space keys
    //
    if ( ev.keyCode == 17 || ev.keyCode == 32 )
        Shooter.shooting = false;
};

/*
|
|   left
|
|   ...move shooter
|
*/
Shooter.left = function()
{
    var newX = this.x - ( G.z * this.moveMultp );

    if ( newX - this.r >= 1 )
        this.x = newX ;
};

/*
|
|   right
|
|   ...move shooter
|
*/
Shooter.right = function()
{
    var newX = this.x + ( G.z * this.moveMultp );

    if ( newX + this.r <= G.z - 1 )
        this.x = newX;
};

/*
|
|   shoot
|
*/
Shooter.shoot = function( ctx )
{
    if ( this.delayShot )
        return false;

    this.engageDelay();

    this.currentOpacity = this.shootOpacity;
    Shot.launch( this.x, this.y - this.r );
};

/*
|
|   engage delay
|
|   ...delay shots a bit, no need to shoot on every frame
|
*/
Shooter.engageDelay = function()
{
    this.delayShot = true;
    window.setTimeout( this.releaseDelay, 300);
};

/*
|
|   release delay
|
*/
Shooter.releaseDelay = function()
{        
    Shooter.delayShot = false;
};

/*
|
|   a gift for window
|
*/
window.Shooter = Shooter;

})();

// EOF
