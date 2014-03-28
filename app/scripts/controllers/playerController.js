/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../views/status',
    '../views/controls',
    '../views/playlistView',
    '../models/audio',
    '../models/song',
    '../collections/playlist',
    '../playerCommunicator'
], function (
    $,
    _,
    Backbone,
    StatusView,
    ControlsView,
    PlaylistView,
    Audio,
    Song,
    Playlist,
    playerCommunicator
) {
    'use strict';

    var PlayerController = Backbone.View.extend({
        initialize: function () {
            this.initializeRegions();
            this.initializeModels();
            this.initializeViews();
            this.renderViews();
            this.addViewsToDOM();

            this.fetchPlaylist();
        },

        initializeRegions: function() {
            this.jMain = $('#mainContainer');
            this.jStatusRegion = this.jMain.find('#status');
            this.jControlsRegion = this.jMain.find('#controls');
            this.jPlaylistRegion = this.jMain.find('#playlist');
        },
        
        initializeModels: function() {
            this.audio = new Audio();
            this.playlist = new Playlist();
        },
        
        initializeViews: function() {
            this.statusView = new StatusView({
                model: this.audio
            });

            this.controlsView = new ControlsView({
                model: this.audio
            });

            this.playlistView = new PlaylistView({
                collection: this.playlist
            });
        },
        
        renderViews: function() {
            this.statusView.render();
            this.controlsView.render();
            this.playlistView.render();
        },
        
        addViewsToDOM: function() {
            this.jStatusRegion.html(this.statusView.el);
            this.jControlsRegion.html(this.controlsView.el);
            this.jPlaylistRegion.html(this.playlistView.el);
        },

        fetchPlaylist: function() {
            var songs = [
                { path: 'audios/1-08-you-re-dead.mp3', title: 'you-re-dead'},
                { path: 'audios/1-09-game-over.mp3', title: '09-game-over'},
                { path: 'audios/1-10-game-over-2.mp3', title: 'game-over-2'},
                { path: 'audios/1-11-into-the-tunnel.mp3', title: 'into-the-tunnel'},
                { path: 'audios/1-13-hurry.mp3', title: '1-13-hurry'},
                { path: 'audios/3-26-course-clear.mp3', title: '26-course-clear'},
                { path: 'audios/3-27-you-re-dead.mp3', title: 'you-re-dead'},
                { path: 'audios/3-28-game-over.mp3', title: '28-game-over'}
            ];

            var allSongs = [];
            for (var i = 0; i < songs.length; i++) {
                var song = new Song(songs[i]);
                allSongs.push(song);
            }

            this.playlist.reset(allSongs);
            playerCommunicator.trigger('song:set', allSongs[0]);
        }

    });

    return PlayerController;
});
