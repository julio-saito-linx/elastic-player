/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    '../views/status',
    '../models/audio',
    '../collections/playlist'
], function (
    $,
    _,
    Backbone,
    StatusView,
    Audio,
    Playlist
) {
    'use strict';

    var PlayerController = Backbone.View.extend({
        initialize: function () {
            // get 'regions'
            this.jBody = $('.container');
            this.jStatusRegion = this.jBody.find('#status');

            // initialize models
            this.audio = new Audio();
            this.playlist = new Playlist();

            // initialize views
            var statusView = new StatusView({
                model: this.audio
            });

            // render views
            statusView.render();

            //add view to DOM
            this.jStatusRegion.html(statusView.el);

            //this.listenTo(this.model, 'change', this.render);
        }
    });

    return PlayerController;
});
