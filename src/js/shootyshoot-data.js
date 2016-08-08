(function(){ 'use strict';

/*
|
|   global game data
|
*/

var shshData = function()
{
    this.speed      = 0.5;
    this.isPlaying  = false;
    this.z          = 0;

    this.el = {
        game    : document.getElementById( 'shooty-shoot' ),
        score   : document.getElementById( 'score' ),
        canvas  : document.getElementById( 'shooty-shoot-canvas' ),
        home    : document.getElementById( 'home' ),
        lose    : document.getElementById( 'lose' ),
        win     : document.getElementById( 'win' ),

        homeH1      : document.querySelector( '#home h1' ),
        homePlayBtn : document.getElementById( 'home-play-btn' ),
    };

    this.els = {
        playBtns : document.getElementsByClassName( 'play-btn' ),
        shots    : document.getElementsByClassName( 'shots' ),
        hits     : document.getElementsByClassName( 'hits' ),
        accuracy : document.getElementsByClassName( 'accuracy' ),
        keyLeft  : document.getElementsByClassName( 'key-left' ),
        keyRight : document.getElementsByClassName( 'key-right' ),
        keyShoot : document.getElementsByClassName( 'key-shoot' ),
    };
};

shshData.prototype.init = function()
{
    this.z = this.el.canvas.offsetWidth;
};

window.shshData = shshData;
})();

// EOF
