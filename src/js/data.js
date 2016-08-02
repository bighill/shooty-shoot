(function(){ 'use strict';

/*
|
|   data model
|
*/

var Data = {

    enemy : {

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
        }
    },

    shot : [],
};

/*
|
|   a gift for window
|
*/
window.Data = Data;

})();

// EOF
