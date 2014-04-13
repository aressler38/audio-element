define([
    "var/buttons",
    "utils/extend",
    "utils/messenger/messenger_amd",
    "var/setStyle"
], function(buttons, extend, Messenger, setStyle) {
    /** 
     * @factory
     */
    var AudioElement = function AudioElement(config) {
        config = config || {};
        var fileTypes = ["ogg", "mp3", "wav"];
        var DEFAULTS = {
            buttonRadius:15  // number of pixes from the center to the edge of a disk
        };

        // Set Factory Defaults
        extend(true, DEFAULTS, config);
        config = DEFAULTS;
        
        function play () {
            this.audio.play();
            this.trigger("play"); 
        }

        function pause () {
            this.audio.pause();
            this.trigger("pause");
        }
        
        function render () {
            var audioContainer  = document.createElement("div");
            var buttonContainer =  document.createElement("div");
            this.playButton     = buttons.play({buttonRadius:config.buttonRadius});
            this.pauseButton    = buttons.pause({buttonRadius:config.buttonRadius}); 
            hideButton.call(this, "pause");

            audioContainer.setAttribute("class", "audio-element container");
            buttonContainer.setAttribute("class", "audio-element button-container");
            
            buttonContainer.appendChild(this.playButton.render()); 
            buttonContainer.appendChild(this.pauseButton.render()); 

            audioContainer = setStyle(audioContainer, {
                position : "relative",
                width    : config.buttonRadius *2+"px",
                height   : config.buttonRadius *2+"px"
            });
            console.log(audioContainer);
            audioContainer.appendChild(buttonContainer);
            // TODO: do we really need to append the <audio> element to the DOM?
            //audioContainer.appendChild(this.audio);
            // I don't think we need to as long as we keep a reference in memory...
            bindEvents.call(this);
            return audioContainer;
        }

        function hideButton(name) {
            setStyle(this[name+"Button"].button, {display:"none"});
        }

        function showButton(name) {
            setStyle(this[name+"Button"].button, {display:"block"});
        }

        /**
         * Check if the audio element has been paused or not. If it isn't paused, then 
         * switch the button to the pause button. Otherwise, switch the button to the
         * play button.
         */
        function switchPlayPauseButton() {
            if (this.audio.paused) {
                showButton.call(this, "play");
                hideButton.call(this, "pause");
            }
            else {
                showButton.call(this, "pause");
                hideButton.call(this, "play");
            }
        }
        
        function parseFileTypes(type) {
            if (type === "all") {
                return fileTypes;
            }
            else if (type instanceof Array) {
                for (var i=0, len=type.length; i<len; i++) {
                    type[i] = type[i].toLowerCase();
                }
                return type;
            }
            else {
                return fileTypes;
            }
        }

        /**
         * Set the zero-state for the player
         */
        function enqueue() {
            showButton.call(this, "play");
            hideButton.call(this, "pause");
        }

        function bindEvents() {
            var that = this;
            this.playButton.button.addEventListener("click", function() {that.play();});
            this.pauseButton.button.addEventListener("click", function() {that.pause();});
            this.on("play", switchPlayPauseButton, this);
            this.on("pause", switchPlayPauseButton, this);
            this.audio.addEventListener("ended", function() {enqueue.call(that)});

        }


        // THIS IS YOUR AUDIO ELEMENT OBJECT
        return (new function() {
            extend(true, this, new Messenger());
            var sources; 
            if (typeof config.source === "string")  sources = [config.source];
            if (typeof config.sources === "string") sources = [config.sources];
            var MAX_SOURCES = sources.length;
            var audio       = new Audio();
            var source      = null;
            var fileTypes   = config.fileTypes;
            var i,j,buff;
            fileTypes = parseFileTypes(config.fileTypes);

            for (i=0; i<MAX_SOURCES; i++) {
                // handle all or spefific file type extensions.
                if (fileTypes === undefined) {
                    source = document.createElement("source");    
                    source.setAttribute("src", sources[i]);
                    source.setAttribute("type", "audio/"+sources[i].replace(/mp3/i, "mpeg"));
                }
                else {
                    buff=fileTypes.length;
                    for (j=0; j<buff; j++) {
                        source = document.createElement("source");    
                        source.setAttribute("src", sources[i]+"."+fileTypes[j]);
                        source.setAttribute("type", "audio/"+fileTypes[j].replace(/mp3/i, "mpeg"));
                        audio.appendChild(source);
                    }
                }
            }

            this.audio = audio;
            this.render = render;
            this.play = play;
            this.pause = pause;

        });
    };

    return AudioElement;
});
