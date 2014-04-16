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
    '../playerCommunicator',
    'socketIO'], function (
    $,
    _,
    Backbone,
    StatusView,
    ControlsView,
    PlaylistView,
    Audio,
    Song,
    Playlist,
    playerCommunicator,
    socketIO
) {
    'use strict';

    var PlayerController = Backbone.View.extend({
        initialize: function () {
            this.initializeRegions();
            this.initializeModels();
            this.initializeViews();
            this.renderViews();
            this.addViewsToDOM();
            this.addInitialSongs();
            this.initilizeWebSockectComminication();
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

        addInitialSongs: function() {
            //id=142292
        },

        initilizeWebSockectComminication: function() {
            //TODO: this must be dynamic
            this.socket = socketIO.connect('http://192.168.15.103:9003');
            this.socket.on('toAll:playlist:add', function(data) {
                var songModel = new Song(data);
                this.playlist.add(songModel);
                
                console.log('adding from socket', '\n', songModel.get('artist'), '-', songModel.get('title'));

            }.bind(this));
        }
    });

    return PlayerController;
});
