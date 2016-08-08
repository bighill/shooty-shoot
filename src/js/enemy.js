(function(){ 'use strict';

/*
|
|   enemy
|
*/

var Enemy = function()
{
    this.data = {

        //
        //  number of rows
        //
        rowN : 5,

        //
        //  number of enemies in each row
        //
        colN : 10,

        //
        //  enemy movement speed multiplier
        //
        moveMultp : 0.008,

        //
        //  row width multiplier and shift width multiplier should add up to 1
        //
        rowWmultp   : 0.7,
        shiftWmultp : 0.3,

        //
        //  data for state of each enemy
        //
        enemies : [],

        //
        //  values set by init()
        //
        rowW    : 0,
        shiftW  : 0,
        shiftH  : 0,
        enemyR  : 0,
        shiftV  : 0,

        //
        //  track enemy shift direction
        //
        xDelta      : 0,
        yDelta      : 0,
        movingRight : true,
        movingDown  : false,
    };
};

Enemy.prototype.init = function( z, v )
{
    //
    //  set global enemy values
    //
    this.data.rowW   = z * this.data.rowWmultp;
    this.data.shiftW = z * this.data.shiftWmultp;
    this.data.shiftV = this.data.moveMultp * z * v;
    
    var enemiesAndGapsN = ( this.data.colN * 2 ) - 1;  
    this.data.enemyR    = ( this.data.rowW / enemiesAndGapsN ) / 2;

    this.data.shiftH = this.data.enemyR;

    //
    //  initial values for enemy
    //
    var x = this.data.enemyR,
        y = this.data.enemyR,
        r = this.data.enemyR,
        defaultX = x,
        defaultY = y;

    //
    //  initialize each enemy
    //
    for ( var n = this.data.rowN - 1; n >= 0; n-- )
    {
        for ( var i = this.data.colN - 1; i >= 0; i-- )
        {
            this.initEachEnemy( x, y, r );        
            x = x + ( r * 4 );
        }

        x = defaultX;
        y = defaultY + ( r * 4 * n );
    }
};

Enemy.prototype.initEachEnemy = function( x, y, r )
{
    var enemy = {
            x : x,
            y : y,
            r : r,
            state : 'active',
            shift : this.data.shiftV,
        };

    this.data.enemies.push( enemy );
};

Enemy.prototype.animate = function()
{
    this.movement();
    this.processState();
};

Enemy.prototype.movement = function()
{
    if ( !this.data.enemies[0] )
        return false;

    this.data = ( this.data.movingDown ) ?
        _moveEnemiesDown( this.data )    :
        _moveEnemiesHorizontally( this.data );
};

var _moveEnemiesDown = function( d )
{
    //
    //  increment downward movement with yDelta
    //
    d = _incrementDownwardMovement( d );

    //
    //  check if done moving down
    //
    if ( d.yDelta >= d.shiftH )
        d = _movingDownIsComplete( d );

    //
    //  adjust enemy postitions
    //
    d.enemies = d.enemies.map( _moveEnemyDown );

    return d;
};

var _moveEnemiesHorizontally = function( d )
{
    //
    //  increment downward movement with xDelta
    //
    d = _incrementHorizontalMovement( d );

    //
    //  check if done moving horizontally
    //
    if ( d.xDelta >= d.shiftW )
        d = _movingHorizontallyIsComplete( d );

    //
    //  adjust enemy postitions
    //
    d.enemies = ( d.movingRight )        ?
        d.enemies.map( _moveEnemyRight ) :
        d.enemies.map( _moveEnemyLeft );

    return d;
};

var _incrementDownwardMovement = function( d )
{
    d.yDelta = d.yDelta + d.shiftV;

    return d;
};

var _movingDownIsComplete = function( d )
{
    d.movingDown    = false;
    d.yDelta        = 0;

    return d;
};

var _moveEnemyDown = function( enemy )
{
    enemy.y = enemy.y + enemy.shift;

    return enemy;
};

var _incrementHorizontalMovement = function( d )
{
    d.xDelta = d.xDelta + d.shiftV;

    return d;
};

var _movingHorizontallyIsComplete = function( d )
{
    d.movingRight   = !d.movingRight;
    d.xDelta        = 0;
    d.movingDown    = true;

    return d;
};

var _moveEnemyRight = function( enemy )
{
    enemy.x = enemy.x + enemy.shift;

    return enemy;
};

var _moveEnemyLeft = function( enemy )
{
    enemy.x = enemy.x - enemy.shift;

    return enemy;
};

Enemy.prototype.processState = function()
{
    for ( var i = this.data.enemies.length - 1; i >= 0; i-- )
        _processEach( this.data.enemies[i], i, this.data.enemies );
};

var _processEach = function( enemy, enemyI, enemies )
{
    if ( enemy.state == 'hit' )
        enemies.splice( enemyI, 1 );
};

Enemy.prototype.hit = function( i )
{
    this.data.enemies[i].state = 'hit';
};

window.Enemy = Enemy;
})();

// EOF
