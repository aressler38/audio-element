define([
    "var/vendors",
    "var/setStyle"
], function(vendors, setStyle) {
    var PlayButton = function(config) {
        return new (function (){
            var scale   = 10; // size in pixels of circle radius
            var venLen = vendors.length; 
            var i;
            var circle, triangle, overlay, _play;
            var sin60   = Math.sqrt(3.0) / 2.0;
            var xTrans  = scale >> 1;
            var yTrans  = scale - sin60*scale;

            // _play is the parent div to which we propagate events and capture them
            _play    = document.createElement("div");
            circle   = document.createElement("div");
            triangle = document.createElement("div");
            overlay  = document.createElement("div");

            // CIRCLE STYLES 
            var circleStyles = {
                position     : "absolute",
            	borderRadius : "50%",
            	background   : "green",
                opacity      : 0.6,
                zIndex       : 0,
            	width        : (scale << 1) + "px",
            	height       : (scale << 1) + "px"
            };

            for (i=0;i<venLen;i++) {
                circle.style.backgroundImage = vendors[i]+"radial-gradient(center center, circle contain, green 80%, #1a2 99%)";
            }

            // OVERLAY STYLES
            var overlayStyles = {
                position     : "absolute",
            	borderRadius : "50%",
            	background   : "green",
                opacity      : 0.4,
                zIndex       : 100,
            	width        : (scale << 1) + "px",
            	height       : (scale << 1) + "px"
            };
            for (i=0;i<venLen;i++) {
                overlay.style.backgroundImage = vendors[i]+"radial-gradient(center center, circle contain, white 10%, transparent 50%)";
            }

            // TRIANGLE STYLES
            var triangleStyles = {
                position    : "absolute",
                background  : "transparent",
                left        : xTrans + "px",
                top         : yTrans + "px",
                zIndex      : 50,
                borderBottom: scale*sin60 + "px solid transparent",
                borderTop   : scale*sin60 + "px solid transparent",
                borderLeft  : ((scale<<1) - xTrans) + "px solid #1E1"
            }

            // setting styles
            circle = setStyle(circle, circleStyles);
            triangle = setStyle(triangle, triangleStyles);
            overlay = setStyle(overlay, overlayStyles);
            _play = setStyle(_play, {
                position: "absolute"
            });

            // appending secondary divs
            _play.appendChild(circle);
            _play.appendChild(triangle);
            _play.appendChild(overlay);

            // This is the button element.
            this.button = _play;

            // RENDER
            this.render = function render(scale) {
                xTrans  = scale >> 1;
                yTrans  = scale - sin60*scale;
                var circleStyles = {
                    width        : (scale << 1) + "px",
                    height       : (scale << 1) + "px"
                };
                var triangleStyles = {
                    left        : xTrans + "px",
                    top         : yTrans + "px",
                    borderBottom: scale*sin60 + "px solid transparent",
                    borderTop   : scale*sin60 + "px solid transparent",
                    borderLeft  : ((scale << 1) - xTrans) + "px solid #1E1"
                };
                var overlayStyles = {
                    width        : (scale << 1) + "px",
                    height       : (scale << 1) + "px"
                };
                setStyle(circle, circleStyles);
                setStyle(triangle, triangleStyles);
                setStyle(overlay, overlayStyles);
                return _play;
            };

            return this;
        });
    };
    return PlayButton;
});
