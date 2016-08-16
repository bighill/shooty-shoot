(function(){ 'use strict';

/*
|
|   views
|
|   ...canvas templates for each piece of the game
|
*/

var view = {};

/*
|
|   shooter
|
*/
view.shooter = function( d, ctx )
{
    ctx.beginPath();
    ctx.fillStyle = 'rgba( 126, 192, 238, '+ d.currentOpacity +' )';
    ctx.arc( d.x, d.y, d.r, 0, 2 * Math.PI );
    ctx.fill();
};

/*
|
|   enemies
|
*/
view.enemies = function( d, ctx )
{
    for ( var i = d.length - 1; i >= 0; i-- )
        enemy( d[i], ctx );
};

/*
|
|   enemy
|
|   ...used by view.enemies()
|
*/
var enemy = function( i, ctx )
{
    ctx.beginPath();
    ctx.fillStyle = 'rgba( 255, 99, 71, 0.5 )';
    ctx.arc( i.x, i.y, i.r, 0, 2 * Math.PI );
    ctx.fill();
};

/*
|
|   shots
|
*/
view.shots = function( d, ctx )
{
    for ( var i = d.length - 1; i >= 0; i-- )
        shot( d[i], ctx );
};

/*
|
|   shot
|
|   ...used by view.shots()
|
*/
var shot = function( i, ctx )
{
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.rect( i.x, i.y, 5, 5 );
    ctx.fill();
};

window.view = view;
})();

// EOF
