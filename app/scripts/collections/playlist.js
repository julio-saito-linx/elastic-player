/*global define*/

define([
    'underscore',
    'backbone',
    'models/song'
], function (_, Backbone, Song) {
    'use strict';

    var PlaylistCollection = Backbone.Collection.extend({
        model: Song
    });

    return PlaylistCollection;
});
