/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../playerCommunicator'
], function ($, _, Backbone, JST, playerCommunicator) {
    'use strict';

    var PlaylistItemView = Backbone.View.extend({
        template: JST['app/scripts/templates/playlist-item.ejs'],

        tagName: 'tr',

        className: '',

        events: {
            'click .click-to-play': 'songSelected',
            'click #btnRemove': 'removeSong'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },

        songSelected: function(e) {
            e.preventDefault();
            playerCommunicator.trigger('song:set', this.model);
        },

        removeSong: function(e) {
            e.preventDefault();
            this.model.collection.remove(this.model);
        }
    });

    return PlaylistItemView;
});
