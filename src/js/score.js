(function(){ 'use strict';

/*
|
|   score
|
|   ...track score board stats
|
*/

var Score = {

    initEnemies : 0,
    enemies     : 0,
    shots       : 0,
    hits        : 0,
    accuracy    : 0,
};

/*
|
|   init
|
*/
Score.init = function()
{
    this.draw();
};

/*
|
|   draw
|
|   ...display score stats in scoreboard
|
*/
Score.draw = function()
{
    this._setElText( G.els.shots, this.shots );
    this._setElText( G.els.hits, this.hits );
    this._setElText( G.els.accuracy, this.setGetAccuracy() );

    window.setTimeout( function() { Score.draw(); }, 500);
};

/*
|
|   set enemies
|
*/
Score.setEnemies = function( n )
{
    this.initEnemies = n;
    this.enemies     = n;

    return this.enemies;
};

/*
|
|   shot
|
|   ...record a new shot
|
*/
Score.shot = function()
{
    this.shots++;
    return this.shots;
};

/*
|
|   hit
|
|   ...record a new hit
|
*/
Score.hit = function()
{
    this.hits++;
    this.enemies--;

    return this.hits;
};

/*
|
|   set/get accuracy
|
|   ...determine current accuracy and return that
|
*/
Score.setGetAccuracy = function()
{
    //
    //  avoid zero divided by zero
    //
    if ( !this.shots )
        return this.accuracy;

    //
    //  ok, do the thing
    //
    this.accuracy = this._calcPercentage( this.hits, this.shots );

    return this.accuracy;
};

/*
|
|   calculate percentage
|
*/
Score._calcPercentage = function( actual, possible )
{
    var p = actual / possible;

    p = p * 100;
    p = Math.round( p );

    return p;
};

/*
|
|   set element text
|
|   ...apply to scoreboard dom elements
|
*/
Score._setElText = function( els, txt )
{
    for ( var i = els.length - 1; i >= 0; i-- )
        els[i].textContent = txt;

    return txt;
};

/*
|
|   a gift for window
|
*/
window.Score = Score;

})();

// EOF
