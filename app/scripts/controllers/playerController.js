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
            this.initializeRegions();
            this.initializeModels();
            this.initializeViews();
            this.renderViews();
            this.addViewsToDOM();
        },

        initializeRegions: function() {
            this.jBody = $('.container');
            this.jStatusRegion = this.jBody.find('#status');
        },
        
        initializeModels: function() {
            this.audio = new Audio();
            this.playlist = new Playlist();
        },
        
        initializeViews: function() {
            this.statusView = new StatusView({
                model: this.audio
            });
        },
        
        renderViews: function() {
            this.statusView.render();
        },
        
        addViewsToDOM: function() {
            this.jStatusRegion.html(this.statusView.el);
        },

    });

    return PlayerController;
});
