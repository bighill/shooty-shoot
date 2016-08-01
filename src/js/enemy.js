(function(){ 'use strict';

/*
|
|   enemy
|
|   ...boooo
|
*/

var Enemy = {

    /*
    this data set by init()

    data to expect...

    rowN (int)
    colN (int)
    moveMultp (float)
    rowWmultp (float)
    shiftWmultp (float)
    enemies (array)

    val (obj)
        rowW (float)
        shiftW (float)
        shiftH (float)
        enemyR (float)
        shiftV (float)
        xDelta (float)
        yDelta (float)
        movingRight (bool)
        movingDown (bool)
    */
    data : {},
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
    //  load data from data model
    //
    self.data = _.cloneDeep( Data.enemy );

    //
    //  set global enemy values
    //
    self.data.val.rowW   = G.z * self.data.rowWmultp;
    self.data.val.shiftW = G.z * self.data.shiftWmultp;
    self.data.val.shiftV = self.data.moveMultp * G.z * G.speed;
    
    var enemiesAndGapsN = ( self.data.colN * 2 ) - 1;  
    self.data.val.enemyR = ( self.data.val.rowW / enemiesAndGapsN ) / 2;

    self.data.val.shiftH = self.data.val.enemyR;

    //
    //  default values for each enemy
    //
    var x = self.data.val.enemyR,
        y = self.data.val.enemyR,
        r = self.data.val.enemyR,
        defaultX = x,
        defaultY = y;

    //
    //  initialize each enemy
    //
    for ( var n = self.data.rowN - 1; n >= 0; n-- )
    {
        for ( var i = self.data.colN - 1; i >= 0; i-- )
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
    Score.setEnemies( self.data.rowN * self.data.colN );
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

    this.data.enemies.push( enemy );
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
    if ( !this.data.enemies[0] )
    {
        G.win();
        return false;
    }

    if ( this.data.val.movingDown )
    {
        this.data.val.yDelta = this.data.val.yDelta + this.data.val.shiftV;

        if ( this.data.val.yDelta >= this.data.val.shiftH )
        {
            this.data.val.movingDown = false;
            this.data.val.yDelta = 0;
        }

        for ( var iDwn = this.data.enemies.length - 1; iDwn >= 0; iDwn-- )
            this._adjustEnemy( this.data.enemies[iDwn], ctx, iDwn, this.data.enemies, this.data.val.shiftV ); 
    }
    else
    {
        this.data.val.xDelta = this.data.val.xDelta + this.data.val.shiftV;

        if ( this.data.val.xDelta >= this.data.val.shiftW )
        {
            this.data.val.movingRight = !this.data.val.movingRight;
            this.data.val.xDelta = 0;
            this.data.val.movingDown = true;
        }

        for ( var i = this.data.enemies.length - 1; i >= 0; i-- )
            this._adjustEnemy( this.data.enemies[i], ctx, i, this.data.enemies, this.data.val.shiftV );
    }
};

/*
|
|   adjust enemy
|
|   ...movement and state adjustments for each frame
|
*/
Enemy._adjustEnemy = function( enemy, ctx, i, enemies, shiftV )
{
    //
    // movement
    //
    if ( this.data.val.movingDown )
        enemy.y = enemy.y + shiftV;

    else if ( this.data.val.movingRight )
        enemy.x = enemy.x + shiftV;

    else
        enemy.x = enemy.x - shiftV;

    //
    //  state
    //
    if ( enemy.state == 'active' )
        this._drawEnemy( enemy, ctx );

    else if ( enemy.state == 'dead' )
        this._deactivate( i, enemies );

    else
        this._deactivate( i, enemies );
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
Enemy._deactivate = function( i, enemies )
{
    enemies.splice( i, 1 );
};

/*
|
|   a gift for window
|
*/
window.Enemy = Enemy;

})();

// EOF
