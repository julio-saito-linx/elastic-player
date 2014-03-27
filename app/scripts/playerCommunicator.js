define([
	'backbone',
	'underscore'
],
function( Backbone, _ ) {
    'use strict';

    /*
    PlayerCommunicator :: events
    ############################

    playlist:add
    playlist:remove
    playlist:clean
    playlist:previous
    playlist:next

    song:play

    audio:play
    audio:pause
    audio:playbackEnd
    */

	var PlayerCommunicator = {};
	
	_.extend(PlayerCommunicator, Backbone.Events);
	
	return PlayerCommunicator;
});
