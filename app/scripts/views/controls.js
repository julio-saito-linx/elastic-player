/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    '../playerCommunicator',
    '../vendor/prettyMinutes'
], function ($, _, Backbone, JST, playerCommunicator, prettyMinutes) {
    'use strict';

    var ControlsView = Backbone.View.extend({
        template: JST['app/scripts/templates/controls.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click .btnPrev': 'previous',
            'click .btnNext': 'next'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            playerCommunicator.on('song:set', this.onSetSong, this);

        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            this.model.setNativeAudio(this.$el.find('#nativeAudio')[0]);

            //playerCommunicator.on('audio:play', this.onPlay, this);
            //this.model.audio.addEventListener('canplay', this.onCanPlay.bind(this), false);
            //this.model.audio.addEventListener('timeupdate', this.getSongTime.bind(this), false);


            this.getJqueryElements();
            //this.initializeVolumeInputRange();
        },

        getJqueryElements: function() {
            this.jNativeAudio = this.$el.find('#nativeAudio');
        },

        getSongTime: function() {
            this.updateTimeSlider();
        },

        getFormatedCurrentTime: function() {
            var audioModel = this.model,
                currentTime = audioModel.getCurrentTime(),
                totalLength = audioModel.getTotalLength(),
                currentTimeFormated = prettyMinutes(currentTime),
                totalLengthFormated = prettyMinutes(totalLength);

            return currentTimeFormated + ' / ' + totalLengthFormated;
        },

        playOrPause: function() {
            playerCommunicator.trigger('audio:playOrPause');
        },

        previous: function() {
            playerCommunicator.trigger('playlist:previous');
        },
        next: function() {
            playerCommunicator.trigger('playlist:next');
        },

        onSetSong: function(songModel) {
            // TODO: this must be dynamic
            this.jNativeAudio.attr('src', 'http://mp3server.azk.dev' + songModel.get('filename'));
        },
    });

    return ControlsView;
});
