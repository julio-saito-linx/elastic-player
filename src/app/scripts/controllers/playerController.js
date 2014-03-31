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
                { 
                    path: 'http://freemusicarchive.org/music/download/432ad3432ae64c5e6789ca961fecc554a51bae99',
                    artist: 'Kevin MacLeod',
                    album: 'Classical Sampler',
                    track: '01',
                    title: 'Funeral March for Brass'
                },
                { 
                    path: 'http://freemusicarchive.org/music/download/46329ae5c7f85480cc8b49d5bfb3924a1fce0913',
                    artist: 'Kevin MacLeod',
                    album: 'Classical Sampler',
                    track: '02',
                    title: 'Virtutes Instrumenti'
                },
                { 
                    path: 'http://freemusicarchive.org/music/download/357bf218964230ea273eaf18a55ecb09fd6518fd',
                    artist: 'Kevin MacLeod',
                    album: 'Classical Sampler',
                    track: '03',
                    title: 'J. S. Bach: Brandenburg Concerto No4-1 BWV1049'
                },
                { 
                    path: 'http://freemusicarchive.org/music/download/8de1034b9a923de6a459653ec1ae91b8e07f7a17',
                    artist: 'Kevin MacLeod',
                    album: 'Classical Sampler',
                    track: '04',
                    title: 'Amazing Grace 2011'
                },
                { 
                    path: 'http://freemusicarchive.org/music/download/1c492208db4da8c03c6e5fe661d290eb921c349c',
                    artist: 'Kevin MacLeod',
                    album: 'Classical Sampler',
                    track: '05',
                    title: 'Camille Saint-Saëns: Danse Macabre'
                }
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
