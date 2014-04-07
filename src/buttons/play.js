define([
    "var/vendors",
    "var/setStyle"
], function(vendors, setStyle) {
    var PlayButton = function(config) {
        config = config || {};
        return new (function () {
            var triangleOffset = 3;
            var _scale   = config.buttonRadius || 10; // size in pixels of circle radius
            var _inset   = config.inset || 3;
            var triangleColor = config.triangleColor || "#1fa";
            var venLen = vendors.length; 
            var i;
            var circle, triangle, overlay, _play;
            var sin60   = Math.sqrt(3.0) / 2.0;
            var xTrans  = _scale >> 1;
            var yTrans  = _scale - sin60*_scale;

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
            	width        : (_scale << 1) + "px",
            	height       : (_scale << 1) + "px"
            };

            for (i=0;i<venLen;i++) {
                circle.style.backgroundImage = vendors[i]+"radial-gradient(center center, circle contain, green 80%, #1a2 99%)";
                circle.style.boxShadow = vendors[i]+"inset 9px 4px 4px 0px #a93939";
            }

            // OVERLAY STYLES
            var overlayStyles = {
                position     : "absolute",
            	borderRadius : "50%",
            	background   : "green",
                opacity      : 0.4,
                zIndex       : 100,
            	width        : (_scale << 1) + "px",
            	height       : (_scale << 1) + "px"
            };
            for (i=0;i<venLen;i++) {
                overlay.style.backgroundImage = vendors[i]+"radial-gradient(center center, circle contain, white 10%, transparent 50%)";
            }

            // TRIANGLE STYLES
            var triangleStyles = {
                position    : "absolute",
                background  : "transparent",
                left        : xTrans + "px",
                top         : yTrans+triangleOffset + "px",
                zIndex      : 50,
                borderBottom: _scale*sin60 - triangleOffset + "px solid transparent",
                borderTop   : _scale*sin60 - triangleOffset + "px solid transparent",
                borderLeft  : ((_scale<<1) - xTrans - triangleOffset) + "px solid "+triangleColor
            }

            // setting styles
            circle = setStyle(circle, circleStyles);
            triangle = setStyle(triangle, triangleStyles);
            overlay = setStyle(overlay, overlayStyles);
            _play = setStyle(_play, {
                position: "absolute",
                top: 0,
                left: 0
            });

            // appending secondary divs
            _play.appendChild(circle);
            _play.appendChild(triangle);
            _play.appendChild(overlay);

            // This is the button element.
            this.button = _play;

            // RENDER
            this.render = function render(config) {
                config = config || {};
                var scale = config.scale || _scale;
                var tColor = config.triangleColor || triangleColor;
                
                xTrans  = scale >> 1;
                yTrans  = scale - sin60*scale;
                var circleStyles = {
                    width        : (scale << 1) + "px",
                    height       : (scale << 1) + "px"
                };
                var triangleStyles = {
                    left        : xTrans + "px",
                    top         : yTrans+ triangleOffset + "px",
                    borderBottom: scale*sin60 - triangleOffset + "px solid transparent",
                    borderTop   : scale*sin60 - triangleOffset + "px solid transparent",
                    borderLeft  : ((scale<<1) - xTrans - triangleOffset) + "px solid "+tColor
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
