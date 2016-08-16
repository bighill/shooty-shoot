(function(){ 'use strict';

/*
|
|   score
|
|   ...track score board stats
|
*/

var Score = function( enemies, els )
{
    this.data = {
        initEnemies : enemies,
        enemies     : enemies,
        shots       : 0,
        hits        : 0,
        accuracy    : 0,
    };

    this.els = els;
};

/*
|
|   draw
|
|   ...display score stats in scoreboard
|
*/
Score.prototype.draw = function()
{
    _setElText( this.els.shots, this.data.shots );
    _setElText( this.els.hits, this.data.hits );
    _setElText( this.els.accuracy, this.setGetAccuracy() );
};

/*
|
|   shot
|
|   ...record a new shot
|
*/
Score.prototype.shot = function()
{
    this.data.shots++;
    return this.data.shots;
};

/*
|
|   hit
|
|   ...record a new hit
|
*/
Score.prototype.hit = function()
{
    this.data.hits++;
    this.data.enemies--;

    return this.data.hits;
};

/*
|
|   set/get accuracy
|
|   ...determine current accuracy and return that
|
*/
Score.prototype.setGetAccuracy = function()
{
    //
    //
    //
    if ( !this.data.shots )
        return this.data.accuracy;

    //
    //
    //
    this.data.accuracy = _calcPercentage( this.data.hits, this.data.shots );

    return this.data.accuracy;
};

/*
|
|   calculate percentage
|
*/
var _calcPercentage = function( actual, possible )
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
var _setElText = function( els, txt )
{
    for ( var i = els.length - 1; i >= 0; i-- )
        els[i].textContent = txt;

    return txt;
};


window.Score = Score;

})();

// EOF
