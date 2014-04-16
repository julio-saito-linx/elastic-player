/*global define*/

define([
    'underscore',
    'backbone',
    'models/song',
    '../playerCommunicator'
], function (_, Backbone, Song, playerCommunicator) {
    'use strict';

    var PlaylistCollection = Backbone.Collection.extend({
        model: Song,

        initialize: function() {
            this.currentIndex = 0;

            playerCommunicator.on('playlist:previous', this.prev, this);
            playerCommunicator.on('playlist:next', this.next, this);
            playerCommunicator.on('audio:ended', this.nextAndPlay, this);
        },

        prev:function() {
            this.currentIndex = this.currentIndex - 1;
            if (this.currentIndex < 0) {
                this.currentIndex = this.length-1;
            }
            var newSong = this.at(this.currentIndex);
            playerCommunicator.trigger('song:set', newSong);
        },

        next:function() {
            this.currentIndex = this.currentIndex + 1;
            if(this.currentIndex > this.length-1){
                this.currentIndex = 0;
            }
            var newSong = this.at(this.currentIndex);
            playerCommunicator.trigger('song:set', newSong);
        },

        nextAndPlay:function() {
            this.next();
            playerCommunicator.trigger('audio:play', this.at(this.currentIndex));
        },

        addByUrl: function() {
            console.log('addByUrl called')
        }
    });

    return PlaylistCollection;
});
