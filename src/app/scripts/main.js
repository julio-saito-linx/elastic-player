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
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone',
    './controllers/playerController',
    './playerCommunicator'
], function (Backbone, PlayerController, playerCommunicator) {
    //global event system
    playerCommunicator.on('showMessage', function(message) {
        console.log('showMessage:', message);
    });

    new PlayerController();

    Backbone.history.start();
});
