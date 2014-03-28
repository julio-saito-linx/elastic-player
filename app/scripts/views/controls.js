/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../playerCommunicator'
], function ($, _, Backbone, JST, playerCommunicator) {
    'use strict';

    var ControlsView = Backbone.View.extend({
        template: JST['app/scripts/templates/controls.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .btnPlay': 'playOrPause',
            'click .btnPrev': 'previous',
            'click .btnNext': 'next'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            this.initializeVolumeInputRange();
        },

        initializeVolumeInputRange: function() {
            this.jVolumeSlider = this.$el.find('#volumeSlider');
            this.jVolumeSlider.attr('min', 0);
            this.jVolumeSlider.attr('max', 1);
            this.jVolumeSlider.attr('step', 0.025);
            this.jVolumeSlider[0].addEventListener("input", this.volumeChanged.bind(this)); 
        },

        playOrPause: function() {
            playerCommunicator.trigger('audio:play');
        },

        previous: function() {
            playerCommunicator.trigger('playlist:previous');
        },
        next: function() {
            playerCommunicator.trigger('playlist:next');
        },

        volumeChanged: function() {
          playerCommunicator.trigger('audio:volume', this.jVolumeSlider.val());
        }
    });

    return ControlsView;
});
