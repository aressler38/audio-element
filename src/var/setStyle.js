define(function() {
    /**
     * Given some Element and an object literal, set the styles on it.
     * @param {Element} element - html element;
     * @param {object} styleObject - object literal representing styles.
     * @returns element;
     */
    return function setStyle (element, styleObject) {
        var style; 
        for (style in styleObject) if (styleObject.hasOwnProperty(style)) {
            element.style[style] = styleObject[style];
        }
        return element;
    }
});
