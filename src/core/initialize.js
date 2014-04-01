define([
    "buttons"
], function(buttons) {
    /** 
     * @factory
     */
    var AudioElement = function AudioElement(config) {
        config = config || {};

        // TODO: bring in extend() and a read-only defaults JSON
        // config should be a mixin to the defaults.


        function play () {
            this.audio.play();
        }

        function render () {
            var audioContainer = document.createElement("div");
            this.playButton = buttons.play();
            
            audioContainer.appendChild(this.playButton); 
            bindEvents.call(this);
            return audioContainer;
        }
        
        function parseFileTypes(type) {
            var types = ["ogg", "mp3", "wav"];
            switch(type) {
                case "all":
                    return types;
                default:
                    return types;
            }
        }

        function bindEvents() {
            var that = this;
            this.playButton.addEventListener("click", function() {that.play();});
        }

        return (new function() {
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
                }
                else {
                    buff=fileTypes.length;
                    for (j=0; j<buff; j++) {
                        source = document.createElement("source");    
                        source.setAttribute("src", sources[i]+"."+fileTypes[j]);
                        audio.appendChild(source);
                    }
                }
            }

            this.audio = audio;
            this.render = render;
            this.play = play;


        });
    };

    return AudioElement;
});
