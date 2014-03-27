/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var SongModel = Backbone.Model.extend({
        url: '',

        initialize: function() {
        },

        defaults: {
            artist: 'no_artist',
            album: 'no_album',
            track: '00',
            title: 'no_title'
        },

        // validate: function(attrs, options) {
        // },

        parse: function(response /*, options*/)  {
            return response;
        }
    });

    return SongModel;
});
