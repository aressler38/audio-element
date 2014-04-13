define([
	"core/initialize",
    "var/strundefined"
], function( AudioElement, strundefined ) {

var _AudioElement = window.AudioElement;


AudioElement.noConflict = function( deep ) {
	if ( window.AudioElement === AudioElement ) {
		window.AudioElement = _AudioElement;
	}

	return AudioElement;
};

if ( typeof noGlobal === strundefined ) {
	window.AudioElement = AudioElement;
}

});
