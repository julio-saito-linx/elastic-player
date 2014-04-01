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
            'click .item-title': 'songSelected',
            'click td': 'songSelected'
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
        }
    });

    return PlaylistItemView;
});
