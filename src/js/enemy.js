(function(){ 'use strict';

/*
|
|   enemy
|
|   ...boooo
|
*/

var Enemy = {

    //
    //  number of rows
    //
    rowN : 5,

    //
    //  number of enemies in each row
    //
    colN : 9,

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
    data : [],

    //
    //  values set initially and during play
    //
    val : {

        //
        //  values set by sizer()
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
    },
};

/*
|
|   init
|
*/
Enemy.init = function()
{
    var self = Enemy;

    //
    //  set global enemy values
    //
    self.val.rowW   = G.z * self.rowWmultp;
    self.val.shiftW = G.z * self.shiftWmultp;
    self.val.shiftV = self.moveMultp * G.z * G.speed;
    
    var enemiesAndGapsN = ( self.colN * 2 ) - 1;    
    self.val.enemyR = ( self.val.rowW / enemiesAndGapsN ) / 2;

    self.val.shiftH = self.val.enemyR;

    //
    //  default values for each enemy
    //
    var x = self.val.enemyR,
        y = self.val.enemyR,
        r = self.val.enemyR,
        defaultX = x,
        defaultY = y;

    //
    //  initialize each enemy
    //
    for ( var n = self.rowN - 1; n >= 0; n-- )
    {
        for ( var i = self.colN - 1; i >= 0; i-- )
        {
            self.setRow( x, y, r );        
            x = x + ( r * 4 );
        }

        x = defaultX;
        y = defaultY + ( r * 4 * n );
    }

    //
    //  notify scoreboard, total # of enemies
    //
    Score.setEnemies( self.rowN * self.colN );
};

/*
|
|   set row
|
|   ...initialize data for row of enemies
|
*/
Enemy.setRow = function( x, y, r )
{
    var enemy = {
            x : x,
            y : y,
            r : r,
            state : 'active',
        };

    this.data.push( enemy );
};

/*
|
|   draw
|
|   ...start drawing all enemies
|
*/
Enemy.draw = function( ctx )
{
    if ( !this.data[0] )
    {
        G.win();
        return false;
    }

    if ( this.val.movingDown )
    {
        this.val.yDelta = this.val.yDelta + this.val.shiftV;

        if ( this.val.yDelta >= this.val.shiftH )
        {
            this.val.movingDown = false;
            this.val.yDelta = 0;
        }

        for ( var iDwn = this.data.length - 1; iDwn >= 0; iDwn-- )
            this._adjustEnemy( this.data[iDwn], ctx, iDwn, this.data, this.val.shiftV ); 
    }
    else
    {
        this.val.xDelta = this.val.xDelta + this.val.shiftV;

        if ( this.val.xDelta >= this.val.shiftW )
        {
            this.val.movingRight = !this.val.movingRight;
            this.val.xDelta = 0;
            this.val.movingDown = true;
        }

        for ( var i = this.data.length - 1; i >= 0; i-- )
            this._adjustEnemy( this.data[i], ctx, i, this.data, this.val.shiftV );        
    }
};

/*
|
|   adjust enemy
|
|   ...movement and state adjustments for each frame
|
*/
Enemy._adjustEnemy = function( enemy, ctx, i, data, shiftV )
{
    //
    // movement
    //
    if ( this.val.movingDown )
        enemy.y = enemy.y + shiftV;

    else if ( this.val.movingRight )
        enemy.x = enemy.x + shiftV;

    else
        enemy.x = enemy.x - shiftV;

    //
    //  state
    //
    if ( enemy.state == 'active' )
        this._drawEnemy( enemy, ctx );

    else if ( enemy.state == 'dead' )
        this._deactivate( i, data );

    else
        this._deactivate( i, data );
};

/*
|
|   draw enemy
|
|   ...draw enemy on the canvas
|
*/
Enemy._drawEnemy = function( enemy, ctx )
{
    ctx.beginPath();
    ctx.fillStyle = 'rgba( 255, 99, 71, 0.5 )';
    ctx.arc( enemy.x, enemy.y, enemy.r, 0, 2 * Math.PI );
    ctx.fill();
};

/*
|
|   deactivate
|
|   ...when hit,
|       an enemy must be sent to a farm upstate
|       to live out it's final days frolicing in the country side.
|
*/
Enemy._deactivate = function( i, data )
{
    data.splice( i, 1 );
};

/*
|
|   a gift for window
|
*/
window.Enemy = Enemy;

})();

// EOF
