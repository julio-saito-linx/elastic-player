/*global define*/

define([
    'underscore',
    'backbone',
    '../playerCommunicator',
    '../config/config'
], function (_, Backbone, playerCommunicator, CONFIG) {
    'use strict';

    var AudioModel = Backbone.Model.extend({
        url: '',

        defaults: {
        },

        initialize: function () {
            this.isPLaying = false;
            
            this.audio = new Audio();
            this.audio.volume = CONFIG.AUDIO.VOLUME;

            // HTML5 audio events, default sequence
            // - play
            // - loadedmetadata
            // - loadeddata
            // - canplay
            // - playing
            // - timeupdate... (seeked, volumechange)
            // - ended
            this.audio.addEventListener('canplay', this.canplay.bind(this), false);
            this.audio.addEventListener('ended', this.ended.bind(this), false);

            playerCommunicator.on('song:set', this.setSong, this);
            playerCommunicator.on('audio:playOrPause', this.playOrPause, this);
            playerCommunicator.on('audio:play', this.play, this);
            playerCommunicator.on('audio:pause', this.pause, this);
            playerCommunicator.on('audio:volume', this.volume, this);
            playerCommunicator.on('audio:time', this.setTime, this);

        },

        eventOcurred: function(eventName) {
            console.log(eventName);
        },

        canplay: function () {
            this.totalLength = this.audio.duration;
        },

        ended: function () {
            this.isPLaying = false;
            playerCommunicator.trigger('audio:ended');
        },

        playOrPause: function() {
            if(!this.isPLaying){
                playerCommunicator.trigger('audio:play');
            }
            else{
                playerCommunicator.trigger('audio:pause');
            }
        },

        play: function () {
            this.audio.play();
            this.isPLaying = true;
        },

        pause: function () {
            this.audio.pause();
            this.isPLaying = false;
        },

        volume: function ( volume ) {
            this.audio.volume = volume;
        },

        setTime: function ( newTime ) {
            this.audio.currentTime = newTime;
        },

        setSong: function ( song ) {
            this.song = song;
            this.audio.src = this.song.get('path');
            
            if(this.isPLaying){
                this.play();
            }
        },

        getCurrentTime: function() {
            return this.audio.currentTime;
        },

        getTotalLength: function() {
            return this.totalLength;
        }

    });

    return AudioModel;
});
