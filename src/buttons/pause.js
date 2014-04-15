define([
    "var/vendors",
    "var/setStyle",
    "utils/extend"
], function(vendors, setStyle, extend) {
    var PauseButton = function(config) {
        config = config || {};
        return new (function () {
            var triangleOffset = 3;
            var _scale   = config.buttonRadius || 10; // size in pixels of circle radius
            var _inset   = config.inset || 3;
            var rectInset = config.rectInset || 4; 
            var pauseBGColor = config.pauseBGColor || "#959800";
            var pauseColor = config.pauseColor || "#959800";
            var pauseBoxShadow = config.pauseBoxShadow || "inset 4px 2px 2px 2px #cc0";
            var pauseRectOpacity = config.pauseRectOpacity || 0.9;
            var pauseOpacity = config.pauseOpacity || 0.8;
            var venLen = vendors.length; 
            var i;
            var circle, triangle, overlay, _pause;
            var sin60   = Math.sqrt(3.0) / 2.0;
            var xTrans  = _scale >> 1;
            var yTrans  = _scale - sin60*_scale;
            var phi     = 0.85;
            var PHI     = (_scale<<1) - ((_scale<<1) * phi);
            var width   = (_scale<<1) * phi;
            var height  = (_scale<<1) * phi;


            // _pause is the parent div to which we propagate events and capture them
            _pause   = document.createElement("div");
            rect1    = document.createElement("div");
            rect2    = document.createElement("div");

            var pauseStyles = {
                position     : "absolute",
                top          : PHI/2 + "px",
                left         : PHI/2 + "px",
                borderRadius : "15%",
                background   : pauseBGColor,
                opacity      : pauseOpacity,
                width        : width+"px",
                height       : height+"px"
            }
            var rectStyles = {
                borderRadius : "15%",
                top          : rectInset + "px",
                bottom       : rectInset + "px",
                position     : "absolute",
            	background   : pauseColor,//"#ffff4e",
                opacity      : pauseRectOpacity,
                zIndex       : 0,
            	width        : (width*phi)/3.0 + "px",
            	height       : height-(rectInset<<1) + "px"
            };

            if (pauseBoxShadow !== "none") {
                for (i=0;i<venLen;i++) {
                    _pause.style.boxShadow = vendors[i]+pauseBoxShadow;
                }
            }
            // setting styles
            rect1 = setStyle(rect1, extend(rectStyles, {
                left: (rectInset)+"px"
            }));
            rect2 = setStyle(rect2, extend(rectStyles, {
                right: (rectInset)+"px",
                left: "none"
            }));
            _pause = setStyle(_pause, pauseStyles);

            // appending secondary divs
            _pause.appendChild(rect1);
            _pause.appendChild(rect2);

            // This is the button element.
            this.button = _pause;

            // RENDER
            this.render = function render(config) {
                config = config || {};
                
                return _pause;
            };

            return this;
        });
    };
    return PauseButton;
});
