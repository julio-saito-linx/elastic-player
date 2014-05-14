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
    '../models/userModel',
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
    UserModel,
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
            this.getUserQuerystring();
            this.initializeSocketIO();
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
            this.userModel = new UserModel();
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
            var songModel = new Song({"filename": "/media/julio/4 H-MP3 (1,36 TB)/Mp3/2000 Wanda Sá & Bossa Três/02 Deixa a Nega Gingar.mp3", "nb_streams": "1", "format_name": "mp3", "format_long_name": "MPEG audio layer 2/3", "start_time": "0.000000 ", "duration": "186.697143 ", "size": "4891591.000000 ", "bit_rate": "209605.000000 ", "title": "Deixa a Nega Gingar", "track": "2", "album_artist": "Wanda Sá & Bossa Três", "genre": "MPB", "album": "Wanda Sá & Bossa Três", "artist": "Wanda Sá & Bossa Três", "date": "2000", "id": 142292 });
            this.playlist.add(songModel);
        },

        getUserQuerystring: function() {
            var user = window.location.search.substring(1).split('=')[1];
            if(user){
                this.userModel.set('userName', user);
            }
        },

        initializeSocketIO: function() {
            //////////////////////////
            // Initializing Sockets
            //////////////////////////
            var querystringName = window.location.search.substring(1).split('=')[0];
            var querystringValue = window.location.search.substring(1).split('=')[1];
            if(querystringName === 'sid'){
                this.userModel.set('sid', querystringValue);
            }
            console.log('this.userModel.sid:', this.userModel.get('sid'));

            var clientID = {
                appName: '1-player',
                sid: this.userModel.get('sid')
            }

            //TODO: this must be dynamic
            this.socket = socketIO.connect('http://192.168.15.103:9003');

            // first connection -> send SID to server
            // server -> client
            this.socket.on('connect', function (){
                // client -> server
                this.socket.emit('client:connection', clientID);
            }.bind(this));

            this.socket.on('server:userName', function (userName){
                $('#socketInfo').html('connected as ' + userName);
            }.bind(this));



            //////////////////////////
            // player API
            //////////////////////////
            this.socket.on('toAll:playlist:add', function(data) {
                console.log('song received from socket', data);
                var songModel = new Song(data.data);
                this.playlist.add(songModel);
                
                console.log('adding from socket', '\n', songModel.get('artist'), '-', songModel.get('title'));

            }.bind(this));

        },

    });

    return PlayerController;
});
