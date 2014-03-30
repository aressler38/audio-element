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

        return (new function() {
            var sources = config.sources;
            if (typeof sources === "string") sources = [sources];
            var MAX_SOURCES = sources.length;
            var audio = new Audio();    
            var source  = null;

            for (var i=0; i<MAX_SOURCES; i++) {
                source = document.createElement("source");    
                source.setAttribute("src", sources[i]);
                audio.appendChild(source);
            }
            
            

            this.audio = element;
        });
    };

    return AudioElement;
});
