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
            this.audio = new Audio();
            this.audio.volume = CONFIG.AUDIO.VOLUME;

            this.isPLaying = false;
            
            // audio events
            this.audio.addEventListener('canplay', this.canplay.bind(this), false);
            this.audio.addEventListener('ended', this.ended.bind(this), false);

            playerCommunicator.on('song:set', this.setSong, this);
            playerCommunicator.on('audio:play', this.playOrPause, this);
            playerCommunicator.on('audio:volume', this.volume, this);

        },

        canplay: function () {
            // clearTimeout(this.tId);
            this.totalLength = this.audio.duration;
            // this.updateProgressBar();
        },

        ended: function () {
            this.isPLaying = false;
            playerCommunicator.trigger('audio:ended');
        },

        playOrPause: function() {
            if(!this.isPLaying){
                this.play();
            }
            else{
                this.pause();
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

        setSong: function ( song ) {
            this.song = song;
            this.audio.src = this.song.get('path');
            
            if(this.isPLaying){
                this.play();
            }
        }

    });

    return AudioModel;
});
