/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap',
        socketIO: 'http://socketserver.azk.dev/socket.io/socket.io'
    }
});

require([
    'backbone',
    './controllers/playerController',
    './playerCommunicator',
    './vendor/meldLog'
], function (Backbone, PlayerController, playerCommunicator, meldLog) {

    // LOG
    //__MELD_LOG('App.playerCommunicator', playerCommunicator, 10);

    //global event system
    playerCommunicator.on('showMessage', function(message) {
        console.log('showMessage:', message);
    });


    var playerController = new PlayerController();

    Backbone.history.start();


    // global for debug
    window.__app = {};
    __app.communicator = playerCommunicator;
    __app.controller = playerController;
});
