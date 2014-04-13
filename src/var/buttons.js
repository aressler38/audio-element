define([
    "buttons/play",
    "buttons/pause"
], function(PlayButton, PauseButton) {
    // returns the available buttons in an object
    return ({
        play: PlayButton,
        pause: PauseButton
    });
});
