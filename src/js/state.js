(function(){ 'use strict';

/*
|
|   state
|
|   ...mostly just manage which pane should be visible
|
*/

var State = {

    current : '',

    //
    //  the available panes
    //  'id' describes the element pane
    //  'display' describes the display method for pane
    //
    available : [
        {
            id      : 'shooty-shoot',
            display : 'flex',
        },
        {
            id      : 'home',
            display : 'flex',
        },
        {
            id      : 'lose',
            display : 'flex',
        },
        {
            id      : 'win',
            display : 'flex',
        },
    ],
};

State.set = function( s )
{
    for ( var i = this.available.length - 1; i >= 0; i-- )
    {
        if ( this.available[i].id == s )
            this.apply( this.available[i] );
    }
};

State.apply = function( s )
{
    this.current = s.id;

    this.clear();

    document
        .getElementById( s.id )
        .style
        .display = s.display;
};

State.clear = function()
{
    for ( var i = this.available.length - 1; i >= 0; i-- )
        document
            .getElementById( this.available[i].id )
            .style.display = 'none';
};

window.State = State;

})();

// EOF
