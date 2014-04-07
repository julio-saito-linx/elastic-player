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

                // This songs never auto load
                // {
                //     id: 1,
                //     artist: 'saitodisse',
                //     album: 'some of my music',
                //     track: '01',
                //     path: 'http://saitodisse.github.io/elastic-player-audios/library/FunkDisse%20com%20Viol%C3%A3o.mp3',
                //     title: 'FunkDisse com Violão'
                // },

                {
                    id: 2,
                    artist: 'saitodisse',
                    album: 'some of my music',
                    track: '02',
                    path: 'http://saitodisse.github.io/elastic-player-audios/library/Mama%CC%83e%2C%20lalalalala%202.m4a',
                    title: 'Mamãe, lalalalala 2'
                },
                {
                    id: 3,
                    artist: 'saitodisse',
                    album: 'some of my music',
                    track: '03',
                    path: 'http://saitodisse.github.io/elastic-player-audios/library/Mario%20BroThers.mp3',
                    title: 'Mario BroThers'
                },
                {
                    id: 4,
                    artist: 'saitodisse',
                    album: 'some of my music',
                    track: '04',
                    path: 'http://saitodisse.github.io/elastic-player-audios/library/Porque%20hoje%20e%CC%81%20domingo%203.m4a',
                    title: 'Porque hoje é domingo 3'
                },
                {
                    id: 5,
                    artist: 'saitodisse',
                    album: 'some of my music',
                    track: '05',
                    path: 'http://saitodisse.github.io/elastic-player-audios/library/So%CC%81%20danc%CC%A7o%20samba%20-%20refr%C3%A3o%20.m4a',
                    title: 'Só danço samba - refrão '
                },
                {
                    id: 6,
                    artist: 'saitodisse',
                    album: 'some of my music',
                    track: '06',
                    path: 'http://saitodisse.github.io/elastic-player-audios/library/Tema%20do%20MSN.mp3',
                    title: 'Tema do MSN'
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
