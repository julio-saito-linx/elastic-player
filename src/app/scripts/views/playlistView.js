/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    './playlistItemView',
    '../playerCommunicator'
], function ($, _, Backbone, JST, PlaylistItemView, playerCommunicator) {
    'use strict';

    
    var PlaylistView = Backbone.View.extend({
        template: JST['app/scripts/templates/playlist.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.collection, 'reset', this.renderItens);
            playerCommunicator.on('song:set', this.songSelected, this);
        },

        render: function () {
            this.$el.html(this.template({}));
        },

        renderItens: function() {
            var jTableBody = this.$el.find('tbody');
            for (var i = 0; i < this.collection.models.length; i++) {
                var song = this.collection.models[i];
                var itemView = new PlaylistItemView({
                    model: song,
                    id: song.id
                });
                
                itemView.render();
                jTableBody.append(itemView.el);
            };
        },

        songSelected: function(songModel) {
            var jTrSongs = this.$el.find('tbody > tr');
            jTrSongs.removeClass('selectedSong');

            var jTrSong = this.$el.find('#' + songModel.get('id'));
            jTrSong.addClass('selectedSong');
        }
    });

    return PlaylistView;
});
