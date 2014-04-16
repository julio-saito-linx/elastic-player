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
            this.listenTo(this.collection, 'reset', this.renderAllItens);
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'remove', this.removeOne);
            playerCommunicator.on('song:set', this.songSelected, this);
        },

        render: function () {
            this.$el.html(this.template({}));

            this.jTableBody = this.$el.find('tbody');
        },

        renderAllItens: function() {
            this.clearAll();
            
            //add all
            for (var i = 0; i < this.collection.models.length; i++) {
                var song = this.collection.models[i];
                this.addOne(song);
            }
        },

        clearAll: function() {
            this.jTableBody.html('');
        },

        addOne: function(songModel) {
            var itemView = new PlaylistItemView({
                model: songModel,
                id: songModel.id
            });
            
            itemView.render();
            this.jTableBody.append(itemView.el);
        },

        removeOne: function(songModel) {
            console.log('will remove:', songModel.id);
            this.jTableBody.find('#' + songModel.id).remove();
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
