define([
    "var/vendors",
    "var/setStyle",
    "utils/extend"
], function(vendors, setStyle, extend) {
    var PlayButton = function(config) {
        config = config || {};
        return new (function () {
            var triangleOffset = 3;
            var _scale   = config.buttonRadius || 10; // size in pixels of circle radius
            var _inset   = config.inset || 3;
            var rectInset = config.rectInset || 3; 
            var pauseBGColor = config.pauseBGColor || "#959800";
            var venLen = vendors.length; 
            var i;
            var circle, triangle, overlay, _pause;
            var sin60   = Math.sqrt(3.0) / 2.0;
            var xTrans  = _scale >> 1;
            var yTrans  = _scale - sin60*_scale;
            var width   = _scale<<1;
            var height  = _scale<<1;


            // _pause is the parent div to which we propagate events and capture them
            _pause   = document.createElement("div");
            rect1    = document.createElement("div");
            rect2    = document.createElement("div");


            var pauseStyles = {
                position: "absolute",
                borderRadius : "15%",
                background: pauseBGColor,
                opacity: 0.8,
                width: width+"px",
                height: height+"px"
            }
            var rectStyles = {
                borderRadius : "10%",
                top          : rectInset + "px",
                bottom       : rectInset + "px",
                position     : "absolute",
            	background   : "#ffff4e",
                opacity      : 0.9,
                zIndex       : 0,
            	width        : width/3.0 + "px",
            	height       : height-(rectInset<<1) + "px"
            };

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
    return PlayButton;
});
