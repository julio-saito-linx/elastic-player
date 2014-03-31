define([
],
function() {
  'use strict';

  //* ************************************
  // http://stackoverflow.com/questions/3733227/javascript-seconds-to-minutes-and-seconds
  //* ************************************//
  return function(seconds) {
    // Minutes and seconds
    // var mins = Math.floor(seconds / 60);
    // var secs = seconds % 60;

    // Hours, minutes and seconds
    var hrs = Math.floor(seconds / 3600);
    var mins = Math.floor((seconds % 3600) / 60);
    var secs = Math.floor(seconds % 60);

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = '';

    if (hrs > 0){
      ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
    }

    ret += '' + mins + ':' + (secs < 10 ? '0' : '');
    ret += '' + secs;

    return ret;
  };

});
