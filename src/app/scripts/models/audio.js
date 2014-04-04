/*global define*/

define([
    'underscore',
    'backbone',
    '../playerCommunicator',
    '../config/config'
], function (_, Backbone, playerCommunicator, CONFIG) {
    'use strict';

    var AudioModel = Backbone.Model.extend({
        url: '',

        defaults: {
        },

        initialize: function () {
            this.isPLaying = false;

            // web-audio API
            this.audioContext = {};
            this.buffer = {};
            this.source_loop = {};
            this.source_once = {};
            this.getAudioContext();
            
            // html5 simple audio
            this.audio = new Audio();
            this.audio.volume = CONFIG.AUDIO.VOLUME;

            // HTML5 audio events, default sequence
            // - play
            // - loadedmetadata
            // - loadeddata
            // - canplay
            // - playing
            // - timeupdate... (seeked, volumechange)
            // - ended
            this.audio.addEventListener('canplay', this.canplay.bind(this), false);
            this.audio.addEventListener('ended', this.ended.bind(this), false);

            playerCommunicator.on('song:set', this.setSong, this);
            playerCommunicator.on('audio:playOrPause', this.playOrPause, this);
            playerCommunicator.on('audio:play', this.play, this);
            playerCommunicator.on('audio:pause', this.pause, this);
            playerCommunicator.on('audio:volume', this.volume, this);
            playerCommunicator.on('audio:time', this.setTime, this);
        },

        getAudioContext: function() {
            try {
                // More info at http://caniuse.com/#feat=audio-api
                var AudioContext = window.AudioContext || window.webkitAudioContext;
                this.audioContext = new AudioContext();
                console.log('AudioContext initialized!');
            } catch(e) {
                console.error('Web Audio API not supported in this browser.');
            }
        },

        initializeBuffer: function() {
            var songPath = this.song.get('path');

            var req = new XMLHttpRequest();
            req.open('GET', this.song.get('path'), true);
            req.responseType = 'arraybuffer';
            req.onload = function() {
                this.audioContext.decodeAudioData(
                    req.response,
                    function(buffer) {
                        this.buffer = buffer;
                        this.source_loop = {};
                        // var button = document.getElementById('button-loop-' + 0);
                        // button.addEventListener('click', function(e) {
                        //     e.preventDefault();
                        var bufferValue = this.value;
                        playerCommunicator.on('audio:play', function() {
                            this.play(bufferValue);
                        }, this);
                        //     audio.play(this.value);
                        // });
                    }.bind(this),
                    function() {
                        console.log('Error decoding audio.');
                    }
                );
            }.bind(this);
            req.send();
        },

        eventOcurred: function(eventName) {
            console.log(eventName);
        },

        canplay: function () {
            this.totalLength = this.audio.duration;
        },

        ended: function () {
            this.isPLaying = false;
            playerCommunicator.trigger('audio:ended');
        },

        playOrPause: function() {
            if(!this.isPLaying){
                playerCommunicator.trigger('audio:play');
            }
            else{
                playerCommunicator.trigger('audio:pause');
            }
        },

        play: function () {
            // this.audio.play();
            this.isPLaying = true;


            this.source_loop = this.audioContext.createBufferSource();
            this.source_loop.buffer = this.buffer;
            this.source_loop.loop = true;
            this.source_loop.connect(this.audioContext.destination);

            //var offset = this.findSync(n);
            this.source_loop._startTime = this.audioContext.currentTime;

            // if (this.compatibility.start === 'noteOn') {
            //     /*
            //     The depreciated noteOn() function does not support offsets.
            //     Compensate by using noteGrainOn() with an offset to play once and then schedule a noteOn() call to loop after that.
            //     */
            //     this.source_once = this.audioContext.createBufferSource();
            //     this.source_once.buffer = this.buffer;
            //     this.source_once.connect(this.audioContext.destination);
            //     this.source_once.noteGrainOn(0, offset, this.buffer.duration - offset); // currentTime, offset, duration
            //     /*
            //     Note about the third parameter of noteGrainOn().
            //     If your sound is 10 seconds long, your offset 5 and duration 5 then you'll get what you expect.
            //     If your sound is 10 seconds long, your offset 5 and duration 10 then the sound will play from the start instead of the offset.
            //     */

            //     // Now queue up our looping sound to start immediatly after the source_once this plays.
            //     this.source_loop[this.compatibility.start](this.audioContext.currentTime + (this.buffer.duration - offset));
            // } else {
                this.source_loop.start(0, /*offset*/0.0);
            // }

        },

        pause: function () {
            this.audio.pause();
            this.isPLaying = false;
        },

        volume: function ( volume ) {
            this.audio.volume = volume;
        },

        setTime: function ( newTime ) {
            this.audio.currentTime = newTime;
        },

        setSong: function ( song ) {
            this.song = song;

            this.initializeBuffer();

            //this.audio.src = this.song.get('path');
            // if(this.isPLaying){
            //     this.play();
            // }
        },

        getCurrentTime: function() {
            return this.audio.currentTime;
        },

        getTotalLength: function() {
            return this.totalLength;
        }

    });

    return AudioModel;
});
