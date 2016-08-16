(function(){ 'use strict';

/*
|
|   collisions
|
*/

/*
|
|   check if the game has been lost
|
|   ...the game is lost when one or more ememies reach the shooter
|
*/
var Lose = function( enemies, shooter )
{
    //
    //  check for enemy collision with shooter
    //
    if ( _shooterCollision(enemies, shooter) )
        return true;

    return false;
};

/*
|
|   check for hit
|
|   ...a hit (or kill) occurs when a shot collides with an enemy
|
*/
var Hit = function( enemies, shots )
{
    //
    //  check for enemy collision with shot
    //
    return _shotCollision(enemies, shots);
};

/*
|
|   helper function used in Lose()
|
*/
var _shooterCollision = function( enemies, shooter )
{
    for ( var i = enemies.length - 1; i >= 0; i-- )
    {
        var enemyBottom = enemies[i].y + enemies[i].r,
            shooterTop  = shooter.y - shooter.r;

        if ( enemyBottom > shooterTop )
            return true;
    }

    return false;
};

/*
|
|   helper function used in Hit()
|
*/
var _shotCollision = function( enemies, shots )
{
    if ( !enemies.length )
        return false;

    if ( !shots.length )
        return false;

    //

    var hit = false;

    for ( var i = enemies.length - 1; i >= 0; i-- )
    {
        hit = _shotCollisionEachEnemy( enemies[i], i, shots );

        if ( hit )
            return hit;
    }

    return false;
};

/*
|
|   helper function used in _shotCollision()
|
*/
var _shotCollisionEachEnemy = function( enemy, enemyI, shots )
{
    var hit = false;

    for ( var i = shots.length - 1; i >= 0; i-- )
    {
        hit = _shotCollisionEachShot( enemy, enemyI, shots[i], i );

        if ( hit )
            return hit;
    }

    return false;
};

/*
|
|   helper function used in _shotCollisionEachEnemy()
|
*/
var _shotCollisionEachShot = function( enemy, enemyI, shot, shotI )
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
    //  return the enemy and shot that should be deactivated
    //
    return {
        'enemy' : enemyI,
        'shot'  : shotI,
    };
};

window.Lose = Lose;
window.Hit  = Hit;

})();

// EOF