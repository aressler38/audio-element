define([
    "var/vendors",
    "var/setStyle"
], function(vendors, setStyle) {
    var PlayButton = function(config) {
        return new (function (){
            var venLen = vendors.length; 
            var i;
            var circle, triangle, overlay, _play;
            var scale   = 81; // size in pixels of circle radius
            var sin60   = Math.sqrt(3.0) / 2.0;
            var xTrans  = scale>>1;
            var yTrans  = scale - sin60*scale;

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

            circle = setStyle(circle, circleStyles);
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
            overlay = setStyle(overlay, overlayStyles);
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
            triangle = setStyle(triangle, triangleStyles);


            
            _play = setStyle(_play, {
                position: "absolute"

            });

            _play.appendChild(circle);
            _play.appendChild(triangle);
            _play.appendChild(overlay);
            return _play;
        });
    };
    return PlayButton;
});
