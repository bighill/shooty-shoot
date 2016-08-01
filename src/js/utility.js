(function(){ 'use strict';

/*
|
|   utility
|   
|   ...reusable helper functions
|
*/

var U = {};

/*
|
|   reload the whole thing
|
*/
U.reload = function()
{
    window.location.reload();
};

/*
|
|   for loop
|
*/
U.loop = function( arr, fn )
{
    for ( var i = arr.length - 1; i >= 0; i-- )
        fn( arr[i] );
};

window.U = U;

})();

// EOF
