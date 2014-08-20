/**
 * Dynamic Stylesheet Loader
 * @author Bikas Vaibhav
 * @copyright Copyright (c) Bikas Vaibhav 2014 MIT Licensed
 * @version 1.0.0
 */

var dynamicStyle = (function(dynamicStyle) {
    "use strict";

    var dynamicStyleList = [];

    /**
     * Intializes the array of stylesheets and applies the style already present in localStorage
     * @method init
     * @param  {Array} stylesheets Array of stylesheet objects to be added to the the page. Each object must have path to css file and optinally title for it. If no title is provided, the stylesheet will be added but no further action will be performed for it.
     * @return {Integer}             Number of stylesheets applied. Duplicate stylesheets are not applied so count can be less than originally provided.
     */
    dynamicStyle.init = function(stylesheets) {
        var length = stylesheets.length;
        var inc = 0;
        var appliedStyles = 0;

        for(inc; inc < length; inc++) {
            var data = appendCSS(stylesheets[inc].path, stylesheets[inc].title);
            if(data.title) {
                dynamicStyleList.push(data.link);
            }
            appliedStyles++;
        }

        applyStoredCSS();

        return appliedStyles;
    };

    /**
     * Adds single stylesheet to the page
     * @method addStyle
     * @param  {Object} Stylesheet to be added to the page. Stylesheet must have path to css file and optinally title for it.
     * @return {Boolean}             True on successfully addition else false.
     */
    dynamicStyle.addStyle = function(style) {
        var data = appendCSS(style.path, style.title);
        if(data.title) {
            dynamicStyleList.push(data.link);
            return true;
        } else {
            return false;
        }
    };

    /**
     * Adds the array of stylesheets to the page
     * @method addStyles
     * @param  {Array} stylesheets Array of stylesheet objects to be added to the the page. Each object must have path to css file and optinally title for it.
     * @return {Integer}             Number of stylesheets applied. Duplicate stylesheets are not applied so count can be less than originally provided.
     */
    dynamicStyle.addStyles = function(stylesheets) {
        var length = stylesheets.length;
        var inc = 0;
        var appliedStyles = 0;

        for(inc; inc < length; inc++) {
            var data = appendCSS(stylesheets[inc].path, stylesheets[inc].title);
            if(data.title) {
                dynamicStyleList.push(data.link);
            }
            appliedStyles++;
        }
    };

    /**
     * Makes the stylesheet active for the given title.
     * @method setStyle
     * @param {String} name Name(title) of the stylesheet to be set active.
     * @return {Boolean} Returns success/failure in boolean.
     */
    dynamicStyle.setStyle = function(name) {
        var success = setStyle(name);
        return success;
    };

    /**
     * Cycles the stylesheets making next sheet active everytime this function is called
     * @method cycleStyle
     * @return {Boolean} Returns success/failure in boolean.
     */
    dynamicStyle.cycleStyle = function() {
        return cycleStyle();
    };

    /**
     * This function will return the currently selected style element
     * @method getCurrentStyle
     * @return {HTMLElement} Currently selected Stylesheet
     */
    dynamicStyle.getCurrentStyle = function() {
        return getCurrentStyle();
    };

    /**
     * This function returns the stylesheet title stored in localStorage
     * @method getStoredStyle
     * @return {Object} Object with `name` of stylesheet and `exists` parameter which tell if the stylesheet with this name currently exists.
     */
    dynamicStyle.getStoredStyle = function() {
        return getStoredStyle();
    };

    /**
     * Removes the existing stylesheet from the page
     * @method removeStyle
     * @param  {String} name Name (title) of the stylesheet to be removed
     * @return {String}      Name of the stylesheet removed, return empty if no stylesheet is removed
     */
    dynamicStyle.removeStyle = function(name) {
        return removeStyle(name);
    };

    /**
     * Removed the style stored in localStorage
     * @method removeStoredStyle
     * @return {Boolean} Returns success/failure in boolean.
     */
    dynamicStyle.removeStoredStyle = function() {
        if(localStorage.storedStyle) {
            localStorage.removeItem("storedStyle");
            return true;
        } else {
            return false;
        }
    };
    
    function appendCSS(path, title) {
        var max = dynamicStyleList.length;
        for (var i = 0; i < max; i++) {
            if (dynamicStyleList[i].href.indexOf(path) !== -1)
                return {
                    title: null,
                };
        }

        var cssLink = document.createElement("link");
        cssLink.setAttribute("rel", "stylesheet");
        cssLink.setAttribute("type", "text/css");
        cssLink.setAttribute("href", path);

        if(title) {
            cssLink.setAttribute("title", title);
            cssLink.disabled = true;
        }

        if(typeof cssLink!="undefined") {
            document.getElementsByTagName("head")[0].appendChild(cssLink);
        }

        return {
            title: title,
            link: cssLink
        };
    }

    function applyStoredCSS() {
        var currentStyle = localStorage.storedStyle;
        if(currentStyle) {
            setStyle(currentStyle);
        }
    }

    function cycleStyle() {
        var length = dynamicStyleList.length;
        var inc = 0;
        var success = false;

        for(inc; inc < length; inc++) {
            if((dynamicStyleList[inc].rel.indexOf("stylesheet") != -1) && dynamicStyleList[inc].title) {
                if(dynamicStyleList[inc].disabled === false) {
                    dynamicStyleList[inc].disabled = true;
                    var nextIndex = (inc + 1) >= length ? 0 : (inc + 1);
                    dynamicStyleList[nextIndex].disabled = false;
                    localStorage.storedStyle = dynamicStyleList[nextIndex].title;
                    success = true;
                    break;
                }
            }
        }

        return success;
    }

    function getCurrentStyle() {
        var length = dynamicStyleList.length;
        var inc = 0;
        var current;

        for(inc; inc < length; inc++) {
            if((dynamicStyleList[inc].rel.indexOf("stylesheet") != -1) && dynamicStyleList[inc].title) {
                if(dynamicStyleList[inc].disabled === false) {
                    current = dynamicStyleList[inc];
                    break;
                }
            }
        }

        return current;
    }

    function getStoredStyle() {
        var length = dynamicStyleList.length;
        var inc = 0;
        var storedStyle = localStorage.storedStyle;
        var exists = false;

        for(inc; inc < length; inc++) {
            if((dynamicStyleList[inc].rel.indexOf("stylesheet") != -1) && dynamicStyleList[inc].title) {
                if(dynamicStyleList[inc].title === storedStyle) {
                    exists = true;
                    break;
                }
            }
        }

        return {
            name: storedStyle,
            exists: exists
        };
    }

    function setStyle(name) {
        var length = dynamicStyleList.length;
        var inc = 0;
        var success = false;

        for(inc; inc < length; inc++) {
            if((dynamicStyleList[inc].rel.indexOf("stylesheet") != -1) && dynamicStyleList[inc].title) {
                dynamicStyleList[inc].disabled = true;
                if (dynamicStyleList[inc].title === name) {
                    dynamicStyleList[inc].disabled = false;
                    localStorage.storedStyle = name;
                    success = true;
                }
            }
        }

        return success;
    }

    function removeStyle(name) {
        var length = dynamicStyleList.length;
        var inc = 0;
        var returnName = "";

        for(inc; inc < length; inc++) {
            if((dynamicStyleList[inc].rel.indexOf("stylesheet") != -1) && dynamicStyleList[inc].title) {
                if (dynamicStyleList[inc].title === name) {
                    var index = dynamicStyleList.indexOf(dynamicStyleList[inc]);
                    dynamicStyleList[inc].parentNode.removeChild(dynamicStyleList[inc]);
                    dynamicStyleList.splice(index, 1);
                    returnName = name;
                    break;
                }
            }
        }

        return returnName;
    }

    return dynamicStyle;
}(dynamicStyle || {}));

