(function(){ 'use strict';

/*
|
|   collision
|
|   ...determine if enemy collided with either a shot or the shooter
|
*/

var Collision = {};

Collision.check = function()
{
    if ( !Enemy.data.enemies.length )
        return false;

    for ( var i = Enemy.data.enemies.length - 1; i >= 0; i-- )
    {
        //
        //  player loses if enemyBottom reaches shooterTop
        //
        var enemyBottom = Enemy.data.enemies[i].y + Enemy.data.enemies[i].r,
            shooterTop  = Shooter.y - Shooter.r;

        this._shooterCollision( enemyBottom, shooterTop );

        //
        //  just stop here if no currently active shots
        //
        if ( !Shot.data.length )
            continue;

        //
        //  check for hits ...enemy and shot collisions
        //
        for ( var j = Shot.data.length - 1; j >= 0; j-- )
            this._shotCollision( Shot.data[j], j, Enemy.data.enemies[i], i );
    }
};

/*
|
|   shot collision
|
|   ...determine if enemy collided with a shot
|
*/
Collision._shotCollision = function( shot, sI, enemy, eI )
{
    var enemyEdge = {};
    enemyEdge.top    = enemy.y - enemy.r;
    enemyEdge.bottom = enemy.y + enemy.r;
    enemyEdge.left   = enemy.x - enemy.r;
    enemyEdge.right  = enemy.x + enemy.r;

    //
    //  return false if shot missed all enemies
    //
    if ( shot.y < enemyEdge.top)
        return false;

    if ( shot.y > enemyEdge.bottom )
        return false;

    if ( shot.x < enemyEdge.left )
        return false;

    if ( shot.x > enemyEdge.right )
        return false;

    //
    //  no misses means there was a hit
    //
    Collision.hit( sI, eI );
};

/*
|
|   shot collision
|
|   ...determine if enemy collided with the shooter
|
*/
Collision._shooterCollision = function( enemyBottom, shooterTop )
{
    if ( enemyBottom > shooterTop )
        G.lose();
};

/*
|
|   hit
|
|   ...record a collision between shot and enemy
|
*/
Collision.hit = function( sI, eI )
{
    Shot .data[sI].state = 'hit';
    Enemy.data.enemies[eI].state = 'dead';
    Score.hit();
};

/*
|
|   a gift for window
|
*/
window.Collision = Collision;    

})();

// EOF