(function(){ 'use strict';

/*
|
|   score
|
|   ...track score board stats
|
*/

var Score = {

    /*
    this data set by init()

    data to expect...

    initEnemies (int)
    enemies     (int)
    shots       (int)
    hits        (int)
    accuracy    (int)
    */
    data : {},
};

/*
|
|   init
|
*/
Score.init = function()
{
    Score.data = _.cloneDeep( Data.score );
    Score.draw();
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
    Score._setElText( G.els.shots, Score.data.shots );
    Score._setElText( G.els.hits, Score.data.hits );
    Score._setElText( G.els.accuracy, Score.setGetAccuracy() );

    window.setTimeout( function() { Score.draw(); }, 500);
};

/*
|
|   set enemies
|
*/
Score.setEnemies = function( n )
{
    this.data.initEnemies = n;
    this.data.enemies     = n;

    return this.data.enemies;
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
Score.hit = function()
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
Score.setGetAccuracy = function()
{
    //
    //  avoid zero divided by zero
    //
    if ( !this.data.shots )
        return this.data.accuracy;

    //
    //  ok, do the thing
    //
    this.data.accuracy = this._calcPercentage( this.data.hits, this.data.shots );

    return this.data.accuracy;
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
