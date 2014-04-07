define([
    "buttons/play",
    "buttons/pause"
], function(play, pause) {
    // returns the available buttons in an object
    return ({
        play: play,
        pause: pause
    });
});
