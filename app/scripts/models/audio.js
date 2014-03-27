/*global define*/

define([
    'underscore',
    'backbone',
    '../playerCommunicator'
], function (_, Backbone, playerCommunicator) {
    'use strict';

    var AudioModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
            this.audio = new Audio();
            
            // audio events
            this.audio.addEventListener('canplay', this.canplay.bind(this), false);
            this.audio.addEventListener('ended', this.ended.bind(this), false);

            playerCommunicator.on('song:set', this.setSong, this);
            playerCommunicator.on('audio:play', this.play, this);
        },

        canplay: function () {
            // clearTimeout(this.tId);
            this.totalLength = this.audio.duration;
            // this.updateProgressBar();
        },

        ended: function () {
            // this.next();
        },

        play:function() {
            //clearTimeout(this.tId);
            //this.tId = setTimeout(this.updateProgressBar.bind(this), 1000);
            this.audio.play();
        },

        setSong: function( song ) {
            this.song = song;
            
            //set the current index if exists
            // if(this.songs && this.songs.indexOf(this.song) >= 0){
            //   this.currentIndex = this.songs.indexOf(this.song);
            // }
    
            this.audio.src = this.song.get('path');

            // this.song.set('audio', this.audio);
            // Communicator.mediator.trigger('player:song', this.song, this.audio);
        },

        pause:function() {
            //clearTimeout(this.tId);
            this.audio.pause();
        },

        defaults: {
        },

        // validate: function(attrs, options) {
        // },

        parse: function(response/*, options*/)  {
            return response;
        }
    });

    return AudioModel;
});
