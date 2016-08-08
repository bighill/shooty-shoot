(function(){ 'use strict';

var ShootyShoot = {

    data    : {},
    shooter : {},
    shot    : {},
    enemy   : {},
};

ShootyShoot.play = function()
{
    State.set( 'shooty-shoot' );

    ShootyShoot.load();
};

/*
|
|
|
*/
ShootyShoot.load = function()
{
    //
    //  global
    //
    this.data = new shshData();
    this.data.init();

    //
    //  keyboard listeners
    //
    key.listen();

    //
    //  shooter
    //
    this.shooter = new Shooter();
    this.shooter.init( this.data.z );

    //
    //  enemies
    //
    this.enemy = new Enemy();
    this.enemy.init( this.data.z, this.data.speed );

    //
    //  shot
    //
    this.shot = new Shot();
    this.shot.init( this.data.z );

    //
    //  score board
    //
    this.score = new Score( this.enemy.data.enemies.length, this.data.els );
    this.drawScoreboard();

    //
    //  draw
    //
    this.data.isPlaying = true;
    this.draw();
};

/*
|
|
|
*/
ShootyShoot.draw = function()
{
    //
    //  canvas
    //
    var ctx = this.data.el.canvas.getContext( '2d' );
    ctx.canvas.width  = this.data.z;
    ctx.canvas.height = this.data.z;
    ctx.clearRect( 0, 0, this.data.z, this.data.z );

    //
    //  draw elements
    //
    view.shooter( this.shooter.v, ctx );
    view.shots( this.shot.data, ctx );
    view.enemies( this.enemy.data.enemies, ctx );

    //
    //  animate data for next frame
    //
    this.animate();
};
ShootyShoot.drawFromRequestAnimationFrame = function()
{
    ShootyShoot.draw();
};

/*
|
|
|
*/
ShootyShoot.animate = function()
{
    //
    //  check for win
    //
    if ( !this.enemy.data.enemies[0] )
        this.win();

    //
    //  shooter actions
    //
    this.shooter.animate( this.data.z );

    if ( this.shooter.isShooting )
        this.shoot();

    //
    //  shots
    //
    this.shot.animate();

    //
    //  enemy movement
    //
    this.enemy.animate();

    //
    //  check for collisions
    //
    var lose = Lose( this.enemy.data.enemies, this.shooter.v );
    if ( lose )
        this.lose();

    var hit = Hit( this.enemy.data.enemies, this.shot.data );
    if ( hit )
        this.hit( hit );

    //
    //  draw next frame
    //
    if ( this.data.isPlaying )
        window.requestAnimationFrame( this.drawFromRequestAnimationFrame );
};

/*
|
|   process keyboard events
|
*/
ShootyShoot.keyLeft = function( bool )
{
    this.shooter.isMovingLeft = bool;    
};
ShootyShoot.keyRight = function( bool )
{
    this.shooter.isMovingRight = bool;
};
ShootyShoot.keyShoot = function( bool )
{
    this.shooter.isShooting = bool;
};

/*
|
|   process a shot
|
*/
ShootyShoot.shoot = function()
{
    //
    //  shot delay
    //
    if ( this.shooter.delayShot )
        return false;

    this.engageDelay();

    //
    //  shooter
    //
    this.shooter.setShotOpacity();

    //
    //  shot
    //
    this.shot.launch( this.shooter.v );

    //
    //  score board
    //
    this.score.shot();
};

/*
|
|   engage shot delay
|
|   ...delay shots a bit, no need to shoot on every frame
|
*/
ShootyShoot.engageDelay = function()
{
    this.shooter.delayShot = true;
    window.setTimeout( this.releaseDelay, 300);
};

/*
|
|   release shot delay
|
*/
ShootyShoot.releaseDelay = function()
{
    ShootyShoot.shooter.delayShot = false;
};

/*
|
|   scoreboard
|
*/
ShootyShoot.drawScoreboard = function()
{
    ShootyShoot.score.draw();

    window.setTimeout( function() { ShootyShoot.drawScoreboard(); }, 500);
};

/*
|
|   hit
|
*/
ShootyShoot.hit = function( items )
{
    this.enemy.hit( items.enemy );
    this.shot .hit( items.shot  );
    this.score.hit();
};

/*
|
|   lose
|
*/
ShootyShoot.lose = function()
{
    this.data.isPlaying = false;
    State.set( 'lose' );
};

/*
|
|   win
|
*/
ShootyShoot.win = function()
{
    this.data.isPlaying = false;
    State.set( 'win' );
};

/*
|
|
|
*/
window.ShootyShoot = ShootyShoot;
})();

// EOF
