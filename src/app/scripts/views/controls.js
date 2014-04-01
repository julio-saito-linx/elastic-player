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
            'click .btnPlay': 'playOrPause',
            'click .btnPrev': 'previous',
            'click .btnNext': 'next'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);

            playerCommunicator.on('audio:pause', this.onPause, this);
            
            //playerCommunicator.on('audio:play', this.onPlay, this);
            this.model.audio.addEventListener('canplay', this.onCanPlay.bind(this), false);
            this.model.audio.addEventListener('play', this.onPlay.bind(this), false);
            this.model.audio.addEventListener('timeupdate', this.getSongTime.bind(this), false);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));

            this.getJqueryElements();
            this.initializeVolumeInputRange();
        },

        getJqueryElements: function() {
            this.jPlayGlyphicon = this.$el.find('.btnPlay > .glyphicon');
            this.jVolumeSlider = this.$el.find('#volumeSlider');
            this.jSliderLabel = this.$el.find('#timeSliderLabel');
            this.jTimeSlider = this.$el.find('#timeSlider');
        },

        getSongTime: function() {
            this.updateTimeSlider();
        },

        updateTimeSlider: function() {
            //Label
            var currentTotalFormated = this.getFormatedCurrentTime();
            this.jSliderLabel.text('Time: ' + currentTotalFormated);

            //input range (slider)
            this.jTimeSlider.val(this.model.getCurrentTime());
        },

        initializeTimeInputRange: function() {
            var audioModel = this.model,
                totalLength = audioModel.getTotalLength();

            this.jTimeSlider.attr('min', 0);
            this.jTimeSlider.attr('max', totalLength);
            this.jTimeSlider.attr('step', totalLength / 100);
            this.jTimeSlider[0].addEventListener('input', this.timeChanged.bind(this));
        },

        getFormatedCurrentTime: function() {
            var audioModel = this.model,
                currentTime = audioModel.getCurrentTime(),
                totalLength = audioModel.getTotalLength(),
                currentTimeFormated = prettyMinutes(currentTime),
                totalLengthFormated = prettyMinutes(totalLength);
                
            return currentTimeFormated + ' / ' + totalLengthFormated;
        },

        initializeVolumeInputRange: function() {
            this.jVolumeSlider.attr('min', 0);
            this.jVolumeSlider.attr('max', 1);
            this.jVolumeSlider.attr('step', 0.025);
            this.jVolumeSlider[0].addEventListener('input', this.volumeChanged.bind(this));
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

        volumeChanged: function() {
            playerCommunicator.trigger('audio:volume', this.jVolumeSlider.val());
        },

        timeChanged: function() {
            playerCommunicator.trigger('audio:time', this.jTimeSlider.val());
        },

        onCanPlay: function() {
            this.initializeTimeInputRange();
        },
        
        onPlay: function() {
            this.jPlayGlyphicon.removeClass('glyphicon-play');
            this.jPlayGlyphicon.addClass('glyphicon-pause');
        },
        
        onPause: function() {
            this.jPlayGlyphicon.removeClass('glyphicon-pause');
            this.jPlayGlyphicon.addClass('glyphicon-play');
        },

    });

    return ControlsView;
});
