define(function() {
    /** 
     * @factory
     */
    var AudioElement = function AudioElement(config) {
        config = config || {};

        // TODO: bring in extend() and a read-only defaults JSON
        // config should be a mixin to the defaults.


        function play () {

        }

        function render () {
            var audioContainer = document.createElement("div");
            var playButton = new (function (){
                var circle, triangle, overlay, _play;
                _play    = document.createElement("div");
                circle   = document.createElement("div");
                triangle = document.createElement("div");
                overlay  = document.createElement("div");
                circle.setAttribute("class", "play-button-bg");
                triangle.setAttribute("class", "play-button-triangle");
                overlay.setAttribute("class", "play-button-overlay");
                _play.appendChild(circle);
                _play.appendChild(triangle);
                _play.appendChild(overlay);
                return _play;
            });
            this.playButton = playButton;
            
            audioContainer.appendChild(this.playButton); 

            return audioContainer;
        }
        
        function parseFileTypes(type) {
            var types = ["mp3", "ogg", "wav"];
            switch(type) {
                case "all":
                    return types;
                default:
                    return types;
            }
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
        });
    };

    return AudioElement;
});
