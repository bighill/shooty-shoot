(function(){ 'use strict';

/*
|
|   global
|
|   ...main object for controlling the game
|
*/

var G = {

    //
    //  global game speed
    //
    speed : 0.3,

    // 
    // values
    //
    isPlaying   : false,
    z           : 0,
    top         : 0,
    left        : 0,

    //
    //  elements
    //
    el : {
        game    : document.getElementById( 'shooty-shoot' ),
        score   : document.getElementById( 'score' ),
        canvas  : document.getElementById( 'shooty-shoot-canvas' ),
        home    : document.getElementById( 'home' ),
        lose    : document.getElementById( 'lose' ),
        win     : document.getElementById( 'win' ),
    },
    els : {
        playBtns : document.getElementsByClassName( 'play-btn'),
        shots    : document.getElementsByClassName( 'shots' ),
        hits     : document.getElementsByClassName( 'hits' ),
        accuracy : document.getElementsByClassName( 'accuracy' ), 
    },
};

/*
|
|   init
|
*/
G.init = function()
{
    //
    //  set 'z' value
    //  ... which represents both width and height of canvas
    //
    setTimeout( this.setZ, 0 );

    //
    //  initialize the shooter
    //
    setTimeout( Shooter.init, 0 );

    //
    //  set enemy defaults
    //
    setTimeout( Enemy.init, 0 );
};

/*
|
|   set z
|
*/
G.setZ = function()
{
    G.z = G.el.canvas.offsetWidth;
};

/*
|
|   draw canvas
|
|   ...the primary controller for drawing to canvas
|
*/
G.drawCanvas = function()
{
    var ctx = G.el.canvas.getContext( '2d' );

    ctx.canvas.width  = G.z;
    ctx.canvas.height = G.z;

    ctx.clearRect( 0, 0, G.z, G.z ); // clear canvas

    //
    //  check for all possible collisions
    //
    //Collision.check();

    //
    //  draw the elements
    //
    Enemy.draw( ctx );
    Shooter.draw( ctx );
    Shot.draw( ctx );

    //
    //  draw next frame
    //
    if ( G.isPlaying )
        window.requestAnimationFrame( G.drawCanvas );
};

/*
|
|   play
|
|   ...do all the things needed to start the game
|
*/
G.play = function()
{
    G.init();
    G.isPlaying = true;
    window.requestAnimationFrame( G.drawCanvas );
    State.set( 'shooty-shoot' );
    Score.init();
};

/*
|
|   win
|
|   ...do all the things needed the game has been won
|
*/
G.win = function()
{
};

/*
|
|   lose
|
|   ...do all the things needed the game has been lost
|
*/
G.lose = function()
{
};

window.G = G;

})();

// EOF
