/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../playerCommunicator'
], function ($, _, Backbone, JST, playerCommunicator) {
    'use strict';

    var StatusView = Backbone.View.extend({
        template: JST['app/scripts/templates/status.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            playerCommunicator.on('song:set', this.renderSong, this);
        },

        renderSong: function (song) {
            this.$el.html(this.template(song.toJSON()));
        }
    });

    return StatusView;
});
