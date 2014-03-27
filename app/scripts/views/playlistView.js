/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    './playlistItemView'
], function ($, _, Backbone, JST, PlaylistItemView) {
    'use strict';

    var PlaylistView = Backbone.View.extend({
        template: JST['app/scripts/templates/playlist.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.renderItens);
        },

        render: function () {
            this.$el.html(this.template({}));
        },

        renderItens: function() {
            var jTbody = this.$el.find('tbody');
            for (var i = 0; i < this.collection.models.length; i++) {
                var song = this.collection.models[i];
                var itemView = new PlaylistItemView({model: song});
                
                itemView.render();
                jTbody.append(itemView.el);
            };
        }
    });

    return PlaylistView;
});
