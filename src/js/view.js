(function(){ 'use strict';

/*
|
|   views
|
*/

var view = {};

view.shooter = function( d, ctx )
{
    ctx.beginPath();
    ctx.fillStyle = 'rgba( 126, 192, 238, '+ d.currentOpacity +' )';
    ctx.arc( d.x, d.y, d.r, 0, 2 * Math.PI );
    ctx.fill();
};

view.enemies = function( d, ctx )
{
    for ( var i = d.length - 1; i >= 0; i-- )
        enemy( d[i], ctx );
};

var enemy = function( i, ctx )
{
    ctx.beginPath();
    ctx.fillStyle = 'rgba( 255, 99, 71, 0.5 )';
    ctx.arc( i.x, i.y, i.r, 0, 2 * Math.PI );
    ctx.fill();
};

view.shots = function( d, ctx )
{
    for ( var i = d.length - 1; i >= 0; i-- )
        shot( d[i], ctx );
};

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
